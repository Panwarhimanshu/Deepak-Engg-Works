import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Plus, Trash2, TowerControl, Pencil, Check, X } from 'lucide-react';
import AdminLayout from './AdminLayout';

export default function ContactAdmin() {
  const [craneOptions, setCraneOptions] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [newName,      setNewName]      = useState('');
  const [adding,       setAdding]       = useState(false);
  const [error,        setError]        = useState('');
  const [editingName,  setEditingName]  = useState(null);
  const [editValue,    setEditValue]    = useState('');
  const [editError,    setEditError]    = useState('');
  const [saving,       setSaving]       = useState(false);

  useEffect(() => {
    api.get('/contact-config')
      .then((res) => setCraneOptions(res.data.craneOptions ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);
    setError('');
    try {
      const res = await api.post('/contact-config/cranes', { name: newName.trim() });
      setCraneOptions(res.data.craneOptions);
      setNewName('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (name) => {
    if (!window.confirm(`Remove "${name}" from contact form?`)) return;
    try {
      const res = await api.delete(`/contact-config/cranes/${encodeURIComponent(name)}`);
      setCraneOptions(res.data.craneOptions);
    } catch {
      alert('Failed to delete');
    }
  };

  const startEdit = (name) => {
    setEditingName(name);
    setEditValue(name);
    setEditError('');
  };

  const cancelEdit = () => {
    setEditingName(null);
    setEditValue('');
    setEditError('');
  };

  const handleSaveEdit = async (oldName) => {
    if (!editValue.trim()) return;
    if (editValue.trim() === oldName) { cancelEdit(); return; }
    setSaving(true);
    setEditError('');
    try {
      const res = await api.put(`/contact-config/cranes/${encodeURIComponent(oldName)}`, { name: editValue.trim() });
      setCraneOptions(res.data.craneOptions);
      cancelEdit();
    } catch (err) {
      setEditError(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Contact Form Settings">
      <div className="max-w-2xl space-y-6">

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm text-blue-700">
          Crane names added here will appear as a <strong>multi-select</strong> on the public contact form under <em>"Interested in Our Cranes"</em>. Users can pick one or more before submitting their inquiry.
        </div>

        {/* Add form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-[#0b1d3a] mb-4 flex items-center gap-2">
            <TowerControl size={18} className="text-orange-500" /> Crane Options for Contact Form
          </h2>

          <form onSubmit={handleAdd} className="flex gap-3 mb-5">
            <input
              type="text"
              value={newName}
              onChange={(e) => { setNewName(e.target.value); setError(''); }}
              placeholder="e.g. Sany SAC 500T"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a3c6e] focus:ring-2 focus:ring-[#1a3c6e]/10 transition"
            />
            <button
              type="submit"
              disabled={adding || !newName.trim()}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            >
              <Plus size={16} /> {adding ? 'Adding…' : 'Add'}
            </button>
          </form>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading…</div>
          ) : craneOptions.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No crane options yet. Add the first one above.
            </div>
          ) : (
            <div className="space-y-2">
              {craneOptions.map((name) => (
                <div key={name} className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
                  {editingName === name ? (
                    <div className="px-4 py-3 space-y-2">
                      <div className="flex gap-2">
                        <input
                          autoFocus
                          type="text"
                          value={editValue}
                          onChange={(e) => { setEditValue(e.target.value); setEditError(''); }}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit(name); if (e.key === 'Escape') cancelEdit(); }}
                          className="flex-1 border border-[#1a3c6e] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c6e]/20"
                        />
                        <button
                          onClick={() => handleSaveEdit(name)}
                          disabled={saving || !editValue.trim()}
                          className="flex items-center gap-1.5 px-3 py-2 bg-[#1a3c6e] hover:bg-[#0f2444] disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition-colors"
                        >
                          <Check size={14} /> {saving ? 'Saving…' : 'Save'}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-2 text-gray-400 hover:bg-gray-200 rounded-lg transition-colors"
                          title="Cancel"
                        >
                          <X size={15} />
                        </button>
                      </div>
                      {editError && <p className="text-red-500 text-xs">{editError}</p>}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full shrink-0" />
                        <span className="text-sm font-medium text-[#0b1d3a]">{name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEdit(name)}
                          className="p-1.5 text-blue-400 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(name)}
                          className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preview */}
        {craneOptions.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-bold text-[#0b1d3a] mb-3 text-sm">Contact Form Preview</h2>
            <p className="text-xs text-gray-400 mb-3">This is how the multi-select looks to users on the contact page:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {craneOptions.map((name) => (
                <div key={name} className="px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-600 flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded border border-gray-300 shrink-0" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
