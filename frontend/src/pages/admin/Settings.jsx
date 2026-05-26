import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Save, Phone, Mail, MapPin, Clock, Map, CheckCircle } from 'lucide-react';
import AdminLayout from './AdminLayout';

const defaultForm = {
  phone1:        '',
  phone2:        '',
  email1:        '',
  email2:        '',
  officeAddress: '',
  worksAddress:  '',
  workingHours:  '',
  mapUrl:        '',
};

function Section({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/60">
        <div className="w-8 h-8 bg-[#1a3c6e]/10 rounded-lg flex items-center justify-center">
          <Icon size={16} className="text-[#1a3c6e]" />
        </div>
        <h2 className="font-semibold text-[#0b1d3a] text-sm">{title}</h2>
      </div>
      <div className="px-6 py-5 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = 'text', placeholder, textarea }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={3}
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a3c6e] focus:ring-2 focus:ring-[#1a3c6e]/10 resize-none transition"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a3c6e] focus:ring-2 focus:ring-[#1a3c6e]/10 transition"
        />
      )}
    </div>
  );
}

export default function AdminSettings() {
  const [form,    setForm]    = useState(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);

  useEffect(() => {
    api.get('/settings')
      .then((res) => setForm({ ...defaultForm, ...res.data }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setSaved(false);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/settings', form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const saveButton = (
    <button
      form="settings-form"
      type="submit"
      disabled={saving}
      className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
        saved
          ? 'bg-green-500 text-white'
          : 'bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-60'
      }`}
    >
      {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> {saving ? 'Saving…' : 'Save Changes'}</>}
    </button>
  );

  if (loading) {
    return (
      <AdminLayout title="Settings">
        <div className="text-center py-20 text-gray-400">Loading settings…</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Settings" actions={saveButton}>
      <form id="settings-form" onSubmit={handleSubmit} className="space-y-5 max-w-3xl">

        {/* Phone */}
        <Section icon={Phone} title="Phone Numbers">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Primary Phone" name="phone1" value={form.phone1} onChange={handleChange} placeholder="+91 98241 37362" />
            <Field label="Secondary Phone" name="phone2" value={form.phone2} onChange={handleChange} placeholder="+91 84016 08487" />
          </div>
        </Section>

        {/* Email */}
        <Section icon={Mail} title="Email Addresses">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Primary Email" name="email1" value={form.email1} onChange={handleChange} type="email" placeholder="deepak.enggwork@yahoo.com" />
            <Field label="Secondary Email" name="email2" value={form.email2} onChange={handleChange} type="email" placeholder="deepakengg@gmail.com" />
          </div>
        </Section>

        {/* Addresses */}
        <Section icon={MapPin} title="Addresses">
          <Field
            label="Office / Registered Address"
            name="officeAddress"
            value={form.officeAddress}
            onChange={handleChange}
            placeholder="S-18, James Plaza Square…"
            textarea
          />
          <Field
            label="Works / Factory Address"
            name="worksAddress"
            value={form.worksAddress}
            onChange={handleChange}
            placeholder="Plot No. 501/H, Ramdevpir Chowkdi…"
            textarea
          />
        </Section>

        {/* Working Hours */}
        <Section icon={Clock} title="Working Hours">
          <Field
            label="Working Hours Text"
            name="workingHours"
            value={form.workingHours}
            onChange={handleChange}
            placeholder="Monday – Sunday, 9 AM – 6 PM"
          />
        </Section>

        {/* Map */}
        <Section icon={Map} title="Map Location">
          <Field
            label="Google Maps Embed URL"
            name="mapUrl"
            value={form.mapUrl}
            onChange={handleChange}
            placeholder="https://maps.google.com/maps?q=…&output=embed"
          />
          <p className="text-xs text-gray-400">
            Go to <strong>Google Maps</strong> → search your location → Share → Embed a map → copy the <code>src</code> URL from the iframe code.
          </p>
          {form.mapUrl && (
            <div className="rounded-xl overflow-hidden border border-gray-200 h-52">
              <iframe
                key={form.mapUrl}
                title="Map Preview"
                src={form.mapUrl}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          )}
        </Section>

      </form>
    </AdminLayout>
  );
}
