import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import {
  ChevronRight, Award, Users, Briefcase, ShieldCheck,
  Pipette, Building2, Settings2, Wrench, ClipboardList,
  Pencil, Phone, MessageCircle, ArrowRight, CheckCircle2,
} from 'lucide-react';

/* ── Tower Crane SVG ─────────────────────────────────────────────── */
function TowerCraneSVG({ className = '' }) {
  return (
    <svg viewBox="0 0 300 520" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* TOP CAP */}
      <circle cx="144" cy="42" r="7" fill="currentColor" opacity="0.9"/>
      <line x1="144" y1="49" x2="144" y2="102" stroke="currentColor" strokeWidth="3.5" opacity="0.9"/>

      {/* MAIN JIB HORIZONTAL BOOM */}
      <line x1="18" y1="112" x2="266" y2="112" stroke="currentColor" strokeWidth="5"/>
      <line x1="18" y1="122" x2="144" y2="122" stroke="currentColor" strokeWidth="2" opacity="0.5"/>

      {/* PENDANT CABLES from cap to jib tips */}
      <line x1="144" y1="46" x2="18" y2="112" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
      <line x1="144" y1="46" x2="266" y2="112" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>

      {/* Secondary pendant points */}
      <line x1="144" y1="70" x2="76" y2="117" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <line x1="144" y1="70" x2="210" y2="115" stroke="currentColor" strokeWidth="1" opacity="0.5"/>

      {/* MAST HEAD connector block */}
      <rect x="120" y="100" width="48" height="16" rx="2" fill="currentColor" opacity="0.9"/>

      {/* MAST — left chord */}
      <line x1="128" y1="116" x2="128" y2="450" stroke="currentColor" strokeWidth="3"/>
      {/* MAST — right chord */}
      <line x1="160" y1="116" x2="160" y2="450" stroke="currentColor" strokeWidth="3"/>

      {/* MAST LATTICE — alternating X bracing */}
      {[0,1,2,3,4,5,6,7,8,9].map((i) => (
        <g key={i}>
          {i % 2 === 0
            ? <line x1="128" y1={116 + i * 33} x2="160" y2={116 + (i + 1) * 33} stroke="currentColor" strokeWidth="1.5" opacity="0.55"/>
            : <line x1="160" y1={116 + i * 33} x2="128" y2={116 + (i + 1) * 33} stroke="currentColor" strokeWidth="1.5" opacity="0.55"/>
          }
          <line x1="128" y1={116 + (i + 1) * 33} x2="160" y2={116 + (i + 1) * 33} stroke="currentColor" strokeWidth="1" opacity="0.3"/>
        </g>
      ))}

      {/* TROLLEY on main jib */}
      <rect x="74" y="107" width="22" height="18" rx="2" fill="currentColor" opacity="0.95"/>
      <circle cx="78" cy="107" r="2.5" fill="currentColor" opacity="0.7"/>
      <circle cx="92" cy="107" r="2.5" fill="currentColor" opacity="0.7"/>

      {/* HOOK ROPE */}
      <line x1="85" y1="125" x2="85" y2="355" stroke="currentColor" strokeWidth="2" opacity="0.65"/>

      {/* HOOK BLOCK */}
      <rect x="77" y="353" width="16" height="12" rx="2" fill="currentColor" opacity="0.85"/>
      {/* HOOK curve */}
      <path d="M79 365 Q81 382 85 382 Q89 382 91 365" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.8"/>

      {/* COUNTER WEIGHT */}
      <rect x="234" y="112" width="28" height="22" rx="2" fill="currentColor" opacity="0.7"/>

      {/* BASE LEGS */}
      <line x1="128" y1="450" x2="96" y2="484" stroke="currentColor" strokeWidth="3" opacity="0.75"/>
      <line x1="160" y1="450" x2="192" y2="484" stroke="currentColor" strokeWidth="3" opacity="0.75"/>

      {/* BASE X-BRACE */}
      <line x1="96" y1="484" x2="160" y2="452" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
      <line x1="192" y1="484" x2="128" y2="452" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>

      {/* BASE PLATFORM */}
      <line x1="90" y1="484" x2="198" y2="484" stroke="currentColor" strokeWidth="4" opacity="0.65"/>
      {/* Ground lines */}
      <line x1="68" y1="490" x2="220" y2="490" stroke="currentColor" strokeWidth="2" opacity="0.35"/>
      <line x1="50" y1="496" x2="238" y2="496" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
    </svg>
  );
}

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

