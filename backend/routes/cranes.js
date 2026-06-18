const router = require('express').Router();
const Crane = require('../models/Crane');
const auth = require('../middleware/auth');
const { makeUpload, fileInfo, deleteAsset } = require('../config/upload');

const upload = makeUpload('cranes', 'crane');

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
    const file = fileInfo(req.file);
    const crane = await Crane.create({
      name, category,
      capacity: Number(capacity),
      mainBoom: mainBoom ? Number(mainBoom) : undefined,
      jib: jib ? Number(jib) : undefined,
      imageUrl: file ? file.url : '',
      imagePublicId: file ? file.publicId : undefined,
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
      await deleteAsset({ url: crane.imageUrl, publicId: crane.imagePublicId });
      const file = fileInfo(req.file);
      crane.imageUrl = file.url;
      crane.imagePublicId = file.publicId;
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
    await deleteAsset({ url: crane.imageUrl, publicId: crane.imagePublicId });
    await Crane.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
