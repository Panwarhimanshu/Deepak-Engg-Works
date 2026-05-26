import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const links = [
    { to: '/',        label: t.nav.home    },
    { to: '/about',   label: t.nav.about   },
    { to: '/services',label: t.nav.services },
    { to: '/gallery',    label: t.nav.gallery  },
    { to: '/our-cranes', label: 'Our Cranes'  },
    { to: '/clients',    label: 'Clients'      },
    { to: '/contact',    label: t.nav.contact  },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled || location.pathname !== '/'
            ? 'bg-[#060e1f]/95 backdrop-blur-md shadow-2xl shadow-black/30 border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-32">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-white rounded-2xl px-2 py-1 shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  src="/logo.png"
                  alt="Deepak Engineering Works"
                  className="h-28 w-auto"
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(l.to)
                      ? 'text-orange-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {l.label}
                  {isActive(l.to) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-400 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={toggle}
                className="px-3 py-1.5 rounded-lg border border-orange-400/40 text-orange-400 text-sm font-medium hover:bg-orange-400/10 transition-colors"
              >
                {lang === 'en' ? 'हिन्दी' : 'English'}
              </button>
              <a
                href="tel:+919824137362"
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-md shadow-orange-500/25"
              >
                <Phone size={14} /> +91 98241 37362
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-white bg-white/10 hover:bg-white/15 transition-colors"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-[#060e1f]/98 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-4 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(l.to)
                      ? 'bg-orange-500/15 text-orange-400 border border-orange-500/20'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="tel:+919824137362"
                  className="flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold py-3 rounded-xl text-sm"
                >
                  <Phone size={16} /> +91 98241 37362
                </a>
                <button
                  onClick={toggle}
                  className="w-full py-2.5 rounded-xl border border-orange-400/40 text-orange-400 text-sm"
                >
                  {lang === 'en' ? 'हिन्दी में देखें' : 'View in English'}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
