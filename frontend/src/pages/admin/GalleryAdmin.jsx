import { useState, useEffect, useRef } from 'react';
import api from '../../api/axios';
import { imageSrc } from '../../utils/imageUrl';
import { Upload, Trash2, Plus, X } from 'lucide-react';
import AdminLayout from './AdminLayout';

const CATEGORIES = ['Pipeline', 'Fabrication', 'Erection', 'Maintenance', 'General'];

export default function GalleryAdmin() {
  const [images,    setImages]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form,      setForm]      = useState({ title: '', category: 'General' });
  const [showForm,  setShowForm]  = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    api.get('/gallery')
      .then((res) => setImages(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = fileRef.current?.files[0];
    if (!file || !form.title) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('title', form.title);
      fd.append('category', form.category);
      const res = await api.post('/gallery', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setImages((prev) => [res.data, ...prev]);
      setForm({ title: '', category: 'General' });
      if (fileRef.current) fileRef.current.value = '';
      setShowForm(false);
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    await api.delete(`/gallery/${id}`);
    setImages((prev) => prev.filter((i) => i._id !== id));
  };

  const uploadButton = (
    <button
      onClick={() => setShowForm(true)}
      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
    >
      <Plus size={16} /> Upload Image
    </button>
  );

  return (
    <AdminLayout title="Gallery" actions={uploadButton}>

      {/* Upload form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-[#0b1d3a]">Upload New Image</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleUpload} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Image Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a3c6e] focus:ring-2 focus:ring-[#1a3c6e]/10"
                placeholder="e.g. Pipeline Installation 2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a3c6e]"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Image File *</label>
              <input
                type="file"
                ref={fileRef}
                accept="image/jpeg,image/png,image/webp"
                required
                className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#1a3c6e] file:text-white"
              />
            </div>
            <div className="sm:col-span-3 flex gap-3">
              <button
                type="submit"
                disabled={uploading}
                className="flex items-center gap-2 bg-[#1a3c6e] hover:bg-[#0b1d3a] disabled:opacity-60 text-white px-6 py-2.5 rounded-xl text-sm font-medium"
              >
                <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 py-20 text-center text-gray-400">
          <Upload size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No images yet. Upload your first project photo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img._id} className="relative group rounded-2xl overflow-hidden bg-gray-200 aspect-square shadow-sm">
              <img src={imageSrc(img.imageUrl)} alt={img.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                <p className="text-white text-xs font-semibold text-center leading-tight">{img.title}</p>
                <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">{img.category}</span>
                <button
                  onClick={() => handleDelete(img._id)}
                  className="mt-1 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
