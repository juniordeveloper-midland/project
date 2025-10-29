import { useEffect, useState } from 'react';
import { Calendar, User, ChevronRight } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { getPublicPosts } from '../services/blogService';
import { resolveAssetUrl } from '../utils/url';
import { formatDateTime } from '../utils/date';
import { BLOG_CATEGORIES } from '../services/blogCategories';

const BlogDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<any[]>([]);
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const selectedCategory = searchParams.get('category') || '';
  const pageSize = 2; // posts per page
  const filtered = selectedCategory ? posts.filter((p) => (p.category || '') === selectedCategory) : posts;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Number.isNaN(pageParam) ? 1 : Math.min(Math.max(pageParam, 1), totalPages);

  useEffect(() => {
    // fetch posts
    let mounted = true;
    getPublicPosts().then((data) => {
      if (mounted) setPosts(data || []);
    }).catch(() => {
      // ignore
    });
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Ensure URL stays in sync and scroll to top on page change
    const synced = searchParams.get('page');
    if (synced !== String(currentPage)) {
      const next = new URLSearchParams(searchParams);
      next.set('page', String(currentPage));
      setSearchParams(next, { replace: true });
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageClick = (pageNumber: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(pageNumber));
    setSearchParams(next);
  };
  const latestPosts = posts.slice(0, 4);
  const categories = BLOG_CATEGORIES;

  function handleCategoryClick(category: string) {
    const next = new URLSearchParams(searchParams);
    if (category) next.set('category', category); else next.delete('category');
    next.set('page', '1');
    setSearchParams(next);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="space-y-8">
              {(() => {
                const start = (currentPage - 1) * pageSize;
                const pool = filtered;
                const visible = pool.slice(start, start + pageSize);
                return (visible.length ? visible : pool.slice(0, pageSize)).map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link to={`/blogs/${post.id}`} className="block relative">
                      <img 
                        src={resolveAssetUrl(post.featured_image) || '/api/placeholder/400/250'} 
                        alt={post.title}
                        className="w-full h-64 object-cover"
                      />
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <User size={16} />
                        {post.author || ''}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {post.published_at ? formatDateTime(post.published_at) : ''}
                      </span>
                    </div>
                    
                    <Link to={`/blogs/${post.id}`}>
                      <h2 className="text-xl font-bold text-gray-900 mb-4 hover:text-blue-600 cursor-pointer transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {post.excerpt}
                    </p>
                    {post.category ? (
                      <div className="mt-3 text-sm text-blue-600">Category: {post.category}</div>
                    ) : null}
                  </div>
                </article>
              ));
            })()}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {
                  const isActive = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageClick(pageNum)}
                      aria-current={isActive ? 'page' : undefined}
                      className={
                        `w-10 h-10 rounded-md transition-colors ` +
                        (isActive
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50')
                      }
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="space-y-6">
              {/* Latest Posts */}
              <div className="bg-blue-900 text-white rounded-lg overflow-hidden">
                <h3 className="bg-blue-800 px-4 py-3 text-lg font-semibold">
                  Latest Posts
                </h3>
                <div className="p-4 space-y-4">
                  {latestPosts.map((post) => (
                    <Link key={post.id} to={`/blogs/${post.id}`} className="flex gap-3 group cursor-pointer">
                      <img
                        src={resolveAssetUrl(post.featured_image) || '/api/placeholder/64/48'}
                        alt={post.title}
                        className="w-16 h-12 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium group-hover:text-blue-300 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-blue-200 mt-1">
                          {post.published_at ? formatDateTime(post.published_at) : ''}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-blue-900 text-white rounded-lg overflow-hidden">
                <div className="bg-blue-800 px-4 py-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Categories</h3>
                  {selectedCategory ? (
                    <button
                      type="button"
                      onClick={() => handleCategoryClick('')}
                      className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded"
                    >
                      Back
                    </button>
                  ) : null}
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          onClick={() => handleCategoryClick(category)}
                          className={`w-full text-left flex items-center justify-between text-sm transition-colors group ${selectedCategory === category ? 'text-blue-300' : 'hover:text-blue-300'}`}
                        >
                          <span>{category}</span>
                          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;