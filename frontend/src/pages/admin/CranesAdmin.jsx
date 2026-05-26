import { useState, useEffect, useRef } from 'react';
import api from '../../api/axios';
import { Plus, Pencil, Trash2, Check, X, Upload, Image } from 'lucide-react';
import AdminLayout from './AdminLayout';

const CATEGORIES = ['Telescopic Boom', 'Lattice Boom', 'Crawler', 'Pick & Carry'];
const emptyForm  = { name: '', category: 'Telescopic Boom', capacity: '', mainBoom: '', jib: '', order: 0 };
const API_ORIGIN  = import.meta.env.VITE_API_BASE?.replace('/api', '') ?? 'http://localhost:5000';

/* ── Form lives OUTSIDE parent so it never gets recreated on re-render ── */
function CraneForm({ form, setForm, preview, onPickImage, fileRef, saving, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Crane Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            placeholder="e.g. Sany SAC5000S"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3c6e]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Category *</label>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3c6e] bg-white"
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Capacity (Tons) *</label>
          <input
            type="number"
            value={form.capacity}
            onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))}
            required
            placeholder="e.g. 500"
            min={1}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3c6e]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Order</label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3c6e]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Main Boom (m)</label>
          <input
            type="number"
            value={form.mainBoom}
            onChange={(e) => setForm((f) => ({ ...f, mainBoom: e.target.value }))}
            placeholder="e.g. 84"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3c6e]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Jib Length (m)</label>
          <input
            type="number"
            value={form.jib}
            onChange={(e) => setForm((f) => ({ ...f, jib: e.target.value }))}
            placeholder="e.g. 36"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3c6e]"
          />
        </div>
      </div>

      {/* Image upload */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Crane Image</label>
        <div
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-3 border-2 border-dashed border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-[#1a3c6e]/50 transition-colors"
        >
          {preview ? (
            <img src={preview} alt="preview" className="w-16 h-12 object-cover rounded-lg shrink-0" />
          ) : (
            <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
              <Image size={20} className="text-gray-400" />
            </div>
          )}
          <div className="text-sm text-gray-500">
            <span className="text-[#1a3c6e] font-semibold">Click to upload</span> a crane photo
            <br /><span className="text-xs text-gray-400">JPG, PNG, WEBP — max 5MB</span>
          </div>
          <Upload size={16} className="text-gray-400 ml-auto" />
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={onPickImage} className="hidden" />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-[#1a3c6e] hover:bg-[#0b1d3a] disabled:opacity-60 text-white px-5 py-2 rounded-xl text-sm font-medium"
        >
          <Check size={15} /> {saving ? 'Saving…' : 'Save'}
        </button>
        <button type="button" onClick={onCancel} className="flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2 rounded-xl text-sm">
          <X size={15} /> Cancel
        </button>
      </div>
    </form>
  );
}

/* ── Main admin page ──────────────────────────────────────────────────── */
export default function CranesAdmin() {
  const [cranes,    setCranes]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [editing,   setEditing]   = useState(null);
  const [form,      setForm]      = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview,   setPreview]   = useState('');
  const [showAdd,   setShowAdd]   = useState(false);
  const [saving,    setSaving]    = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    api.get('/cranes')
      .then((res) => setCranes(res.data))
      .finally(() => setLoading(false));
  }, []);

  const pickImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setPreview('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const buildFormData = () => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v !== '' && v !== null && v !== undefined) fd.append(k, v);
    });
    if (imageFile) fd.append('image', imageFile);
    return fd;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.post('/cranes', buildFormData());
      setCranes((prev) => [...prev, res.data]);
      resetForm();
      setShowAdd(false);
    } catch (err) {
      alert('Failed to add crane: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (crane) => {
    setEditing(crane._id);
    setForm({
      name:     crane.name,
      category: crane.category,
      capacity: crane.capacity,
      mainBoom: crane.mainBoom ?? '',
      jib:      crane.jib      ?? '',
      order:    crane.order,
    });
    setImageFile(null);
    setPreview(crane.imageUrl ? `${API_ORIGIN}${crane.imageUrl}` : '');
    setShowAdd(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleUpdate = async (id) => {
    setSaving(true);
    try {
      const res = await api.put(`/cranes/${id}`, buildFormData());
      setCranes((prev) => prev.map((c) => c._id === id ? res.data : c));
      setEditing(null);
      resetForm();
    } catch (err) {
      alert('Failed to update crane: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this crane?')) return;
    await api.delete(`/cranes/${id}`);
    setCranes((prev) => prev.filter((c) => c._id !== id));
  };

  const cancelEdit = () => { setEditing(null); resetForm(); };
  const cancelAdd  = () => { setShowAdd(false); resetForm(); };

  const addButton = (
    <button
      onClick={() => { setShowAdd(true); setEditing(null); resetForm(); }}
      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
    >
      <Plus size={16} /> Add Crane
    </button>
  );

  return (
    <AdminLayout title="Our Cranes" actions={addButton}>

      {showAdd && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h2 className="font-bold text-[#0b1d3a] mb-4">New Crane</h2>
          <CraneForm
            form={form} setForm={setForm}
            preview={preview} onPickImage={pickImage}
            fileRef={fileRef} saving={saving}
            onSubmit={handleAdd} onCancel={cancelAdd}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading…</div>
      ) : cranes.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No cranes yet. Add your first one.</div>
      ) : (
        <div className="space-y-3">
          {cranes.map((crane) => (
            <div key={crane._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              {editing === crane._id ? (
                <>
                  <h3 className="font-bold text-[#0b1d3a] mb-4">Edit: {crane.name}</h3>
                  <CraneForm
                    form={form} setForm={setForm}
                    preview={preview} onPickImage={pickImage}
                    fileRef={fileRef} saving={saving}
                    onSubmit={(e) => { e.preventDefault(); handleUpdate(crane._id); }}
                    onCancel={cancelEdit}
                  />
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    {crane.imageUrl ? (
                      <img src={`${API_ORIGIN}${crane.imageUrl}`} alt={crane.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image size={18} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">#{crane.order}</span>
                      <h3 className="font-bold text-[#0b1d3a] truncate">{crane.name}</h3>
                      <span className="text-xs bg-[#1a3c6e]/10 text-[#1a3c6e] px-2 py-0.5 rounded-full font-medium">{crane.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <span className="font-semibold text-orange-500">{crane.capacity}T</span>
                      {crane.mainBoom && <span>Boom: {crane.mainBoom}m</span>}
                      {crane.jib      && <span>Jib: {crane.jib}m</span>}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => startEdit(crane)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(crane._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
