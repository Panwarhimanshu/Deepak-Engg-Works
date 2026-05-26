import { useEffect } from 'react';
import { useLang } from '../contexts/LangContext';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Pipette, Building2, Settings2,
  Wrench, ClipboardList, Pencil, CheckCircle2, Phone,
} from 'lucide-react';

const serviceIcons = [
  <Pipette size={32} />,
  <Building2 size={32} />,
  <Settings2 size={32} />,
  <Wrench size={32} />,
  <ClipboardList size={32} />,
  <Pencil size={32} />,
];

const whyUs = [
  { icon: '🏆', title: '22+ Years', desc: 'Proven track record in industrial engineering across Gujarat since 2002.' },
  { icon: '👷', title: 'Safety First', desc: 'Strict HSE protocols on every project — zero compromise.' },
  { icon: '⏱️', title: 'On-Time Delivery', desc: 'Committed to project timelines with transparent updates.' },
  { icon: '🤝', title: 'Client-Centric', desc: 'Tailored solutions with dedicated project management.' },
];

export default function Services() {
  const { t } = useLang();

  useEffect(() => {
    document.title = 'Services | Pipeline Works, Fabrication & Equipment Erection — Deepak Engineering Works';
  }, []);

  return (
    <div className="pt-32 overflow-x-hidden">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="hero-gradient relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full border border-orange-500/10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="section-badge mb-5">{t.services.title}</div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            {t.services.heading}
          </h1>
          <p className="text-gray-300 max-w-2xl text-sm sm:text-base leading-relaxed">
            Comprehensive industrial engineering solutions delivered with precision, safety, and reliability across Gujarat's industrial belt.
          </p>
        </div>
      </section>

      {/* ── SERVICE CARDS ──────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge mb-4 mx-auto inline-flex">What We Offer</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0b1d3a] mb-3">
              Our Core Services
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Every service is backed by industry-certified professionals and 15+ years of field experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.list.map((s, i) => (
              <div key={s.title} className="royal-card overflow-hidden group">
                {/* Card top bar */}
                <div className="h-1.5 bg-gradient-to-r from-orange-400 to-orange-600" />
                <div className="p-6 sm:p-8">
                  <div className="service-icon-bg w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-orange-500 group-hover:text-white transition-colors">
                    {serviceIcons[i]}
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0b1d3a] mb-3">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                  <div className="flex items-center gap-1.5 text-orange-500 text-sm font-semibold">
                    <CheckCircle2 size={16} /> Available across Gujarat
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge mb-4 mx-auto inline-flex">Why Choose Us</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0b1d3a]">
              What Sets Us Apart
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item) => (
              <div key={item.title} className="royal-card p-6 sm:p-7 text-center group">
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3 className="font-display font-bold text-[#0b1d3a] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="hero-gradient relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="section-badge mb-6 mx-auto inline-flex">Get Started</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Contact our engineering team for a project-specific consultation and detailed quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Get a Free Quote <ChevronRight size={18} />
            </Link>
            <a href="tel:+919824137362" className="btn-outline">
              <Phone size={18} /> Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
