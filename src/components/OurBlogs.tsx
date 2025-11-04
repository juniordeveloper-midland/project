import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublicPosts } from '../services/blogService';
import { resolveAssetUrl } from '../utils/url';
import { formatDateTime } from '../utils/date';

const OurBlogs = () => {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    let mounted = true;
    getPublicPosts(4).then((data) => {
      if (mounted) setPosts(data || []);
    }).catch(() => {
      // leave fallback empty
    });
    return () => { mounted = false; };
  }, []);

  return (
    <section className="bg-blue-900 py-16 defer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Our Blogs</h2>
          <p className="text-white text-lg max-w-4xl mx-auto leading-relaxed">
            Insights and tips on enhancing business security with professional management solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.length === 0 ? (
            // simple placeholders if none found
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48 bg-gray-200" />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Loading...</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Please wait</p>
                </div>
              </div>
            ))
          ) : (
            posts.map((p) => (
              <div key={p.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Link to={`/blogs/${p.id}`} className="block relative">
                  <div className="relative h-48 bg-gray-200">
                    <img src={resolveAssetUrl(p.featured_image) || '/images/Man Gaurding3.jpg'} alt={p.title} className="w-full h-full object-cover" loading="lazy" decoding="async" width={640} height={384} />
                  </div>
                </Link>
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-2">{p.author ? p.author : ''}{p.author && p.published_at ? ' • ' : ''}{p.published_at ? formatDateTime(p.published_at) : ''}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.excerpt || ''}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default OurBlogs;