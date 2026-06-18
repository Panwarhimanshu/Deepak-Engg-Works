const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary, isCloudinaryConfigured } = require('./cloudinary');

const ALLOWED = /jpeg|jpg|png|webp/;

// Build a multer instance. Uses Cloudinary when configured (persistent,
// survives Render restarts), otherwise falls back to local disk for dev.
function makeUpload(folder, prefix) {
  let storage;

  if (isCloudinaryConfigured) {
    storage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: `deepak-engg/${folder}`,
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        public_id: () => `${prefix}-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
      },
    });
  } else {
    const dir = path.join(__dirname, '..', 'uploads');
    storage = multer.diskStorage({
      destination: (req, file, cb) => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
      },
      filename: (req, file, cb) => {
        cb(null, `${prefix}-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`);
      },
    });
  }

  return multer({
    storage,
    fileFilter: (req, file, cb) => cb(null, ALLOWED.test(path.extname(file.originalname).toLowerCase())),
    limits: { fileSize: 5 * 1024 * 1024 },
  });
}

// Normalise an uploaded file into { url, publicId } for either storage.
// Cloudinary: file.path = secure URL, file.filename = public_id.
function fileInfo(file) {
  if (!file) return null;
  if (isCloudinaryConfigured) {
    return { url: file.path, publicId: file.filename };
  }
  return { url: `/uploads/${file.filename}`, publicId: null };
}

// Remove a previously stored asset (Cloudinary by public_id, or local file).
async function deleteAsset({ url, publicId } = {}) {
  if (publicId && isCloudinaryConfigured) {
    try { await cloudinary.uploader.destroy(publicId); } catch { /* ignore */ }
    return;
  }
  if (url && url.startsWith('/uploads/')) {
    const fp = path.join(__dirname, '..', url);
    if (fs.existsSync(fp)) { try { fs.unlinkSync(fp); } catch { /* ignore */ } }
  }
}

module.exports = { makeUpload, fileInfo, deleteAsset };
