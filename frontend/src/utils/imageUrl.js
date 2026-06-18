// Resolve an image path to a full URL.
// Cloudinary stores absolute URLs (https://...), legacy uploads store
// relative paths like /uploads/x.jpg that must be prefixed with the API origin.
const API_ORIGIN = import.meta.env.VITE_API_BASE?.replace('/api', '') ?? 'http://localhost:5000';

export function imageSrc(url) {
  if (!url) return '';
  return /^https?:\/\//.test(url) ? url : `${API_ORIGIN}${url}`;
}
