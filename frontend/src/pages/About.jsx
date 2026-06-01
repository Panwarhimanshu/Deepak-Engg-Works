import { useEffect } from 'react';
import { useLang } from '../contexts/LangContext';
import { MapPin, Phone, Mail, Calendar, Users, TrendingUp, ShieldCheck, Quote } from 'lucide-react';

const milestones = [
  { year: '2002', event: 'Deepak Engineering Works founded by Lovekush Gayaprasad (L.K.) Singh in Ankleshwar GIDC, Gujarat — serving the region\'s growing chemical & petrochemical sector.' },
  { year: '2008', event: 'Secured first major equipment erection and structural fabrication contracts with leading GIDC companies.' },
  { year: '2012', event: 'Expanded dedicated works facility; team grows to 50+ skilled welders, riggers and fabricators.' },
  { year: '2015', event: 'Completed 200+ successful industrial projects; added heavy crane fleet for large-scale lifts.' },
  { year: '2017', event: 'GST registered — accelerating formal business growth. Annual contracts with 10+ blue-chip clients.' },
  { year: '2020', event: 'Annual turnover reaches ₹13.72 Cr; DEMAG AC 1200 (400T) added, enabling mega lift operations.' },
  { year: '2022', event: 'Achieved ISO 9001:2015 certification. Workforce expands to 400+ across engineers, welders, riggers & fabricators.' },
  { year: '2024', event: '26 active client relationships with India\'s leading chemical companies; 7 heavy cranes up to 400T capacity.' },
];

export default function About() {
  const { t } = useLang();

  useEffect(() => {
    document.title = 'About Us | Deepak Engineering Works — ISO 9001:2015 Certified, Ankleshwar Gujarat';
  }, []);

  return (
    <div className="pt-20 overflow-x-hidden">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="hero-gradient relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 blueprint-bg pointer-events-none" />
        <div className="absolute top-0 left-0 w-1 h-full bg-[#d97706]/60" />
        <div className="absolute inset-0 safety-stripe opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="section-badge mb-5">{t.about.title}</div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-gray-900 mb-4 leading-none uppercase">
            {t.about.heading}
          </h1>
          <div className="flex items-center gap-0 mb-5">
            <div className="h-1 w-8 bg-[#d97706]" />
            <div className="h-0.5 w-16 bg-[#d97706]/40" />
          </div>
          <p className="text-gray-600 max-w-2xl text-sm sm:text-base leading-relaxed">{t.about.body1}</p>
        </div>
      </section>

      {/* ── STORY ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
            <div>
              <div className="section-badge mb-5">Our Story</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0b1d3a] mb-6 section-title leading-tight">
                Engineering Trust Since 2002
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">{t.about.body1}</p>
              <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">{t.about.body2}</p>

              {/* Director card */}
              {/* ISO badge */}
              <div className="flex items-center gap-3 mb-5 p-4 border rounded-sm"
                style={{ background: 'rgba(217,119,6,0.06)', borderColor: 'rgba(217,119,6,0.25)' }}>
                <div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-sm"
                  style={{ background: '#d97706' }}>
                  <ShieldCheck size={20} className="text-[#060d1b]" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wide"
                    style={{ color: '#d97706', fontFamily: "'Barlow Condensed', system-ui, sans-serif", letterSpacing: '0.1em' }}>
                    ISO 9001:2015 Certified
                  </p>
                  <p className="text-gray-500 text-xs">Quality Management System — International Standard</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border shadow-lg" style={{ borderColor: 'rgba(217,119,6,0.25)' }}>
                {/* Photo + name header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-0"
                  style={{ background: 'linear-gradient(135deg, #92400e, #78350f)' }}>
                  <img
                    src="/md.jpeg"
                    alt="Managing Director"
                    className="w-full sm:w-48 h-56 sm:h-60 object-cover shrink-0"
                    style={{ objectPosition: 'center 10%' }}
                  />
                  <div className="p-6 pb-5 text-left w-full">
                    <div className="text-orange-300 text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif" }}>
                      {t.about.director}
                    </div>
                    <div className="font-bold text-white leading-tight mb-1"
                      style={{ fontFamily: "'Barlow Condensed',system-ui,sans-serif", fontSize: '1.5rem' }}>
                      {t.about.directorName}
                    </div>
                    <div className="text-orange-200/70 text-xs">Founder · Est. 2002 · Ankleshwar GIDC</div>
                  </div>
                </div>
                {/* Quote */}
                <div className="p-5" style={{ background: '#fafaf8' }}>
                  <Quote size={20} className="text-[#d97706] mb-2 opacity-70" />
                  <p className="text-gray-600 text-sm leading-relaxed italic">
                    "Our commitment is to deliver engineering excellence with safety, precision, and reliability on every project we undertake."
                  </p>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Calendar size={22} />, label: t.about.established, value: '2002', color: '#d97706' },
                { icon: <Users size={22} />,    label: t.about.employees,   value: '400+', color: '#f97316' },
                { icon: <TrendingUp size={22} />,label: t.about.turnover,   value: '₹13+ Cr', color: '#16a34a' },
                { icon: <ShieldCheck size={22} />,label: 'ISO 9001:2015',   value: 'Certified',   color: '#7c3aed' },
              ].map((item) => (
                <div key={item.label} className="royal-card p-5 sm:p-6 text-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: `${item.color}18`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-[#0b1d3a] mb-1 break-words">{item.value}</div>
                  <div className="text-gray-500 text-xs">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-badge mb-4 mx-auto inline-flex">Milestones</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0b1d3a]">
              Our Journey
            </h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-7 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 via-orange-300 to-transparent" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-6 sm:gap-8 items-start">
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/25 relative z-10">
                      {m.year}
                    </div>
                  </div>
                  <div className="royal-card p-4 sm:p-5 flex-1 mt-2">
                    <p className="text-gray-700 text-sm leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge mb-4 mx-auto inline-flex">Find Us</div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0b1d3a]">Our Locations</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: <MapPin size={20} />,
                label: t.contact.address,
                content: 'S-18, James Plaza Square, Asian Paint Chowkdi, Station Road, G.I.D.C., Ankleshwar – 393 002, Dist. Bharuch, Gujarat',
                bg: '#1a3c6e',
              },
              {
                icon: <MapPin size={20} />,
                label: t.contact.works,
                content: 'Plot No. 501/H, Ramdevpir Chowkdi, Opp. Water Treatment Plant, Station Road, GIDC, Ankleshwar – 393 002, Dist. Bharuch',
                bg: '#f97316',
              },
              {
                icon: <Phone size={20} />,
                label: 'Phone',
                lines: [
                  { text: '+91 98241 37362', href: 'tel:+919824137362' },
                  { text: '+91 84016 08487', href: 'tel:+918401608487' },
                ],
                bg: '#16a34a',
              },
              {
                icon: <Mail size={20} />,
                label: 'Email',
                lines: [
                  { text: 'deepak.enggwork@yahoo.com', href: 'mailto:deepak.enggwork@yahoo.com' },
                  { text: 'deepakengg@gmail.com',      href: 'mailto:deepakengg@gmail.com' },
                ],
                bg: '#7c3aed',
              },
            ].map((item) => (
              <div key={item.label} className="royal-card p-6 flex gap-4 items-start">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white"
                  style={{ background: item.bg }}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#0b1d3a] text-sm mb-2">{item.label}</p>
                  {item.content ? (
                    <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
                  ) : (
                    <div className="space-y-1">
                      {item.lines.map((l) => (
                        <a key={l.text} href={l.href} className="block text-gray-600 text-sm hover:text-orange-500 transition-colors break-all">
                          {l.text}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
