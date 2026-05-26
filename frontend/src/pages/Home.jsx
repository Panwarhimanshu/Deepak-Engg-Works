import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import {
  ChevronRight, Award, Users, Briefcase, ShieldCheck,
  Pipette, Building2, Settings2, Wrench, ClipboardList,
  Pencil, Phone, MessageCircle, Star, ArrowRight,
} from 'lucide-react';

/* ── Animated counter ─────────────────────────────────────────── */
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, suffix, label, started }) {
  const count = useCounter(value, 1800, started);
  return (
    <div className="stat-card royal-card p-6 text-center">
      <div className="text-4xl font-bold text-orange-500 mb-1 font-display">
        {count}{suffix}
      </div>
      <div className="text-gray-500 text-sm font-medium">{label}</div>
    </div>
  );
}

/* ── Service icons map ────────────────────────────────────────── */
const serviceIconMap = [
  <Pipette size={28} />,
  <Building2 size={28} />,
  <Settings2 size={28} />,
  <Wrench size={28} />,
  <ClipboardList size={28} />,
  <Pencil size={28} />,
];

/* ── Highlight features ───────────────────────────────────────── */
const highlights = [
  { icon: <Award size={22} />, label: 'ISO 9001:2015 Certified' },
  { icon: <Users size={22} />, label: '400+ Skilled Workforce' },
  { icon: <Briefcase size={22} />, label: '22+ Years Experience' },
  { icon: <ShieldCheck size={22} />, label: 'Zero Accident Record' },
];

/* ════════════════════════════════════════════════════════════════ */
export default function Home() {
  const { t } = useLang();
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    document.title = 'Deepak Engineering Works | ISO 9001:2015 Certified Industrial Contractor — Ankleshwar, Gujarat';
  }, []);

  /* Intersection Observer for counter trigger */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero-gradient relative min-h-screen flex items-center pt-32 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full border border-orange-500/10 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[320px] h-[320px] rounded-full border border-orange-500/15 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-orange-500/5 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        {/* Dot pattern */}
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="section-badge mb-6">
              <Star size={12} fill="currentColor" />
              {t.hero.tagline}
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
              Welcome to Deepak Engineering Works
            </h1>

            {/* Gold divider line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-orange-400" />
              <div className="h-1 w-20 bg-orange-500 rounded-full" />
              <div className="h-px w-12 bg-orange-400" />
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-10 max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                {t.hero.cta} <ChevronRight size={18} />
              </Link>
              <Link to="/services" className="btn-outline">
                {t.hero.explore}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap gap-4">
              {[
                { v: '22+', l: 'Years' },
                { v: '400+', l: 'Experts' },
                { v: '500+', l: 'Projects' },
                { v: '45+', l: 'Clients' },
              ].map((b) => (
                <div
                  key={b.l}
                  className="flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-2"
                >
                  <span className="text-orange-400 font-bold text-lg font-display">{b.v}</span>
                  <span className="text-gray-300 text-sm">{b.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 20C1200 60 720 0 0 40L0 60Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-10 sm:py-14" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard value={22} suffix="+" label={t.stats.years} started={statsVisible} />
            <StatCard value={400} suffix="+" label={t.stats.employees} started={statsVisible} />
            <StatCard value={500} suffix="+" label={t.stats.projects} started={statsVisible} />
            <StatCard value={45} suffix="+" label={t.stats.clients} started={statsVisible} />
          </div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Left – text */}
            <div>
              <div className="section-badge mb-5">{t.about.title}</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0b1d3a] mb-6 section-title leading-tight">
                {t.about.heading}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">{t.about.body1}</p>
              <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">{t.about.body2}</p>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { val: '2002',               lbl: t.about.established },
                  { val: '400+',               lbl: t.about.employees   },
                  { val: '₹13+ Cr',            lbl: t.about.turnover    },
                ].map((s) => (
                  <div key={s.lbl} className="text-center p-3 sm:p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="text-xl sm:text-2xl font-bold text-[#1a3c6e] font-display">{s.val}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.lbl}</div>
                  </div>
                ))}
              </div>

              <Link to="/about" className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors group">
                Learn More
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right – highlight cards */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <div
                  key={h.label}
                  className="royal-card p-6 text-center"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="service-icon-bg w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-orange-500">
                    {h.icon}
                  </div>
                  <div className="text-[#0b1d3a] font-semibold text-sm leading-tight">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ──────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge mb-4 mx-auto inline-flex">{t.services.title}</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0b1d3a] mb-4">
              {t.services.heading}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              End-to-end industrial engineering solutions built on 22+ years of expertise.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.list.map((s, i) => (
              <div key={s.title} className="royal-card p-6 sm:p-7 group">
                <div className="service-icon-bg w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-orange-500">
                  {serviceIconMap[i]}
                </div>
                <h3 className="font-display text-lg font-bold text-[#0b1d3a] mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="btn-primary">
              View All Services <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-badge mb-5">Why Us</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0b1d3a] mb-6 section-title">
                Trusted by Gujarat's<br />Leading Industries
              </h2>
              <div className="space-y-4">
                {[
                  { title: 'Safety-first culture', desc: 'Strict HSE protocols on every project, zero compromise.' },
                  { title: 'On-time delivery', desc: 'Committed to project schedules with transparent reporting.' },
                  { title: 'Skilled workforce', desc: '400+ trained professionals — welders, riggers, fabricators & engineers — ready to mobilise.' },
                  { title: 'End-to-end service', desc: 'From drawings to commissioning — one ISO-certified partner, full scope.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0b1d3a] mb-0.5">{item.title}</p>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/contact" className="btn-primary">
                  Get a Free Quote <ChevronRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right side — decorative info card */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 dot-pattern rounded-2xl opacity-60 pointer-events-none" />
              <div className="relative bg-gradient-to-br from-[#0b1d3a] to-[#1a3c6e] rounded-3xl p-8 sm:p-10 text-white shadow-2xl">
                <div className="absolute top-6 right-6 w-20 h-20 rounded-full border border-orange-500/20" />
                <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider mb-4">Our Specialisations</p>
                <div className="space-y-3">
                  {[
                    'All types of Pipeline Works',
                    'Heavy Structural Fabrication',
                    'Equipment & Vessel Erection',
                    'Plant & Machinery Maintenance',
                    'Commissioning Services',
                    'Engineering Drawings & Planning',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                        <ChevronRight size={12} className="text-orange-400" />
                      </div>
                      <span className="text-gray-200">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-bold text-white shrink-0">
                    LK
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.about.directorName}</p>
                    <p className="text-gray-400 text-xs">{t.about.director}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────── */}
      <section className="hero-gradient relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="section-badge mb-6 mx-auto inline-flex">Get Started Today</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Contact us today for a free consultation and quote. Our team responds within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              {t.hero.cta} <ChevronRight size={18} />
            </Link>
            <a href="tel:+919824137362" className="btn-outline">
              <Phone size={18} /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ── FLOATING CONTACT BUTTONS ──────────────────────────────── */}
      <div className="floating-cta">
        <a
          href="https://wa.me/919824137362"
          target="_blank"
          rel="noreferrer"
          className="relative w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          title="WhatsApp"
        >
          <div className="pulse-ring" />
          <MessageCircle size={24} />
        </a>
        <a
          href="tel:+919824137362"
          className="w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          title="Call Us"
        >
          <Phone size={22} />
        </a>
      </div>

    </div>
  );
}
