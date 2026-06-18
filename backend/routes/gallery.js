const router = require('express').Router();
const Gallery = require('../models/Gallery');
const auth = require('../middleware/auth');
const { makeUpload, fileInfo, deleteAsset } = require('../config/upload');

const upload = makeUpload('gallery', 'gallery');

// Public: list all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: upload image
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image uploaded' });
    const file = fileInfo(req.file);
    const item = new Gallery({
      title: req.body.title,
      imageUrl: file.url,
      imagePublicId: file.publicId,
      category: req.body.category,
    });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await deleteAsset({ url: item.imageUrl, publicId: item.imagePublicId });
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
