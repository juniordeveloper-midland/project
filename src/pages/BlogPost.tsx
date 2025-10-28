import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import { formatDateTime } from '../utils/date';
import { resolveAssetUrl } from '../utils/url';

function BlogPost() {
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    import('../services/blogService').then(mod => {
      return mod.getPostById(id);
    }).then((data) => {
      if (mounted) setPost(data);
    }).catch(() => {
      // ignore
    }).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="bg-white rounded-md p-8 shadow">Loading...</div>
          ) : !post ? (
            <div className="bg-white rounded-md p-8 shadow">
              <h1 className="text-2xl font-semibold mb-4">Post not found</h1>
              <Link to="/blogs" className="text-blue-600 hover:underline">Back to Blogs</Link>
            </div>
          ) : (
            <article className="bg-white rounded-md shadow overflow-hidden">
              <img src={resolveAssetUrl(post.featured_image) || '/api/placeholder/800/300'} alt={post.title} className="w-full h-80 object-cover" />
              <div className="p-6">
                <div className="text-sm text-gray-600 mb-2">{post.author} • {post.published_at ? formatDateTime(post.published_at) : ''}</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
                <p className="text-gray-700 mb-6">{post.excerpt}</p>
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
                </div>
                <div className="mt-6">
                  <Link to="/blogs" className="text-blue-600 hover:underline">← Back to all blogs</Link>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BlogPost;


