import { useState, useEffect } from 'react';
import { useLang } from '../contexts/LangContext';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import api from '../api/axios';

const serviceOptions = [
  'Pipeline Works',
  'Structural Fabrication',
  'Equipment Erection',
  'Plant Maintenance',
  'Commissioning Services',
  'Engineering Drawings',
  'Other',
];

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', interestedCranes: [], message: '' });
  const [status, setStatus] = useState('idle');
  const [craneOptions, setCraneOptions] = useState([]);

  useEffect(() => {
    document.title = 'Contact Us | Get a Free Quote — Deepak Engineering Works, Ankleshwar Gujarat';
  }, []);

  useEffect(() => {
    api.get('/contact-config')
      .then((res) => setCraneOptions(res.data.craneOptions ?? []))
      .catch(() => {});
  }, []);

  const toggleCrane = (name) => {
    setForm((prev) => ({
      ...prev,
      interestedCranes: prev.interestedCranes.includes(name)
        ? prev.interestedCranes.filter((c) => c !== name)
        : [...prev.interestedCranes, name],
    }));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.post('/inquiries', form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', service: '', interestedCranes: [], message: '' });
    } catch {
      setStatus('error');
    }
  };

  const contactInfo = [
    {
      icon: <MapPin size={20} />,
      label: t.contact.address,
      content: 'S-18, James Plaza Square, Asian Paint Chowkdi, Station Road, G.I.D.C., Ankleshwar – 393 002',
      bg: '#d97706',
    },
    {
      icon: <MapPin size={20} />,
      label: t.contact.works,
      content: 'Plot No. 501/H, Ramdevpir Chowkdi, Opp. Water Treatment Plant, Station Road, GIDC, Ankleshwar – 393 002',
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
    {
      icon: <Clock size={20} />,
      label: t.contact.hours,
      content: t.contact.hoursValue,
      bg: '#db2777',
    },
  ];

  return (
    <div className="pt-20 overflow-x-hidden">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="hero-gradient relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 blueprint-bg pointer-events-none" />
        <div className="absolute top-0 left-0 w-1 h-full bg-[#d97706]/60" />
        <div className="absolute inset-0 safety-stripe opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="section-badge mb-5">{t.contact.title}</div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-gray-900 mb-4 leading-none uppercase">
            {t.contact.heading}
          </h1>
          <p className="text-gray-600 max-w-2xl text-sm sm:text-base leading-relaxed">
            Have a project in mind? Fill in the form and our team will get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* ── CONTENT ────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 xl:gap-12">

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="font-display text-2xl font-bold text-[#0b1d3a] mb-6">Contact Details</h2>
              {contactInfo.map((item) => (
                <div key={item.label} className="royal-card p-4 sm:p-5 flex gap-4 items-start">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white"
                    style={{ background: item.bg }}
                  >
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#0b1d3a] text-sm mb-1">{item.label}</p>
                    {item.content ? (
                      <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
                    ) : (
                      <div>
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

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="royal-card p-5 sm:p-8">
                <h2 className="font-display text-2xl font-bold text-[#0b1d3a] mb-2">Send Us a Message</h2>
                <p className="text-gray-500 text-sm mb-6">We respond to every inquiry within 24 hours.</p>

                {status === 'success' && (
                  <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 20 20" fill="white" className="w-3 h-3"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    </div>
                    {t.contact.success}
                  </div>
                )}
                {status === 'error' && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {t.contact.error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.name} *</label>
                      <input
                        type="text" name="name" value={form.name} onChange={handleChange} required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.phone} *</label>
                      <input
                        type="tel" name="phone" value={form.phone} onChange={handleChange} required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.email} *</label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange} required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.service}</label>
                    <select
                      name="service" value={form.service} onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  {craneOptions.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Interested in Our Cranes
                        {form.interestedCranes.length > 0 && (
                          <span className="ml-2 text-xs font-medium text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
                            {form.interestedCranes.length} selected
                          </span>
                        )}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {craneOptions.map((crane) => {
                          const selected = form.interestedCranes.includes(crane);
                          return (
                            <button
                              key={crane}
                              type="button"
                              onClick={() => toggleCrane(crane)}
                              className={`text-left px-3 py-2 rounded-xl border text-sm transition-all ${
                                selected
                                  ? 'bg-[#d97706] border-[#d97706] text-white font-medium'
                                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-[#d97706]/40 hover:text-[#d97706]'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${selected ? 'bg-white border-white' : 'border-gray-300'}`}>
                                  {selected && <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5"><path d="M2 6l3 3 5-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                </span>
                                {crane}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.message} *</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} required rows={5}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all resize-none"
                      placeholder="Describe your project or requirement in detail..."
                    />
                  </div>
                  <button
                    type="submit" disabled={status === 'sending'}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                    {status === 'sending' ? t.contact.sending : t.contact.send}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-72 sm:h-80 bg-gray-200 relative overflow-hidden">
        <iframe
          title="Deepak Engineering Works Location"
          src="https://maps.google.com/maps?q=Ankleshwar+GIDC+Gujarat&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
}
