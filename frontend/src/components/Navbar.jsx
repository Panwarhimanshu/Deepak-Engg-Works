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
    { to: '/',         label: t.nav.home     },
    { to: '/about',    label: t.nav.about    },
    { to: '/services', label: t.nav.services  },
    { to: '/gallery',  label: t.nav.gallery   },
    { to: '/our-cranes', label: 'Our Cranes'  },
    { to: '/clients',    label: 'Clients'     },
    { to: '/contact',    label: t.nav.contact },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const isDark = scrolled || location.pathname !== '/';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isDark
            ? 'bg-[#060d1b]/97 backdrop-blur-md shadow-2xl shadow-black/40'
            : 'bg-transparent'
        }`}
        style={isDark ? { borderBottom: '1px solid rgba(217,119,6,0.15)' } : {}}
      >
        {/* Yellow engineering accent line at very top */}
        <div className="h-0.5 bg-[#d97706]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0 group leading-none">
              <div>
                <div
                  className="font-bold text-white group-hover:text-[#d97706] transition-colors"
                  style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif", fontSize: '1.45rem', lineHeight: 1.05 }}
                >
                  DEEPAK ENGINEERING
                </div>
                <div
                  className="font-bold"
                  style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif", fontSize: '1.45rem', lineHeight: 1.05, color: '#d97706' }}
                >
                  WORKS
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                    isActive(l.to)
                      ? 'text-[#d97706]'
                      : 'text-gray-300 hover:text-[#d97706]'
                  }`}
                  style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif", letterSpacing: '0.12em' }}
                >
                  {l.label}
                  {isActive(l.to) && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#d97706] rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={toggle}
                className="px-3 py-1.5 rounded border border-[#d97706]/40 text-[#d97706] text-xs font-bold tracking-wider hover:bg-[#d97706]/10 transition-colors"
                style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}
              >
                {lang === 'en' ? 'हिन्दी' : 'English'}
              </button>
              <a
                href="tel:+919824137362"
                className="flex items-center gap-2 text-white text-xs font-bold px-4 py-2.5 rounded transition-all shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  fontFamily: "'Barlow Condensed', system-ui, sans-serif",
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 16px rgba(249,115,22,0.40)',
                }}
              >
                <Phone size={13} /> +91 98241 37362
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded text-white bg-white/10 hover:bg-[#d97706]/20 hover:text-[#d97706] transition-colors"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-[#060d1b]/99 backdrop-blur-md" style={{ borderTop: '1px solid rgba(217,119,6,0.15)' }}>
            <div className="px-4 py-4 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`flex items-center px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                    isActive(l.to)
                      ? 'text-[#d97706] bg-[#d97706]/10 border-l-2 border-[#d97706]'
                      : 'text-gray-300 hover:bg-white/5 hover:text-[#d97706]'
                  }`}
                  style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif", letterSpacing: '0.12em' }}
                >
                  {l.label}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <a
                  href="tel:+919824137362"
                  className="flex items-center justify-center gap-2 text-white font-bold py-3 rounded text-sm uppercase tracking-wider"
                  style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)', fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}
                >
                  <Phone size={15} /> +91 98241 37362
                </a>
                <button
                  onClick={toggle}
                  className="w-full py-2.5 rounded border border-[#d97706]/40 text-[#d97706] text-sm font-bold"
                  style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}
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
