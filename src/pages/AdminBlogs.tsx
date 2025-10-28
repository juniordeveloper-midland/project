import { useEffect, useState, useRef } from 'react';
import { resolveAssetUrl } from '../utils/url';
import Header from '../components/Header';
import Footer from '../components/footer';
import { getAdminPosts, createPost, updatePost, uploadImage, deletePost } from '../services/blogService';

export default function AdminBlogs() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', featured_image: '', status: 'draft', author: '' });
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    let mounted = true;
    getAdminPosts()
      .then((data) => { if (mounted) setPosts(data || []); })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; if (objectUrlRef.current) { URL.revokeObjectURL(objectUrlRef.current); } };
  }, []);

  function startEdit(p: any) {
    setEditing(p);
    setForm({
      title: p.title || '',
      slug: p.slug || '',
      excerpt: p.excerpt || '',
      content: p.content || '',
      featured_image: p.featured_image || '',
      status: p.status || 'draft',
      author: p.author || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPreviewUrl(p.featured_image ? resolveAssetUrl(p.featured_image) : null);
  }

  async function save() {
    setErrorMessage(null);
    try {
      const payload: any = { ...form };
      if (file) {
        const path = await uploadImage(file);
        payload.featured_image = path;
      }
      if (editing) {
        await updatePost(editing.id, payload);
      } else {
        await createPost(payload);
      }
      const data = await getAdminPosts();
      setPosts(data || []);
      setEditing(null);
      setFile(null);
      setPreviewUrl(null);
      setForm({ title: '', slug: '', excerpt: '', content: '', featured_image: '', status: 'draft', author: '' });
    } catch (e: any) {
      setErrorMessage(e?.message || 'Save failed');
    }
  }

  async function confirmDelete() {
    if (!deleteTargetId) return;
    setDeleteLoading(true);
    try {
      await deletePost(deleteTargetId);
      const refreshed = await getAdminPosts();
      setPosts(refreshed || []);
      setShowDeleteModal(false);
      setDeleteTargetId(null);
    } catch (err: any) {
      alert(err?.message || 'Failed to delete');
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>

        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="font-medium mb-2">{editing ? 'Edit Post' : 'Create Post'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" className="border p-2 rounded" />
            <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="Slug (url-friendly)" className="border p-2 rounded" />
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Featured image</label>
              <input type="file" accept="image/*" onChange={e => {
                const f = e.target.files ? e.target.files[0] : null;
                setFile(f);
                if (objectUrlRef.current) { URL.revokeObjectURL(objectUrlRef.current); objectUrlRef.current = null; }
                if (f) {
                  const u = URL.createObjectURL(f);
                  objectUrlRef.current = u;
                  setPreviewUrl(u);
                } else {
                  setPreviewUrl(form.featured_image ? resolveAssetUrl(form.featured_image) : null);
                }
              }} className="w-full" />
              <div className="text-sm text-gray-500 mt-1">Choose an image to upload (max 5MB). If left empty, current image URL (if any) will be used.</div>
            </div>
            <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="Author" className="border p-2 rounded" />
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="border p-2 rounded">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <input value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="Excerpt" className="border p-2 rounded md:col-span-2" />
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Content (HTML allowed)" className="border p-2 rounded md:col-span-2" rows={8} />
          </div>

          {previewUrl ? <div className="mt-3"><img src={previewUrl} alt="preview" style={{ maxWidth: 300 }} /></div> : null}
          {errorMessage ? <div className="text-red-600 mt-2">{errorMessage}</div> : null}

          <div className="mt-3">
            <button onClick={save} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Save</button>
            {editing && <button onClick={() => { setEditing(null); setForm({ title: '', slug: '', excerpt: '', content: '', featured_image: '', status: 'draft', author: '' }); setPreviewUrl(null); }} className="px-3 py-2 border rounded">Cancel</button>}
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-medium mb-4">Existing Posts</h2>
          {loading ? <div>Loading...</div> : (
            <div className="space-y-3">
              {posts.map((p) => (
                <div key={p.id} className="flex items-center justify-between border-b py-2">
                  <div>
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-sm text-gray-600">{p.slug} • {p.status}</div>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => startEdit(p)} className="px-3 py-1 border rounded">Edit</button>
                    <button onClick={() => { setDeleteTargetId(p.id); setShowDeleteModal(true); }} className="px-3 py-1 border rounded text-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Delete confirmation modal */}
        {showDeleteModal ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-40" onClick={() => { if (!deleteLoading) { setShowDeleteModal(false); setDeleteTargetId(null); } }} />
            <div className="bg-white rounded shadow-lg z-10 w-11/12 max-w-md p-6">
              <h3 className="text-lg font-semibold mb-2">Delete blog</h3>
              <p className="text-sm text-gray-600 mb-4">Are you sure you want to delete this blog post? This action cannot be undone.</p>
              <div className="flex justify-end space-x-2">
                <button onClick={() => { setShowDeleteModal(false); setDeleteTargetId(null); }} disabled={deleteLoading} className="px-4 py-2 border rounded">Cancel</button>
                <button onClick={async () => { await confirmDelete(); }} disabled={deleteLoading} className="px-4 py-2 bg-red-600 text-white rounded">{deleteLoading ? 'Deleting...' : 'Delete'}</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
