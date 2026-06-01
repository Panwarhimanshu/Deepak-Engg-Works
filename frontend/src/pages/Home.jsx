import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import {
  ChevronRight, ShieldCheck, Pipette, Building2, Settings2,
  Wrench, ClipboardList, Pencil, Phone, MessageCircle, ArrowRight,
  CheckCircle2, Zap, Clock, Star,
} from 'lucide-react';

/* ── Tower Crane SVG ─────────────────────────────────────────── */
function TowerCraneSVG({ className = '' }) {
  return (
    <svg viewBox="0 0 300 520" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="144" cy="42" r="7" fill="currentColor" opacity="0.9"/>
      <line x1="144" y1="49" x2="144" y2="102" stroke="currentColor" strokeWidth="3.5" opacity="0.9"/>
      <line x1="18" y1="112" x2="266" y2="112" stroke="currentColor" strokeWidth="5"/>
      <line x1="18" y1="122" x2="144" y2="122" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <line x1="144" y1="46" x2="18" y2="112" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
      <line x1="144" y1="46" x2="266" y2="112" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
      <line x1="144" y1="70" x2="76" y2="117" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <line x1="144" y1="70" x2="210" y2="115" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <rect x="120" y="100" width="48" height="16" rx="2" fill="currentColor" opacity="0.9"/>
      <line x1="128" y1="116" x2="128" y2="450" stroke="currentColor" strokeWidth="3"/>
      <line x1="160" y1="116" x2="160" y2="450" stroke="currentColor" strokeWidth="3"/>
      {[0,1,2,3,4,5,6,7,8,9].map((i) => (
        <g key={i}>
          {i % 2 === 0
            ? <line x1="128" y1={116+i*33} x2="160" y2={116+(i+1)*33} stroke="currentColor" strokeWidth="1.5" opacity="0.55"/>
            : <line x1="160" y1={116+i*33} x2="128" y2={116+(i+1)*33} stroke="currentColor" strokeWidth="1.5" opacity="0.55"/>}
          <line x1="128" y1={116+(i+1)*33} x2="160" y2={116+(i+1)*33} stroke="currentColor" strokeWidth="1" opacity="0.3"/>
        </g>
      ))}
      <rect x="74" y="107" width="22" height="18" rx="2" fill="currentColor" opacity="0.95"/>
      <circle cx="78" cy="107" r="2.5" fill="currentColor" opacity="0.7"/>
      <circle cx="92" cy="107" r="2.5" fill="currentColor" opacity="0.7"/>
      <line x1="85" y1="125" x2="85" y2="355" stroke="currentColor" strokeWidth="2" opacity="0.65"/>
      <rect x="77" y="353" width="16" height="12" rx="2" fill="currentColor" opacity="0.85"/>
      <path d="M79 365 Q81 382 85 382 Q89 382 91 365" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.8"/>
      <rect x="234" y="112" width="28" height="22" rx="2" fill="currentColor" opacity="0.7"/>
      <line x1="128" y1="450" x2="96" y2="484" stroke="currentColor" strokeWidth="3" opacity="0.75"/>
      <line x1="160" y1="450" x2="192" y2="484" stroke="currentColor" strokeWidth="3" opacity="0.75"/>
      <line x1="96" y1="484" x2="160" y2="452" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
      <line x1="192" y1="484" x2="128" y2="452" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
      <line x1="90" y1="484" x2="198" y2="484" stroke="currentColor" strokeWidth="4" opacity="0.65"/>
      <line x1="68" y1="490" x2="220" y2="490" stroke="currentColor" strokeWidth="2" opacity="0.35"/>
      <line x1="50" y1="496" x2="238" y2="496" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
    </svg>
  );
}

/* ── Animated counter ────────────────────────────────────────── */
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatItem({ value, suffix, label, sub, started }) {
  const count = useCounter(value, 2000, started);
  return (
    <div className="text-center py-6 px-4">
      <div className="font-bold text-gray-900 leading-none"
        style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif", fontSize: '2.6rem' }}>
        {count}{suffix}
      </div>
      <div className="text-[#d97706] text-xs font-bold uppercase tracking-widest mt-1.5"
        style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif" }}>
        {label}
      </div>
      <div className="text-gray-500 text-xs mt-0.5">{sub}</div>
    </div>
  );
}

/* ── Service icon map ─────────────────────────────────────────── */
const serviceIcons = [
  <Pipette size={26}/>, <Building2 size={26}/>, <Settings2 size={26}/>,
  <Wrench size={26}/>,  <ClipboardList size={26}/>, <Pencil size={26}/>,
];

