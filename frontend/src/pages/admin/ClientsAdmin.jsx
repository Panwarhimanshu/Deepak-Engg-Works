import { useState, useEffect, useRef } from 'react';
import api from '../../api/axios';
import { imageSrc } from '../../utils/imageUrl';
import { Plus, Trash2, Upload, Building2, X, Pencil, Check, Save } from 'lucide-react';
import AdminLayout from './AdminLayout';

const emptyForm = { name: '', sector: '', type: 'running', order: 0 };

/* ── Shared form (used for both Add and Edit) ─────────────────── */
function ClientForm({ form, setForm, preview, setPreview, onPickLogo, fileRef, saving, onSubmit, onCancel, isEdit, existingLogoUrl }) {
  const handleRemoveLogo = () => {
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
    setForm((f) => ({ ...f, _removeLogo: true }));
  };

  const currentLogo = preview || (existingLogoUrl && !form._removeLogo ? imageSrc(existingLogoUrl) : null);

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-6">
      <h2 className="font-bold text-[#0b1d3a] mb-5 text-base flex items-center gap-2">
        {isEdit ? <><Pencil size={15} className="text-orange-500" /> Edit Client</> : <><Plus size={15} className="text-orange-500" /> Add New Client</>}
      </h2>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Client Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="e.g. Aarti Industries Ltd"
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a3c6e] focus:ring-2 focus:ring-[#1a3c6e]/10 transition"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Sector / Industry</label>
          <input
            type="text"
            value={form.sector}
            onChange={(e) => setForm((f) => ({ ...f, sector: e.target.value }))}
            placeholder="e.g. Specialty Chemicals"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a3c6e] focus:ring-2 focus:ring-[#1a3c6e]/10 transition"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Type *</label>
          <div className="flex gap-3">
            {['running', 'past'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm((f) => ({ ...f, type: t }))}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  form.type === t
                    ? t === 'running' ? 'bg-green-500 border-green-500 text-white' : 'bg-gray-600 border-gray-600 text-white'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {t === 'running' ? 'Running' : 'Past'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Display Order</label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
            min={0}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a3c6e] focus:ring-2 focus:ring-[#1a3c6e]/10 transition"
          />
        </div>
      </div>

      {/* Logo section */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-gray-500 mb-2">Client Logo</label>
        <div className="flex items-center gap-4 flex-wrap">
          {currentLogo ? (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <img src={currentLogo} alt="logo" className="h-14 w-auto object-contain rounded-lg" />
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-1.5 text-xs text-[#1a3c6e] font-medium hover:underline"
                >
                  <Upload size={12} /> Change logo
                </button>
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="flex items-center gap-1.5 text-xs text-red-400 font-medium hover:underline"
                >
                  <X size={12} /> Remove logo
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-[#1a3c6e]/40 hover:text-[#1a3c6e] transition-colors"
            >
              <Upload size={16} /> Upload Logo
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPickLogo} />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving || !form.name.trim()}
          className="flex items-center gap-2 bg-[#1a3c6e] hover:bg-[#0b1d3a] disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          {isEdit ? <><Save size={15} /> {saving ? 'Saving…' : 'Save Changes'}</> : <><Plus size={15} /> {saving ? 'Adding…' : 'Add Client'}</>}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ── Main page ─────────────────────────────────────────────────── */
export default function ClientsAdmin() {
  const [clients,    setClients]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [showForm,   setShowForm]   = useState(false);
  const [editingId,  setEditingId]  = useState(null);
  const [form,       setForm]       = useState(emptyForm);
  const [preview,    setPreview]    = useState(null);
  const [saving,     setSaving]     = useState(false);
  const [error,      setError]      = useState('');
  const fileRef = useRef(null);

  useEffect(() => {
    api.get('/clients')
      .then((res) => setClients(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setPreview(null);
    setError('');
    setShowForm(true);
    if (fileRef.current) fileRef.current.value = '';
  };

  const openEdit = (client) => {
    setEditingId(client._id);
    setForm({ name: client.name, sector: client.sector || '', type: client.type, order: client.order ?? 0 });
    setPreview(null);
    setError('');
    setShowForm(true);
    if (fileRef.current) fileRef.current.value = '';
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setPreview(null);
    setError('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const handlePickLogo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setForm((f) => ({ ...f, _removeLogo: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('name',   form.name.trim());
      fd.append('sector', form.sector.trim());
      fd.append('type',   form.type);
      fd.append('order',  form.order);
      if (fileRef.current?.files[0]) fd.append('logo', fileRef.current.files[0]);
      if (form._removeLogo) fd.append('removeLogo', 'true');

      if (editingId) {
        const res = await api.put(`/clients/${editingId}`, fd);
        setClients((prev) => prev.map((c) => c._id === editingId ? res.data : c));
      } else {
        const res = await api.post('/clients', fd);
        setClients((prev) => [...prev, res.data]);
      }
      closeForm();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this client?')) return;
    await api.delete(`/clients/${id}`);
    setClients((prev) => prev.filter((c) => c._id !== id));
    if (editingId === id) closeForm();
  };

  const running = clients.filter((c) => c.type === 'running');
  const past    = clients.filter((c) => c.type === 'past');
  const editingClient = clients.find((c) => c._id === editingId);

  return (
    <AdminLayout
      title="Clients"
      actions={
        !showForm && (
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-[#1a3c6e] hover:bg-[#0b1d3a] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            <Plus size={16} /> Add Client
          </button>
        )
      }
    >
      {showForm && (
        <ClientForm
          form={form}
          setForm={setForm}
          preview={preview}
          setPreview={setPreview}
          onPickLogo={handlePickLogo}
          fileRef={fileRef}
          saving={saving}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          isEdit={!!editingId}
          existingLogoUrl={editingClient?.logoUrl}
        />
      )}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading…</div>
      ) : clients.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No clients yet. Click "Add Client" to get started.</div>
      ) : (
        <div className="space-y-8">
          {[
            { label: 'Running Clients', badge: 'bg-green-100 text-green-700', items: running },
            { label: 'Past Clients',    badge: 'bg-gray-100 text-gray-600',   items: past    },
          ].map(({ label, badge, items }) =>
            items.length === 0 ? null : (
              <div key={label}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badge}`}>{label}</span>
                  <span className="text-xs text-gray-400">{items.length} client{items.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map((client) => (
                    <div
                      key={client._id}
                      className={`bg-white rounded-xl border shadow-sm p-4 flex items-center gap-3 transition-all ${
                        editingId === client._id ? 'border-[#1a3c6e] ring-2 ring-[#1a3c6e]/10' : 'border-gray-100'
                      }`}
                    >
                      {/* Logo */}
                      <div className="w-14 h-14 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
                        {client.logoUrl
                          ? <img src={imageSrc(client.logoUrl)} alt={client.name} className="w-full h-full object-contain p-1" />
                          : <Building2 size={20} className="text-gray-300" />
                        }
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-[#0b1d3a] text-sm leading-tight truncate">{client.name}</p>
                        {client.sector && <p className="text-gray-400 text-xs mt-0.5 truncate">{client.sector}</p>}
                        {!client.logoUrl && (
                          <p className="text-orange-400 text-xs mt-1 flex items-center gap-1">
                            <Upload size={10} /> No logo
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-1 shrink-0">
                        <button
                          onClick={() => editingId === client._id ? closeForm() : openEdit(client)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            editingId === client._id
                              ? 'bg-[#1a3c6e]/10 text-[#1a3c6e]'
                              : 'text-gray-400 hover:bg-blue-50 hover:text-[#1a3c6e]'
                          }`}
                          title="Edit"
                        >
                          {editingId === client._id ? <Check size={15} /> : <Pencil size={15} />}
                        </button>
                        <button
                          onClick={() => handleDelete(client._id)}
                          className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </AdminLayout>
  );
}
