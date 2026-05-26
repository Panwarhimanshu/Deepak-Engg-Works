import { useState, useEffect } from 'react';
import { useLang } from '../contexts/LangContext';
import api from '../api/axios';

export default function Gallery() {
  const { t } = useLang();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.title = 'Gallery | Project Photos — Deepak Engineering Works, Ankleshwar GIDC';
  }, []);

  useEffect(() => {
    api.get('/gallery')
      .then((res) => setImages(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(images.map((i) => i.category).filter(Boolean))];
  const filtered = category === 'All' ? images : images.filter((i) => i.category === category);

  return (
    <div className="pt-32">
      {/* Hero */}
      <section className="hero-gradient py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-wider mb-3">
            {t.gallery.title}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t.gallery.heading}</h1>
          <p className="text-gray-300 max-w-2xl">
            A visual showcase of our completed fabrication, erection, and maintenance projects across Gujarat.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === cat
                      ? 'bg-[#1a3c6e] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-6xl mb-4">📷</div>
              <p>{t.gallery.empty}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((img) => (
                <div
                  key={img._id}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer card-hover bg-gray-100"
                  onClick={() => setSelected(img)}
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-xl overflow-hidden max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.imageUrl}
              alt={selected.title}
              className="w-full object-contain max-h-[70vh]"
            />
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#0f2444]">{selected.title}</p>
                {selected.category && (
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                    {selected.category}
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-light"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
