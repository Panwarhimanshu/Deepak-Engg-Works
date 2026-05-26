import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { ArrowLeft, Trash2, CheckCircle, Eye } from 'lucide-react';
import AdminLayout from './AdminLayout';

const STATUS_COLORS = {
  new:     'bg-red-100 text-red-700',
  read:    'bg-yellow-100 text-yellow-700',
  replied: 'bg-green-100 text-green-700',
};

export default function AdminInquiries() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState(null);

  useEffect(() => {
    api.get('/inquiries')
      .then((res) => setInquiries(res.data))
      .catch((err) => { if (err.response?.status === 401) { logout(); navigate('/admin'); } })
      .finally(() => setLoading(false));
  }, [logout, navigate]);

  const updateStatus = async (id, status) => {
    await api.patch(`/inquiries/${id}`, { status });
    setInquiries((prev) => prev.map((i) => i._id === id ? { ...i, status } : i));
    if (selected?._id === id) setSelected((s) => ({ ...s, status }));
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    await api.delete(`/inquiries/${id}`);
    setInquiries((prev) => prev.filter((i) => i._id !== id));
    if (selected?._id === id) setSelected(null);
  };

  return (
    <AdminLayout title="Inquiries">
      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading...</div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No inquiries yet.</div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-5">

          {/* List */}
          <div className={`lg:col-span-2 space-y-3 ${selected ? 'hidden lg:block' : ''}`}>
            {inquiries.map((inq) => (
              <div
                key={inq._id}
                onClick={() => setSelected(inq)}
                className={`bg-white rounded-xl p-4 shadow-sm cursor-pointer border-2 transition-colors ${
                  selected?._id === inq._id ? 'border-[#1a3c6e]' : 'border-transparent hover:border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <p className="font-semibold text-[#0b1d3a] text-sm">{inq.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[inq.status]}`}>
                    {inq.status}
                  </span>
                </div>
                <p className="text-gray-500 text-xs">{inq.service || 'General'}</p>
                <p className="text-gray-400 text-xs mt-1">{new Date(inq.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>

          {/* Detail */}
          <div className={`lg:col-span-3 ${!selected ? 'hidden lg:block' : ''}`}>
            {selected ? (
              <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
                <button
                  onClick={() => setSelected(null)}
                  className="lg:hidden flex items-center gap-1 text-sm text-gray-500 mb-4 hover:text-[#1a3c6e]"
                >
                  <ArrowLeft size={14} /> Back to list
                </button>

                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-[#0b1d3a]">{selected.name}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[selected.status]}`}>
                      {selected.status}
                    </span>
                  </div>
                  <button onClick={() => deleteInquiry(selected._id)} className="text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="space-y-2.5 mb-5 text-sm">
                  <div><span className="text-gray-400">Email:</span> <a href={`mailto:${selected.email}`} className="text-[#1a3c6e] hover:underline ml-2">{selected.email}</a></div>
                  <div><span className="text-gray-400">Phone:</span> <a href={`tel:${selected.phone}`}   className="text-[#1a3c6e] hover:underline ml-2">{selected.phone}</a></div>
                  <div><span className="text-gray-400">Service:</span> <span className="ml-2">{selected.service || '—'}</span></div>
                  {selected.interestedCranes?.length > 0 && (
                    <div>
                      <span className="text-gray-400">Interested Cranes:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {selected.interestedCranes.map((c) => (
                          <span key={c} className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div><span className="text-gray-400">Date:</span>    <span className="ml-2">{new Date(selected.createdAt).toLocaleString()}</span></div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-5">
                  <p className="text-xs font-medium text-gray-400 mb-2">Message</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{selected.message}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateStatus(selected._id, 'read')}
                    disabled={selected.status === 'read'}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-100 text-yellow-700 text-sm font-medium disabled:opacity-40"
                  >
                    <Eye size={16} /> Mark Read
                  </button>
                  <button
                    onClick={() => updateStatus(selected._id, 'replied')}
                    disabled={selected.status === 'replied'}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium disabled:opacity-40"
                  >
                    <CheckCircle size={16} /> Mark Replied
                  </button>
                  <a
                    href={`mailto:${selected.email}?subject=Re: Your Inquiry — Deepak Engineering Works`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a3c6e] text-white text-sm font-medium"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-10 text-center text-gray-400">
                Select an inquiry to view details
              </div>
            )}
          </div>

        </div>
      )}
    </AdminLayout>
  );
}
