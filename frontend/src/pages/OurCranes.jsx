import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { imageSrc } from '../utils/imageUrl';
import { ChevronRight, Phone, MessageCircle, Weight, Ruler, MoveHorizontal } from 'lucide-react';

const CATEGORIES = ['All', 'Telescopic Boom', 'Lattice Boom', 'Crawler', 'Pick & Carry'];

const categoryColors = {
  'Telescopic Boom': { bg: 'bg-blue-100',   text: 'text-blue-700'   },
  'Lattice Boom':    { bg: 'bg-purple-100', text: 'text-purple-700' },
  'Crawler':         { bg: 'bg-green-100',  text: 'text-green-700'  },
  'Pick & Carry':    { bg: 'bg-orange-100', text: 'text-orange-700' },
};

export default function OurCranes() {
  const [cranes,   setCranes]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [active,   setActive]   = useState('All');

  useEffect(() => {
    document.title = 'Our Cranes | Heavy Lift Fleet up to 400T — Deepak Engineering Works, Ankleshwar';
  }, []);

  useEffect(() => {
    api.get('/cranes')
      .then((res) => setCranes(Array.isArray(res.data) ? res.data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = active === 'All' ? cranes : cranes.filter((c) => c.category === active);

  const counts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === 'All' ? cranes.length : cranes.filter((c) => c.category === cat).length;
    return acc;
  }, {});

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero-gradient relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 blueprint-bg pointer-events-none" />
        <div className="absolute top-0 left-0 w-1 h-full bg-[#d97706]/60" />
        <div className="absolute inset-0 safety-stripe opacity-15 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-badge mb-5 mx-auto inline-flex">Heavy Lift Equipment</div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-5">
            Our Cranes
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A fleet of high-capacity cranes available for heavy lifting, erection, and industrial projects across Gujarat.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="bg-white/80 backdrop-blur border border-gray-100 rounded-2xl px-6 py-4 shadow-sm text-center">
              <div className="text-3xl font-bold text-[#d97706]">10<span className="text-2xl">+</span></div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">Cranes in Fleet</div>
            </div>
            <div className="bg-white/80 backdrop-blur border border-gray-100 rounded-2xl px-6 py-4 shadow-sm text-center">
              <div className="text-3xl font-bold text-[#d97706]">400<span className="text-2xl">T</span></div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">Max Capacity</div>
            </div>
            <div className="bg-white/80 backdrop-blur border border-gray-100 rounded-2xl px-6 py-4 shadow-sm text-center">
              <div className="text-3xl font-bold text-[#d97706]">25<span className="text-2xl">+</span></div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">Years Experience</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 50L1440 50L1440 15C1200 50 720 0 0 30L0 50Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* ── FILTER TABS ──────────────────────────────────────── */}
      <section className="bg-gray-50 pt-10 pb-4 sticky top-32 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              counts[cat] > 0 || cat === 'All' ? (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    active === cat
                      ? 'bg-[#d97706] text-white shadow-md'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-[#d97706]/40 hover:text-[#d97706]'
                  }`}
                >
                  {cat}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    active === cat ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {counts[cat]}
                  </span>
                </button>
              ) : null
            ))}
          </div>
        </div>
      </section>

      {/* ── CRANE GRID ───────────────────────────────────────── */}
      <section className="bg-gray-50 py-10 min-h-[40vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading ? (
            <div className="text-center py-24 text-gray-400">Loading cranes…</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              {cranes.length === 0
                ? 'No cranes listed yet. Please check back soon.'
                : `No cranes in the "${active}" category.`}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((crane) => {
                const color = categoryColors[crane.category] ?? { bg: 'bg-gray-100', text: 'text-gray-700' };
                return (
                  <div
                    key={crane._id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="h-48 bg-gradient-to-br from-[#92400e] to-[#78350f] flex items-center justify-center overflow-hidden relative">
                      {crane.imageUrl ? (
                        <img
                          src={imageSrc(crane.imageUrl)}
                          alt={crane.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-center text-white/30">
                          <svg viewBox="0 0 80 60" className="w-20 h-16 mx-auto mb-2 fill-current">
                            <rect x="0" y="45" width="80" height="6" rx="3" />
                            <rect x="5" y="20" width="6" height="32" rx="3" />
                            <rect x="5" y="10" width="55" height="5" rx="2.5" />
                            <rect x="56" y="10" width="5" height="32" rx="2.5" />
                            <rect x="20" y="25" width="3" height="20" rx="1.5" />
                            <rect x="30" y="25" width="3" height="20" rx="1.5" />
                          </svg>
                          <p className="text-xs">No image</p>
                        </div>
                      )}
                      {/* Capacity badge */}
                      <div className="absolute top-3 right-3 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-xl shadow-md">
                        {crane.capacity}T
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="font-bold text-[#0b1d3a] text-base leading-snug">{crane.name}</h3>
                        <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${color.bg} ${color.text}`}>
                          {crane.category}
                        </span>
                      </div>

                      {/* Specs */}
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="text-center p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                          <Weight size={14} className="text-[#d97706] mx-auto mb-1" />
                          <div className="text-sm font-bold text-[#0b1d3a]">{crane.capacity}T</div>
                          <div className="text-xs text-gray-400">Capacity</div>
                        </div>
                        <div className="text-center p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                          <Ruler size={14} className="text-[#d97706] mx-auto mb-1" />
                          <div className="text-sm font-bold text-[#0b1d3a]">
                            {crane.mainBoom ? `${crane.mainBoom}m` : '—'}
                          </div>
                          <div className="text-xs text-gray-400">Main Boom</div>
                        </div>
                        <div className="text-center p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                          <MoveHorizontal size={14} className="text-[#d97706] mx-auto mb-1" />
                          <div className="text-sm font-bold text-[#0b1d3a]">
                            {crane.jib ? `${crane.jib}m` : '—'}
                          </div>
                          <div className="text-xs text-gray-400">Jib</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="hero-gradient relative py-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Need a Crane for Your Project?
          </h2>
          <p className="text-gray-600 mb-8">
            Contact us for availability, rates, and on-site support. We respond within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Get a Quote <ChevronRight size={18} />
            </Link>
            <a href="tel:+919824137362" className="btn-outline">
              <Phone size={18} /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ── FLOATING CONTACT BUTTONS ─────────────────────────── */}
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
