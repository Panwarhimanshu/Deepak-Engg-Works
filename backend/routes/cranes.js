const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Crane = require('../models/Crane');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = `crane-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, unique);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    cb(null, allowed.test(path.extname(file.originalname).toLowerCase()));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Public: list all cranes
router.get('/', async (req, res) => {
  try {
    const cranes = await Crane.find().sort({ order: 1, createdAt: 1 });
    res.json(cranes);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: add crane
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, category, capacity, mainBoom, jib, order } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const crane = await Crane.create({
      name, category,
      capacity: Number(capacity),
      mainBoom: mainBoom ? Number(mainBoom) : undefined,
      jib: jib ? Number(jib) : undefined,
      imageUrl,
      order: Number(order) || 0,
    });
    res.status(201).json(crane);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: update crane
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const crane = await Crane.findById(req.params.id);
    if (!crane) return res.status(404).json({ message: 'Not found' });

    const { name, category, capacity, mainBoom, jib, order } = req.body;
    crane.name     = name     ?? crane.name;
    crane.category = category ?? crane.category;
    crane.capacity = capacity ? Number(capacity) : crane.capacity;
    crane.mainBoom = mainBoom ? Number(mainBoom) : crane.mainBoom;
    crane.jib      = jib      ? Number(jib)      : crane.jib;
    crane.order    = order !== undefined ? Number(order) : crane.order;

    if (req.file) {
      // Delete old image
      if (crane.imageUrl) {
        const old = path.join(__dirname, '..', crane.imageUrl);
        if (fs.existsSync(old)) fs.unlinkSync(old);
      }
      crane.imageUrl = `/uploads/${req.file.filename}`;
    }

    await crane.save();
    res.json(crane);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: delete crane
router.delete('/:id', auth, async (req, res) => {
  try {
    const crane = await Crane.findById(req.params.id);
    if (!crane) return res.status(404).json({ message: 'Not found' });
    if (crane.imageUrl) {
      const filePath = path.join(__dirname, '..', crane.imageUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await Crane.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
