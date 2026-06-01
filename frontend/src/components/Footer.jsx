import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { Phone, Mail, MapPin, Clock, ChevronRight } from 'lucide-react';

export default function Footer() {
  const { t } = useLang();

  const links = [
    { to: '/',          label: t.nav.home     },
    { to: '/about',     label: t.nav.about    },
    { to: '/services',  label: t.nav.services  },
    { to: '/gallery',   label: t.nav.gallery   },
    { to: '/our-cranes',label: 'Our Cranes'    },
    { to: '/clients',   label: 'Clients'       },
    { to: '/contact',   label: t.nav.contact   },
  ];

  const services = [
    'Pipeline Works',
    'Structural Fabrication',
    'Equipment Erection',
    'Plant Maintenance',
    'Commissioning Services',
    'Engineering Drawings',
    'Heavy Crane Operations',
  ];

  return (
    <footer style={{ background: '#ffffff', color: '#4b5563', borderTop: '1px solid #e5e7eb' }}>
      {/* Gold engineering accent bar */}
      <div className="h-1 bg-[#d97706]" />

      {/* Certification strip */}
      <div className="border-b" style={{ borderColor: '#f3f4f6', background: '#fafaf8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6 text-xs text-gray-500 flex-wrap"
            style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-none inline-block" style={{ background: '#d97706' }} />
              ISO 9001:2015 Certified
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-none inline-block" style={{ background: '#d97706' }} />
              GSTIN: 24BBJPS3473G1ZG
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-none inline-block" style={{ background: '#d97706' }} />
              Est. 2002, Ankleshwar GIDC
            </span>
          </div>
          <span className="text-xs text-gray-400 uppercase tracking-widest"
            style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}>
            HEAVY LIFT · FABRICATION · ERECTION
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-5 leading-none">
              <div
                className="font-bold text-gray-900 hover:text-[#d97706] transition-colors"
                style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif", fontSize: '1.9rem', lineHeight: 1 }}
              >
                DEEPAK<br />
                ENGINEERING<br />
                <span style={{ color: '#d97706' }}>WORKS</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-5 text-gray-500">
              {t.footer.tagline}. Specialists in Pipeline, Fabrication, Erection &amp; Plant Maintenance in Gujarat's industrial heartland.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {['ISO 9001:2015', 'GST Registered', '400+ Workforce'].map((badge) => (
                <span key={badge} className="text-xs px-2 py-1 border rounded-none"
                  style={{
                    borderColor: 'rgba(217,119,6,0.3)',
                    color: '#d97706',
                    fontFamily: "'Barlow Condensed', system-ui, sans-serif",
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-5 text-xs uppercase tracking-widest"
              style={{ color: '#d97706', fontFamily: "'Barlow Condensed', system-ui, sans-serif", letterSpacing: '0.18em' }}>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
                  >
                    <ChevronRight size={12} style={{ color: 'rgba(217,119,6,0.5)' }} className="group-hover:text-[#d97706] transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-5 text-xs uppercase tracking-widest"
              style={{ color: '#d97706', fontFamily: "'Barlow Condensed', system-ui, sans-serif", letterSpacing: '0.18em' }}>
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
                  >
                    <ChevronRight size={12} style={{ color: 'rgba(217,119,6,0.5)' }} className="group-hover:text-[#d97706] transition-colors" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-5 text-xs uppercase tracking-widest"
              style={{ color: '#d97706', fontFamily: "'Barlow Condensed', system-ui, sans-serif", letterSpacing: '0.18em' }}>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 flex items-center justify-center shrink-0 rounded-none border"
                  style={{ background: 'rgba(217,119,6,0.08)', borderColor: 'rgba(217,119,6,0.2)' }}>
                  <MapPin size={13} style={{ color: '#d97706' }} />
                </div>
                <span className="text-sm leading-relaxed text-gray-500">
                  S-18, James Plaza Square,<br />Asian Paint Chowkdi,<br />GIDC, Ankleshwar – 393 002
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 flex items-center justify-center shrink-0 rounded-none border"
                  style={{ background: 'rgba(217,119,6,0.08)', borderColor: 'rgba(217,119,6,0.2)' }}>
                  <Phone size={13} style={{ color: '#d97706' }} />
                </div>
                <div className="text-sm">
                  <a href="tel:+919824137362" className="text-gray-600 hover:text-gray-900 transition-colors block">+91 98241 37362</a>
                  <a href="tel:+918401608487" className="text-gray-600 hover:text-gray-900 transition-colors block">+91 84016 08487</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 flex items-center justify-center shrink-0 rounded-none border"
                  style={{ background: 'rgba(217,119,6,0.08)', borderColor: 'rgba(217,119,6,0.2)' }}>
                  <Mail size={13} style={{ color: '#d97706' }} />
                </div>
                <a href="mailto:deepak.enggwork@yahoo.com" className="text-sm text-gray-600 hover:text-gray-900 transition-colors break-all">
                  deepak.enggwork@yahoo.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 flex items-center justify-center shrink-0 rounded-none border"
                  style={{ background: 'rgba(217,119,6,0.08)', borderColor: 'rgba(217,119,6,0.2)' }}>
                  <Clock size={13} style={{ color: '#d97706' }} />
                </div>
                <span className="text-sm text-gray-500">{t.contact.hoursValue}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
          style={{ borderColor: '#e5e7eb', color: '#6b7280' }}>
          <span>© {new Date().getFullYear()} Deepak Engineering Works. {t.footer.rights}</span>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-[#d97706] transition-colors uppercase tracking-wider"
              style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}>Contact</Link>
            <Link to="/gallery" className="hover:text-[#d97706] transition-colors uppercase tracking-wider"
              style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}>Gallery</Link>
            <Link to="/admin" className="hover:text-[#d97706] transition-colors uppercase tracking-wider"
              style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}>Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
