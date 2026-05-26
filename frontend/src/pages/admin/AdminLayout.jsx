import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, MessageSquare, Image, Wrench, Settings2, TowerControl, PhoneCall, LogOut, Menu, X, Building2 } from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries' },
  { to: '/admin/gallery', icon: Image, label: 'Gallery' },
  { to: '/admin/services', icon: Wrench,       label: 'Services'   },
  { to: '/admin/cranes',   icon: TowerControl, label: 'Our Cranes' },
  { to: '/admin/clients',  icon: Building2,     label: 'Clients'    },
  { to: '/admin/contact',  icon: PhoneCall,     label: 'Contact'    },
  { to: '/admin/settings', icon: Settings2,    label: 'Settings'   },
];

export default function AdminLayout({ children, title, actions }) {
  const [open, setOpen] = useState(false);
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/admin'); };
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#0b1d3a] z-30 flex flex-col shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
          <div className="bg-white rounded-xl p-1 shrink-0">
            <img src="/logo.png" alt="Deepak Engineering Works" className="h-8 w-auto" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-orange-400 text-xs tracking-widest font-semibold">ADMIN PANEL</div>
          </div>
          <button onClick={() => setOpen(false)} className="ml-auto text-gray-500 hover:text-white lg:hidden shrink-0">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive(item.to)
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                  : 'text-gray-400 hover:bg-white/6 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-3 py-4 border-t border-white/8 space-y-1">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/30 rounded-full flex items-center justify-center text-orange-400 font-bold text-sm shrink-0">
              {username?.[0]?.toUpperCase()}
            </div>
            <span className="text-gray-300 text-sm truncate">{username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Content area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-800">
              <Menu size={22} />
            </button>
            <h1 className="font-bold text-[#0b1d3a] text-lg">{title}</h1>
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
