import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import AdminLayout from './AdminLayout';

const emptyForm = { title: '', description: '', icon: 'wrench', order: 0 };

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [editing,  setEditing]  = useState(null);
  const [form,     setForm]     = useState(emptyForm);
  const [showAdd,  setShowAdd]  = useState(false);

  useEffect(() => {
    api.get('/services')
      .then((res) => setServices(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await api.post('/services', form);
    setServices((prev) => [...prev, res.data]);
    setForm(emptyForm);
    setShowAdd(false);
  };

  const startEdit = (svc) => {
    setEditing(svc._id);
    setForm({ title: svc.title, description: svc.description, icon: svc.icon, order: svc.order });
    setShowAdd(false);
  };

  const handleUpdate = async (id) => {
    const res = await api.put(`/services/${id}`, form);
    setServices((prev) => prev.map((s) => s._id === id ? res.data : s));
    setEditing(null);
    setForm(emptyForm);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    await api.delete(`/services/${id}`);
    setServices((prev) => prev.filter((s) => s._id !== id));
  };

  const cancelEdit = () => { setEditing(null); setForm(emptyForm); };
  const cancelAdd  = () => { setShowAdd(false); setForm(emptyForm); };

  const ServiceForm = ({ onSubmit, onCancel }) => (
    <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3c6e]"
          placeholder="Service title"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Order</label>
        <input
          type="number"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3c6e]"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Description *</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3c6e] resize-none"
          placeholder="Brief description of the service"
        />
      </div>
      <div className="sm:col-span-2 flex gap-3">
        <button type="submit" className="flex items-center gap-2 bg-[#1a3c6e] hover:bg-[#0b1d3a] text-white px-5 py-2 rounded-xl text-sm font-medium">
          <Check size={15} /> Save
        </button>
        <button type="button" onClick={onCancel} className="flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2 rounded-xl text-sm">
          <X size={15} /> Cancel
        </button>
      </div>
    </form>
  );

  const addButton = (
    <button
      onClick={() => { setShowAdd(true); setEditing(null); setForm(emptyForm); }}
      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
    >
      <Plus size={16} /> Add Service
    </button>
  );

  return (
    <AdminLayout title="Services" actions={addButton}>

      {/* Add form */}
      {showAdd && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h2 className="font-bold text-[#0b1d3a] mb-4">New Service</h2>
          <ServiceForm onSubmit={handleAdd} onCancel={cancelAdd} />
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No services yet.</div>
      ) : (
        <div className="space-y-3">
          {services.map((svc) => (
            <div key={svc._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              {editing === svc._id ? (
                <ServiceForm
                  onSubmit={(e) => { e.preventDefault(); handleUpdate(svc._id); }}
                  onCancel={cancelEdit}
                />
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">#{svc.order}</span>
                      <h3 className="font-bold text-[#0b1d3a]">{svc.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{svc.description}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => startEdit(svc)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(svc._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
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