function StatBlock({ value, suffix, label, sublabel, started }) {
  const count = useCounter(value, 1800, started);
  return (
    <div className="text-center px-6 py-8 border-r border-white/8 last:border-r-0">
      <div
        className="text-5xl sm:text-6xl font-bold mb-1 leading-none"
        style={{ color: '#f59e0b', fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}
      >
        {count}{suffix}
      </div>
      <div className="text-white text-sm font-bold uppercase tracking-widest mt-2"
        style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}>
        {label}
      </div>
      {sublabel && <div className="text-gray-500 text-xs uppercase tracking-wider mt-0.5">{sublabel}</div>}
    </div>
  );
}

/* ── Service icon map ─────────────────────────────────────────── */
const serviceIconMap = [
  <Pipette size={28} />, <Building2 size={28} />, <Settings2 size={28} />,
  <Wrench size={28} />, <ClipboardList size={28} />, <Pencil size={28} />,
];

/* ══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const { t } = useLang();
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    document.title = 'Deepak Engineering Works | ISO 9001:2015 Certified Industrial Contractor — Ankleshwar, Gujarat';
  }, []);

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

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section className="hero-gradient relative min-h-screen flex items-center pt-32 overflow-hidden">
        {/* Blueprint grid overlay */}
        <div className="absolute inset-0 blueprint-bg pointer-events-none" />

        {/* Safety stripe top-right corner accent */}
        <div className="absolute top-0 right-0 w-64 h-64 safety-stripe pointer-events-none opacity-40" />

        {/* Yellow left edge accent */}
        <div className="absolute top-0 left-0 w-1 h-full bg-[#f59e0b]" />

        {/* TOWER CRANE SVG — right side decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%] sm:w-[38%] flex items-center justify-end pr-8 pointer-events-none"
          style={{ color: '#f59e0b', opacity: 0.18 }}>
          <TowerCraneSVG className="w-full h-auto max-h-[85vh]" />
        </div>

        {/* Faint measurement grid lines — engineering drawing feel */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px)',
            backgroundSize: '100% 60px',
          }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-2xl">

            {/* Engineering badge */}
            <div className="section-badge mb-7 animate-fade-up">
              ▪ Est. 2002 — ISO 9001:2015 Certified
            </div>

            {/* Main heading */}
            <h1
              className="font-display font-bold text-white leading-none mb-6 animate-fade-up-delay-1"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.01em' }}
            >
              DEEPAK<br />
              ENGINEERING<br />
              <span style={{ color: '#f59e0b' }}>WORKS</span>
            </h1>

            {/* Yellow engineering divider */}
            <div className="flex items-center gap-0 mb-6 animate-fade-up-delay-1">
              <div className="h-1 w-8 bg-[#f59e0b]" />
              <div className="h-0.5 w-16 bg-[#f59e0b]/50" />
              <div className="h-px w-24 bg-[#f59e0b]/25" />
            </div>

            {/* Subtitle */}
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-10 animate-fade-up-delay-2 max-w-xl">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12 animate-fade-up-delay-2">
              <Link to="/contact" className="btn-primary">
                Get a Free Quote <ChevronRight size={18} />
              </Link>
              <Link to="/services" className="btn-outline">
                Our Services
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 animate-fade-up-delay-3">
              {[
                { v: '22+', l: 'Years' },
                { v: '400+', l: 'Experts' },
                { v: '500+', l: 'Projects' },
                { v: '45+', l: 'Clients' },
              ].map((b) => (
                <div
                  key={b.l}
                  className="flex items-center gap-2 border px-4 py-2 rounded-sm backdrop-blur-sm"
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(245,158,11,0.25)' }}
                >
                  <span
                    className="font-bold text-lg"
                    style={{ color: '#f59e0b', fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}
                  >{b.v}</span>
                  <span className="text-gray-400 text-sm">{b.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom angular divider */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 48" fill="none" preserveAspectRatio="none">
            <path d="M0 48L1440 48L1440 0L0 30Z" fill="#0f172a" />
          </svg>
        </div>
      </section>

      {/* ══ STATS BAR ════════════════════════════════════════════════ */}
      <section className="bg-[#0f172a] relative" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            <StatBlock value={22} suffix="+" label="Years" sublabel="Excellence" started={statsVisible} />
            <StatBlock value={400} suffix="+" label="Workforce" sublabel="Skilled Experts" started={statsVisible} />
            <StatBlock value={500} suffix="+" label="Projects" sublabel="Completed" started={statsVisible} />
            <StatBlock value={45} suffix="+" label="Clients" sublabel="Blue-Chip" started={statsVisible} />
          </div>
        </div>
        {/* yellow bottom line */}
        <div className="h-0.5 bg-[#f59e0b]/30" />
      </section>

      {/* ══ ABOUT SNIPPET ════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Left text */}
            <div>
              <div className="section-badge mb-5">{t.about.title}</div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#060d1b] mb-6 section-title leading-tight">
                {t.about.heading}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">{t.about.body1}</p>
              <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">{t.about.body2}</p>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { val: '2002', lbl: t.about.established },
                  { val: '400+', lbl: t.about.employees   },
                  { val: '₹13+ Cr', lbl: t.about.turnover },
                ].map((s) => (
                  <div key={s.lbl} className="text-center p-4 bg-gray-50 border border-gray-100 rounded-sm"
                    style={{ borderTop: '3px solid #f59e0b' }}>
                    <div
                      className="text-2xl sm:text-3xl font-bold text-[#060d1b] font-display"
                      style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}
                    >{s.val}</div>
                    <div className="text-xs text-gray-500 mt-0.5 uppercase tracking-wider">{s.lbl}</div>
                  </div>
                ))}
              </div>

              <Link to="/about" className="inline-flex items-center gap-2 font-bold hover:gap-3 transition-all group"
                style={{ color: '#f59e0b', fontFamily: "'Barlow Condensed', system-ui, sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                Learn More <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right highlight cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Award size={24} />, label: 'ISO 9001:2015 Certified' },
                { icon: <Users size={24} />, label: '400+ Skilled Workforce' },
                { icon: <Briefcase size={24} />, label: '22+ Years Experience' },
                { icon: <ShieldCheck size={24} />, label: 'Zero Accident Record' },
              ].map((h, i) => (
                <div key={h.label} className="royal-card p-6 text-center" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="service-icon-bg w-12 h-12 rounded flex items-center justify-center mx-auto mb-4 text-[#f59e0b]">
                    {h.icon}
                  </div>
                  <div className="text-[#060d1b] font-bold text-sm leading-tight uppercase tracking-wide"
                    style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}>
                    {h.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES PREVIEW ════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] relative overflow-hidden">
        {/* Faint safety stripe decoration top-right */}
        <div className="absolute top-0 right-0 w-40 h-40 safety-stripe opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="section-badge mb-4 mx-auto inline-flex">{t.services.title}</div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#060d1b] mb-4">
              {t.services.heading}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              End-to-end industrial engineering solutions built on 22+ years of expertise in Gujarat's chemical & petrochemical heartland.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.services.list.map((s, i) => (
              <div key={s.title} className="royal-card p-6 sm:p-7 group">
                <div className="service-icon-bg w-14 h-14 rounded flex items-center justify-center mb-5 text-[#f59e0b]">
                  {serviceIconMap[i]}
                </div>
                <h3 className="font-display text-xl font-bold text-[#060d1b] mb-3 uppercase">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center gap-1 text-[#f59e0b] text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}>
                  Learn more <ArrowRight size={12} />
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

      {/* ══ WHY CHOOSE US ════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-[#060d1b] relative overflow-hidden">
        {/* Blueprint grid */}
        <div className="absolute inset-0 blueprint-bg pointer-events-none opacity-60" />
        {/* Yellow left accent */}
        <div className="absolute top-0 left-0 w-1 h-full bg-[#f59e0b]/40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left checklist */}
            <div>
              <div className="section-badge mb-5">Why Choose Us</div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-8 section-title">
                Trusted by Gujarat's<br />Leading Industries
              </h2>
              <div className="space-y-5">
                {[
                  { title: 'Safety-First Culture', desc: 'Strict HSE protocols on every project — toolbox talks, PTW systems, zero-compromise PPE compliance.' },
                  { title: 'On-Time Delivery', desc: 'Committed to project schedules with transparent milestone reporting and proactive risk management.' },
                  { title: '400+ Skilled Workforce', desc: 'Trained welders, riggers, fabricators & engineers ready to mobilise at short notice across GIDC facilities.' },
                  { title: 'End-to-End Capability', desc: 'From engineering drawings to commissioning — one ISO-certified partner for the full project scope.' },
                  { title: 'Heavy Lift Up to 400T', desc: 'Proprietary crane fleet including DEMAG AC 1200 (400T) for the most complex erection operations.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-sm flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}>
                      <CheckCircle2 size={14} style={{ color: '#f59e0b' }} />
                    </div>
                    <div>
                      <p className="font-bold text-white mb-0.5 text-sm uppercase tracking-wide"
                        style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif", letterSpacing: '0.08em' }}>
                        {item.title}
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
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

            {/* Right — specs panel */}
            <div className="relative">
              {/* Crane wireframe in background of panel */}
              <div className="absolute -right-4 -top-4 -bottom-4 w-40 pointer-events-none flex items-center"
                style={{ color: '#f59e0b', opacity: 0.07 }}>
                <TowerCraneSVG className="w-full h-auto" />
              </div>

              <div className="relative border rounded-sm p-8 sm:p-10 text-white"
                style={{
                  background: 'linear-gradient(135deg, #0b1d3a 0%, #1a3c6e 100%)',
                  borderColor: 'rgba(245,158,11,0.2)',
                }}>
                {/* Yellow top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#f59e0b]" />

                <p className="text-xs font-bold uppercase tracking-widest mb-6"
                  style={{ color: '#f59e0b', fontFamily: "'Barlow Condensed', system-ui, sans-serif", letterSpacing: '0.18em' }}>
                  Our Core Specialisations
                </p>
                <div className="space-y-3">
                  {[
                    'All Types of Pipeline Works',
                    'Heavy Structural Fabrication',
                    'Equipment & Vessel Erection',
                    'Plant & Machinery Maintenance',
                    'Commissioning Services',
                    'Engineering Drawings & Planning',
                    'Heavy Crane Operations (up to 400T)',
                    'Scaffolding & Civil Works',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm">
                      <div className="w-1.5 h-1.5 shrink-0 rounded-none"
                        style={{ background: '#f59e0b' }} />
                      <span className="text-gray-200">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t flex items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center font-bold text-[#060d1b] shrink-0 text-sm"
                    style={{ background: '#f59e0b', fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}>
                    LK
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">{t.about.directorName}</p>
                    <p className="text-gray-400 text-xs">{t.about.director}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20 overflow-hidden bg-[#0f172a]">
        <div className="absolute inset-0 safety-stripe opacity-40 pointer-events-none" />
        <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
        {/* Yellow borders */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#f59e0b]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#f59e0b]/30" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="section-badge mb-6 mx-auto inline-flex">Get Started Today</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm sm:text-base">
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
          className="w-14 h-14 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          style={{ background: '#f59e0b' }}
          title="Call Us"
        >
          <Phone size={22} />
        </a>
      </div>

    </div>
  );
}
