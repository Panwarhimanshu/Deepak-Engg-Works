import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Building2, Phone, MessageCircle } from 'lucide-react';
import api from '../api/axios';

const API_BASE = import.meta.env.VITE_API_BASE?.replace('/api', '') ?? 'http://localhost:5000';

const colors = [
  '#1a3c6e', '#f97316', '#16a34a', '#7c3aed',
  '#db2777', '#0891b2', '#b45309', '#dc2626',
  '#065f46', '#1e40af',
];

function ClientCard({ client, index }) {
  const initials = client.name
    .split(' ')
    .filter((w) => w.length > 2 && w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  const color = colors[index % colors.length];

  return (
    <div className="royal-card p-4 flex items-center gap-4 group hover:shadow-md transition-shadow">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 overflow-hidden border border-gray-100"
        style={client.logoUrl ? { background: '#fff' } : { background: color }}
      >
        {client.logoUrl
          ? <img src={`${API_BASE}${client.logoUrl}`} alt={client.name} className="w-full h-full object-contain p-1" />
          : <span className="text-white font-bold text-sm">{initials || <Building2 size={20} />}</span>
        }
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-[#0b1d3a] text-sm leading-tight">{client.name}</p>
        {client.sector && <p className="text-gray-400 text-xs mt-0.5">{client.sector}</p>}
      </div>
    </div>
  );
}

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Our Clients | Deepak Engineering Works — Serving Aarti Industries, SRF, PI Industries & More';
  }, []);

  useEffect(() => {
    api.get('/clients')
      .then((res) => setClients(Array.isArray(res.data) ? res.data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const running = clients.filter((c) => c.type === 'running');
  const past    = clients.filter((c) => c.type === 'past');

  return (
    <div className="pt-20 overflow-x-hidden">

      {/* Hero */}
      <section className="hero-gradient relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 blueprint-bg pointer-events-none" />
        <div className="absolute top-0 left-0 w-1 h-full bg-[#d97706]/60" />
        <div className="absolute inset-0 safety-stripe opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="section-badge mb-5">Our Clientele</div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-gray-900 mb-4 leading-none uppercase">
            Trusted by Gujarat's<br className="hidden sm:block" /> Leading Industries
          </h1>
          <p className="text-gray-600 max-w-2xl text-sm sm:text-base leading-relaxed">
            For over two decades, Deepak Engineering Works has been the engineering partner of choice for India's top chemical, petrochemical, pharmaceutical and specialty materials companies in Ankleshwar GIDC.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            {[
              { v: running.length > 0 ? `${running.length}+` : '26+', l: 'Active Clients' },
              { v: past.length > 0    ? `${past.length}+`    : '19+', l: 'Served Previously' },
              { v: clients.length > 0 ? `${clients.length}+` : '45+', l: 'Total Companies' },
              { v: '22+', l: 'Years of Trust' },
            ].map((b) => (
              <div key={b.l} className="flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-2">
                <span className="text-orange-400 font-bold text-lg font-display">{b.v}</span>
                <span className="text-gray-300 text-sm">{b.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Running clients */}
      {(loading || running.length > 0) && (
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <div className="section-badge mb-4 inline-flex">Currently Serving</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0b1d3a] mb-3">Running Client Relationships</h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl">
                Active, long-term engineering partnerships — pipeline works, plant maintenance, fabrication and erection at their Ankleshwar GIDC facilities.
              </p>
            </div>
            {loading ? (
              <div className="text-center py-10 text-gray-400">Loading…</div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {running.map((client, i) => <ClientCard key={client._id} client={client} index={i} />)}
              </div>
            )}
            <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-sm font-semibold text-gray-500 mb-3">Industries We Serve</p>
              <div className="flex flex-wrap gap-2">
                {['Specialty Chemicals', 'Petrochemicals', 'Agrochemicals', 'Pharmaceuticals', 'Fluorochemicals', 'Technical Textiles', 'Crop Protection', 'Industrial Gases', 'Biorefinery'].map((s) => (
                  <span key={s} className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full font-medium">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Past clients */}
      {(loading || past.length > 0) && (
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <div className="section-badge mb-4 inline-flex">Successfully Delivered</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0b1d3a] mb-3">Past Project Clients</h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl">
                Successfully executed major engineering projects for these organisations — on-time, zero-defect delivery across Gujarat's industrial heartland.
              </p>
            </div>
            {loading ? (
              <div className="text-center py-10 text-gray-400">Loading…</div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {past.map((client, i) => <ClientCard key={client._id} client={client} index={i + 3} />)}
              </div>
            )}
          </div>
        </section>
      )}

      {!loading && clients.length === 0 && (
        <section className="py-24 bg-white text-center text-gray-400">Client list coming soon.</section>
      )}

      {/* Why choose us */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-badge mb-5">Why Industry Leaders Choose Us</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0b1d3a] mb-6 section-title">A Partner You Can Rely On</h2>
              <div className="space-y-4">
                {[
                  { title: 'ISO 9001:2015 Certified Quality', desc: 'Documented quality management processes ensuring consistent, traceable delivery on every contract.' },
                  { title: 'Deep GIDC Domain Knowledge', desc: 'Over two decades working inside Ankleshwar GIDC — we know the facilities, the regulations and the timelines.' },
                  { title: '400+ Skilled Workforce on Demand', desc: 'Welders, riggers, fabricators, engineers and project managers ready to mobilise at short notice.' },
                  { title: 'Heavy Lift Up to 400 Tonnes', desc: 'Proprietary crane fleet including DEMAG AC 1200 (400T) for complex lift and erection operations.' },
                  { title: 'HSE-First Culture', desc: 'Zero-accident commitment with rigorous daily toolbox talks, PPE compliance and permit-to-work systems.' },
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
            </div>
            <div className="bg-gradient-to-br from-[#92400e] to-[#78350f] rounded-3xl p-8 sm:p-10 text-white">
              <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider mb-6">What Our Clients Say</p>
              <blockquote className="text-gray-200 text-sm leading-relaxed italic mb-6">
                "Deepak Engineering Works has been our go-to mechanical contractor for pipeline and fabrication work. Their team is professional, safety-conscious, and consistently delivers on schedule."
              </blockquote>
              <div className="border-t border-white/10 pt-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center text-orange-400 font-bold shrink-0">PM</div>
                <div>
                  <p className="font-semibold text-sm">Plant Manager</p>
                  <p className="text-gray-400 text-xs">Leading Chemical Company, Ankleshwar GIDC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="section-badge mb-6 mx-auto inline-flex">Work With Us</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Become Our Next Success Story</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Join the growing list of Gujarat's leading manufacturers who trust Deepak Engineering Works for their critical engineering projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">Get a Free Quote <ChevronRight size={18} /></Link>
            <a href="tel:+919824137362" className="btn-outline"><Phone size={18} /> Call Now</a>
          </div>
        </div>
      </section>

      <div className="floating-cta">
        <a href="https://wa.me/919824137362" target="_blank" rel="noreferrer"
          className="relative w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110" title="WhatsApp">
          <div className="pulse-ring" />
          <MessageCircle size={24} />
        </a>
        <a href="tel:+919824137362"
          className="w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110" title="Call Us">
          <Phone size={22} />
        </a>
      </div>
    </div>
  );
}