/* ── Client marquee data ─────────────────────────────────────── */
const marqueeClients = [
  'Aarti Industries Ltd','Gujarat Fluorochemicals','PI Industries Ltd',
  'SRF India Limited','Navin Fluorine','Neogen Chemicals','Gharda Chemical',
  'Cheminova India','Cohizon Life Science','GFCL EV Products',
  'Birla Century Textiles','Atul Ltd','UPL Ltd','Jubilant Life Sciences',
  'Huntsman Corporation','Lanxess India','Birla Advanced Knits',
];

/* ══════════════════════════════════════════════════════════════ */
export default function Home() {
  const { t } = useLang();
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    document.title = 'Deepak Engineering Works | ISO 9001:2015 Certified Industrial Contractor — Ankleshwar, Gujarat';
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="overflow-x-hidden">

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="hero-gradient relative min-h-screen flex flex-col justify-center pt-20 pb-32 overflow-hidden">

        {/* Blueprint grid */}
        <div className="absolute inset-0 blueprint-bg pointer-events-none" />

        {/* Left edge accent */}
        <div className="absolute top-0 left-0 w-1 h-full bg-[#d97706]" />

        {/* Radial glow behind crane */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[90%] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(217,119,6,0.08) 0%, transparent 70%)' }} />

        {/* Crane SVG */}
        <div className="absolute right-0 top-0 bottom-0 w-[44%] sm:w-[36%] flex items-center justify-end pr-6 pointer-events-none"
          style={{ color: '#d97706', opacity: 0.22, filter: 'drop-shadow(0 0 18px rgba(217,119,6,0.5))' }}>
          <TowerCraneSVG className="w-full h-auto max-h-[88vh]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

          {/* Top meta line */}
          <div className="flex items-center gap-3 mb-6">
            <span className="section-badge">Est. 2002</span>
            <span className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(217,119,6,0.3)' }} />
            <span className="text-gray-500 text-xs uppercase tracking-widest font-bold"
              style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif" }}>
              ISO 9001:2015 · Ankleshwar GIDC
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-display font-bold text-gray-900 leading-none mb-6 animate-fade-up"
            style={{ fontSize: 'clamp(3.2rem, 9vw, 6.5rem)', letterSpacing: '-0.02em' }}>
            DEEPAK<br/>
            ENGINEERING<br/>
            <span style={{ color: '#d97706', WebkitTextStroke: '1px rgba(217,119,6,0.3)' }}>WORKS</span>
          </h1>

          {/* Animated divider */}
          <div className="flex items-center gap-1 mb-6">
            <div className="h-1 w-12 bg-[#d97706]" />
            <div className="h-0.5 w-20 bg-[#d97706]/40" />
            <div className="h-px w-32 bg-[#d97706]/15" />
          </div>

          {/* Subtitle */}
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg mb-10 animate-fade-up-delay-1">
            Gujarat's leading industrial contractor for pipeline works, structural
            fabrication, equipment erection &amp; heavy crane operations across
            GIDC facilities since 2002.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12 animate-fade-up-delay-2">
            <Link to="/contact" className="btn-primary">
              Get a Free Quote <ChevronRight size={18}/>
            </Link>
            <Link to="/services" className="btn-outline">
              Our Services
            </Link>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-2 animate-fade-up-delay-3">
            {[
              { icon: <ShieldCheck size={13}/>, text: 'ISO 9001:2015' },
              { icon: <Star size={13}/>,        text: '45+ Blue-Chip Clients' },
              { icon: <Zap size={13}/>,          text: '400T Crane Capacity' },
              { icon: <Clock size={13}/>,        text: '22+ Years' },
            ].map((b) => (
              <div key={b.text}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full text-[#d97706] border"
                style={{ background: 'rgba(217,119,6,0.06)', borderColor: 'rgba(217,119,6,0.2)' }}>
                {b.icon} {b.text}
              </div>
            ))}
          </div>
        </div>

        {/* ── Overlapping stats panel ───────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-10 px-4 sm:px-6 lg:px-8" ref={statsRef}>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-sm shadow-2xl border"
              style={{ background: '#ffffff', borderColor: 'rgba(217,119,6,0.25)' }}>
              {[
                { v: 22, s: '+', l: 'Years', sub: 'of Excellence' },
                { v: 400, s: '+', l: 'Workforce', sub: 'Skilled Experts' },
                { v: 500, s: '+', l: 'Projects', sub: 'Completed' },
                { v: 45, s: '+', l: 'Clients', sub: 'Blue-Chip' },
              ].map((stat, i) => (
                <div key={stat.l}
                  className={`${i < 3 ? 'border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''}`}
                  style={{ borderColor: 'rgba(217,119,6,0.15)' }}>
                  <StatItem value={stat.v} suffix={stat.s} label={stat.l} sub={stat.sub} started={statsVisible}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CLIENT MARQUEE ════════════════════════════════════════ */}
      <section className="overflow-hidden" style={{ background: '#fafafa', paddingTop: '72px', paddingBottom: '20px', borderBottom: '1px solid rgba(217,119,6,0.15)' }}>
        <div className="max-w-7xl mx-auto px-4 mb-4">
          <p className="text-gray-600 text-xs uppercase tracking-widest font-bold"
            style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif" }}>
            Trusted By India's Leading Chemical & Industrial Companies
          </p>
        </div>
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee flex items-center">
            {[...marqueeClients, ...marqueeClients].map((name, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-8 text-sm font-bold uppercase tracking-widest whitespace-nowrap text-gray-500 hover:text-[#d97706] transition-colors cursor-default"
                style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif" }}>
                <span className="w-1.5 h-1.5 shrink-0 bg-[#d97706]" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 safety-stripe opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <div className="section-badge mb-4">{t.services.title}</div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#020c1b] leading-none">
                WHAT WE DO
              </h2>
            </div>
            <Link to="/services"
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#d97706] hover:gap-3 transition-all shrink-0"
              style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif" }}>
              View All Services <ArrowRight size={15}/>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.services.list.map((s, i) => (
              <div key={s.title} className="royal-card p-7 group relative overflow-hidden cursor-default">
                {/* Background number */}
                <div className="absolute -top-2 -right-1 leading-none select-none pointer-events-none font-bold"
                  style={{
                    fontFamily: "'Barlow Condensed',system-ui,sans-serif",
                    fontSize: '7rem', lineHeight: 1,
                    color: 'rgba(217,119,6,0.06)',
                  }}>
                  {String(i+1).padStart(2,'0')}
                </div>

                {/* Small number */}
                <div className="text-[#d97706] text-xs font-bold tracking-widest mb-4"
                  style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif" }}>
                  {String(i+1).padStart(2,'0')}
                </div>

                <div className="service-icon-bg w-12 h-12 rounded flex items-center justify-center mb-5 text-[#d97706]">
                  {serviceIcons[i]}
                </div>

                <h3 className="font-display text-xl font-bold text-[#020c1b] mb-3 uppercase leading-tight">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>

                {/* Bottom slide-in bar on hover */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-[#d97706] w-0 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT / COMPANY ═══════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="absolute inset-0 blueprint-bg pointer-events-none opacity-40" />
        <div className="absolute top-0 left-0 w-1 h-full bg-[#d97706]/60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <div>
              <div className="section-badge mb-5">About Us</div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-none section-title">
                ENGINEERING<br/>TRUST SINCE 2002
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">{t.about.body1}</p>
              <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">{t.about.body2}</p>

              {/* Director */}
              <div className="flex items-start gap-5 mb-8 p-5 border rounded-sm shadow-sm"
                style={{ background: '#fafaf8', borderColor: 'rgba(217,119,6,0.22)' }}>
                <img
                  src="/md.jpeg"
                  alt="Managing Director"
                  className="w-28 h-36 rounded object-cover object-top shrink-0 border-2 shadow-md"
                  style={{ borderColor: 'rgba(217,119,6,0.4)', objectPosition: 'center 10%' }}
                />
                <div className="flex flex-col justify-between" style={{ minHeight: '9rem' }}>
                  <div>
                    <p className="text-[#d97706] text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif" }}>
                      {t.about.director}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed italic">
                      "Our commitment is to deliver engineering excellence with safety, precision and reliability on every project."
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="text-gray-900 font-bold text-base"
                      style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif" }}>
                      {t.about.directorName}
                    </p>
                    <p className="text-gray-400 text-xs">Founder · Deepak Engineering Works · Est. 2002</p>
                  </div>
                </div>
              </div>

              {/* Horizontal stats row */}
              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-sm"
                style={{ background: 'rgba(217,119,6,0.1)' }}>
                {[
                  { v: '2002', l: 'Founded' },
                  { v: '400+', l: 'Workforce' },
                  { v: '₹13 Cr+', l: 'Turnover' },
                ].map((s) => (
                  <div key={s.l} className="text-center py-5"
                    style={{ background: '#ffffff' }}>
                    <div className="font-bold text-gray-900 text-2xl"
                      style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif" }}>
                      {s.v}
                    </div>
                    <div className="text-gray-600 text-xs uppercase tracking-wider mt-1">{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/about" className="btn-primary">
                  Our Story <ArrowRight size={16}/>
                </Link>
              </div>
            </div>

            {/* Right — spec sheet card */}
            <div className="border rounded-sm overflow-hidden shadow-lg"
              style={{ borderColor: 'rgba(217,119,6,0.25)', background: '#ffffff' }}>
              {/* Card header */}
              <div className="px-6 py-4 border-b flex items-center justify-between"
                style={{ borderColor: 'rgba(217,119,6,0.15)', background: '#fafafa' }}>
                <span className="text-gray-900 font-bold text-sm uppercase tracking-widest"
                  style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif" }}>
                  Company At A Glance
                </span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#d97706]" />
                  <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(217,119,6,0.3)' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(217,119,6,0.15)' }} />
                </div>
              </div>
              {/* Spec rows */}
              {[
                { k: 'Established', v: '2002, Ankleshwar GIDC' },
                { k: 'Certification', v: 'ISO 9001:2015 QMS' },
                { k: 'Workforce', v: '400+ Skilled Professionals' },
                { k: 'Max Lift Capacity', v: 'Up to 400 Tonnes (DEMAG AC 1200)' },
                { k: 'Crane Fleet', v: '7 Heavy Cranes (25T – 400T)' },
                { k: 'Work Area', v: 'Gujarat GIDC & Pan-India' },
                { k: 'GSTIN', v: '24BBJPS3473G1ZG' },
                { k: 'Contact', v: '+91 98241 37362' },
              ].map((row, i) => (
                <div key={row.k}
                  className={`flex items-start gap-4 px-6 py-3.5 ${i % 2 === 0 ? '' : ''}`}
                  style={{ borderBottom: i < 7 ? '1px solid rgba(217,119,6,0.08)' : 'none' }}>
                  <span className="text-gray-600 text-xs uppercase tracking-wider shrink-0 w-36"
                    style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif", letterSpacing: '0.1em' }}>
                    {row.k}
                  </span>
                  <span className="text-gray-800 text-sm font-medium">{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ HOW WE WORK — PROCESS STEPS ══════════════════════════ */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-40 h-40 safety-stripe opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-badge mb-4 mx-auto inline-flex">Our Process</div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#020c1b]">HOW WE WORK</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px hidden lg:block"
              style={{ background: 'linear-gradient(90deg, rgba(217,119,6,0.2), rgba(217,119,6,0.6), rgba(217,119,6,0.2))' }} />

            {[
              { n: '01', icon: <ClipboardList size={22}/>, title: 'Site Assessment', desc: 'Survey facility, assess risks, define detailed scope with client safety requirements.' },
              { n: '02', icon: <Pencil size={22}/>,        title: 'Engineering & Planning', desc: 'Drawings, resource planning, PTW documentation & procurement before mobilisation.' },
              { n: '03', icon: <ShieldCheck size={22}/>,   title: 'Safe Execution', desc: 'Daily toolbox talks, PTW compliance and HSE monitoring throughout the project.' },
              { n: '04', icon: <CheckCircle2 size={22}/>,  title: 'QC & Handover', desc: 'Hydro testing, NDT checks, inspection and complete documentation — on time, zero defects.' },
            ].map((step) => (
              <div key={step.n} className="flex flex-col items-center text-center group">
                {/* Circle with number */}
                <div className="relative w-20 h-20 mb-6">
                  <div className="w-full h-full rounded-full border-2 border-[#d97706]/30 bg-white flex items-center justify-center group-hover:border-[#d97706] group-hover:shadow-lg transition-all duration-300"
                    style={{ boxShadow: '0 0 0 0 rgba(217,119,6,0)' }}>
                    <div className="w-14 h-14 rounded-full bg-[#d97706]/8 border border-[#d97706]/20 flex items-center justify-center text-[#d97706] group-hover:bg-[#d97706] group-hover:text-white transition-all duration-300">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-[#d97706] flex items-center justify-center text-[#d97706] text-xs font-bold shadow-sm"
                    style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif" }}>
                    {step.n}
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-[#020c1b] uppercase mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ═════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#fafaf8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left checklist */}
            <div>
              <div className="section-badge mb-5">Why Choose Us</div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#020c1b] mb-10 leading-none section-title">
                THE DEEPAK<br/>DIFFERENCE
              </h2>
              <div className="space-y-5">
                {[
                  { title: 'Safety-First Culture',      desc: 'Strict HSE protocols — toolbox talks, PTW systems, zero-compromise PPE compliance on every project.' },
                  { title: 'On-Time Delivery',           desc: 'Committed to schedules with transparent milestone reporting and proactive risk management.' },
                  { title: '400+ Skilled Workforce',     desc: 'Trained welders, riggers, fabricators & engineers ready to mobilise at short notice across GIDC.' },
                  { title: 'End-to-End Capability',      desc: 'From engineering drawings to commissioning — one ISO-certified partner for the full scope.' },
                  { title: 'Heavy Lift up to 400T',      desc: 'DEMAG AC 1200 (400T) and 6 other cranes for the most complex erection operations.' },
                ].map((item, i) => (
                  <div key={item.title} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-none flex items-center justify-center shrink-0 mt-0.5 border transition-all group-hover:bg-[#d97706] group-hover:border-[#d97706]"
                      style={{ background: 'rgba(217,119,6,0.08)', borderColor: 'rgba(217,119,6,0.25)' }}>
                      <CheckCircle2 size={15} className="text-[#d97706] group-hover:text-white transition-colors"/>
                    </div>
                    <div>
                      <p className="font-bold text-[#020c1b] mb-0.5 text-sm uppercase tracking-wide"
                        style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif", letterSpacing: '0.08em' }}>
                        {item.title}
                      </p>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — key capabilities grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: '400T', l: 'Max Lift Capacity', icon: <Zap size={20}/> },
                { v: '7',    l: 'Heavy Cranes', icon: <Building2 size={20}/> },
                { v: '400+', l: 'Skilled Workforce', icon: <ShieldCheck size={20}/> },
                { v: '22+',  l: 'Years of Experience', icon: <Star size={20}/> },
              ].map((cap) => (
                <div key={cap.l} className="royal-card p-6 text-center group">
                  <div className="service-icon-bg w-12 h-12 rounded flex items-center justify-center mx-auto mb-4 text-[#d97706]">
                    {cap.icon}
                  </div>
                  <div className="font-bold text-[#020c1b] text-3xl mb-1"
                    style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif" }}>
                    {cap.v}
                  </div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider font-semibold">{cap.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#111111' }}>
        <div className="absolute inset-0 blueprint-bg pointer-events-none opacity-60" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#d97706]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <div className="section-badge mb-5 inline-flex">Start Your Project</div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-none">
                READY TO BUILD<br/>
                <span className="text-[#d97706]">SOMETHING GREAT?</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
                Contact Gujarat's most trusted industrial engineering contractor.
                Free site assessment & quote within 24 hours.
              </p>
            </div>

            {/* Right — contact card */}
            <div className="border rounded-sm p-8"
              style={{ background: '#1a1a1a', borderColor: 'rgba(217,119,6,0.25)' }}>
              <div className="space-y-4 mb-8">
                {[
                  { label: 'Call Us', value: '+91 98241 37362', href: 'tel:+919824137362' },
                  { label: 'Email',   value: 'deepak.enggwork@yahoo.com', href: 'mailto:deepak.enggwork@yahoo.com' },
                  { label: 'Office',  value: 'GIDC, Ankleshwar, Gujarat — 393 002', href: null },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                    style={{ borderColor: 'rgba(217,119,6,0.1)' }}>
                    <span className="text-gray-600 text-xs uppercase tracking-widest w-14 pt-0.5 shrink-0"
                      style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif" }}>
                      {c.label}
                    </span>
                    {c.href
                      ? <a href={c.href} className="text-white text-sm font-semibold hover:text-[#d97706] transition-colors">{c.value}</a>
                      : <span className="text-gray-300 text-sm">{c.value}</span>}
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link to="/contact" className="btn-primary flex-1 justify-center">
                  Get a Quote <ChevronRight size={16}/>
                </Link>
                <a href="tel:+919824137362"
                  className="flex items-center gap-2 px-4 py-3 rounded border text-[#d97706] font-bold text-sm uppercase tracking-wide transition-all hover:bg-[#d97706]/10"
                  style={{ borderColor: 'rgba(217,119,6,0.3)', fontFamily: "'Barlow Condensed',system-ui,sans-serif" }}>
                  <Phone size={15}/> Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FLOATING BUTTONS ────────────────────────────────────── */}
      <div className="floating-cta">
        <a href="https://wa.me/919824137362" target="_blank" rel="noreferrer"
          className="relative w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          title="WhatsApp">
          <div className="pulse-ring" />
          <MessageCircle size={24}/>
        </a>
        <a href="tel:+919824137362"
          className="w-14 h-14 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}
          title="Call Us">
          <Phone size={22}/>
        </a>
      </div>

    </div>
  );
}
