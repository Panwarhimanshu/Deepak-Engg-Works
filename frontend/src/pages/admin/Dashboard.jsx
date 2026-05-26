import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { MessageSquare, Image, Wrench, Eye } from 'lucide-react';
import AdminLayout from './AdminLayout';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ inquiries: 0, gallery: 0, services: 0, newInquiries: 0, totalViews: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/inquiries'),
      api.get('/gallery'),
      api.get('/services'),
      api.get('/views'),
    ]).then(([inq, gal, svc, views]) => {
      setStats({
        inquiries: inq.data.length,
        gallery: gal.data.length,
        services: svc.data.length,
        newInquiries: inq.data.filter((i) => i.status === 'new').length,
        totalViews: views.data.totalViews ?? 0,
      });
    }).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Website Views',   value: stats.totalViews,   icon: <Eye size={22} />,           color: '#7c3aed', bg: '#7c3aed18' },
          { label: 'Total Inquiries', value: stats.inquiries,    icon: <MessageSquare size={22} />, color: '#1a3c6e', bg: '#1a3c6e18' },
          { label: 'New Inquiries',   value: stats.newInquiries, icon: <MessageSquare size={22} />, color: '#dc2626', bg: '#dc262618' },
          { label: 'Gallery Images',  value: stats.gallery,      icon: <Image size={22} />,         color: '#f97316', bg: '#f9731618' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg, color: s.color }}>
              {s.icon}
            </div>
            <div className="text-3xl font-bold text-[#0b1d3a]">{s.value}</div>
            <div className="text-gray-500 text-sm mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick nav cards */}
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Manage</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { to: '/admin/inquiries', icon: <MessageSquare size={28} />, label: 'Inquiries',    desc: 'View and manage client inquiries',      color: '#1a3c6e', bg: '#1a3c6e12' },
          { to: '/admin/gallery',   icon: <Image size={28} />,         label: 'Gallery',      desc: 'Upload and delete project photos',       color: '#f97316', bg: '#f9731612' },
          { to: '/admin/services',  icon: <Wrench size={28} />,        label: 'Services',     desc: 'Add, edit and remove service listings',  color: '#16a34a', bg: '#16a34a12' },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors" style={{ background: item.bg, color: item.color }}>
              {item.icon}
            </div>
            <h3 className="font-bold text-[#0b1d3a] mb-1">{item.label}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}
