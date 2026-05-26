import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { Phone, Mail, MapPin, Clock, ChevronRight } from 'lucide-react';

export default function Footer() {
  const { t } = useLang();

  const links = [
    { to: '/',        label: t.nav.home    },
    { to: '/about',   label: t.nav.about   },
    { to: '/services',label: t.nav.services },
    { to: '/gallery', label: t.nav.gallery  },
    { to: '/contact', label: t.nav.contact  },
  ];

  const services = [
    'Pipeline Works',
    'Structural Fabrication',
    'Equipment Erection',
    'Plant Maintenance',
    'Commissioning Services',
    'Engineering Drawings',
  ];

  return (
    <footer className="bg-[#060e1f] text-gray-400">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <div className="bg-white rounded-2xl px-2 py-1 inline-block">
                <img src="/logo.png" alt="Deepak Engineering Works" className="h-20 w-auto" />
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              {t.footer.tagline}. Specialists in Pipeline, Fabrication, Erection &amp; Plant Maintenance in Gujarat.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {[1,2,3,4,5].map((s) => (
                  <div key={s} className="w-3 h-3 rounded-full bg-orange-500/80" style={{ opacity: 0.4 + s * 0.12 }} />
                ))}
              </div>
              <span className="text-xs text-gray-500">GST Registered 2017</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="flex items-center gap-2 text-sm hover:text-orange-400 transition-colors group"
                  >
                    <ChevronRight size={14} className="text-orange-500/50 group-hover:text-orange-400 transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="flex items-center gap-2 text-sm hover:text-orange-400 transition-colors group"
                  >
                    <ChevronRight size={14} className="text-orange-500/50 group-hover:text-orange-400 transition-colors" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-orange-400" />
                </div>
                <span className="text-sm leading-relaxed">
                  S-18, James Plaza Square,<br />Asian Paint Chowkdi,<br />GIDC, Ankleshwar – 393 002
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-orange-400" />
                </div>
                <div className="text-sm">
                  <a href="tel:+919824137362" className="hover:text-orange-400 transition-colors block">+91 98241 37362</a>
                  <a href="tel:+918401608487" className="hover:text-orange-400 transition-colors block">+91 84016 08487</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-orange-400" />
                </div>
                <div className="text-sm">
                  <a href="mailto:deepak.enggwork@yahoo.com" className="hover:text-orange-400 transition-colors block break-all">deepak.enggwork@yahoo.com</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                  <Clock size={14} className="text-orange-400" />
                </div>
                <span className="text-sm">{t.contact.hoursValue}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} Deepak Engineering Works. {t.footer.rights}</span>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-orange-400 transition-colors">Contact</Link>
            <Link to="/gallery" className="hover:text-orange-400 transition-colors">Gallery</Link>
            <Link to="/admin" className="hover:text-orange-400 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
