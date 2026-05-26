const express  = require('express');
const router   = express.Router();
const multer   = require('multer');
const path     = require('path');
const fs       = require('fs');
const Client   = require('../models/Client');
const verifyToken = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `client-${Date.now()}-${Math.floor(Math.random() * 1e6)}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// GET all — public
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ order: 1, createdAt: 1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create — auth
router.post('/', verifyToken, upload.single('logo'), async (req, res) => {
  try {
    const { name, sector, type, order } = req.body;
    if (!name || !type) return res.status(400).json({ message: 'Name and type are required' });
    const client = new Client({
      name,
      sector: sector || '',
      type,
      order: Number(order) || 0,
      logoUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
    });
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update — auth
router.put('/:id', verifyToken, upload.single('logo'), async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Not found' });

    const { name, sector, type, order, removeLogo } = req.body;
    if (name)   client.name   = name;
    if (sector !== undefined) client.sector = sector;
    if (type)   client.type   = type;
    if (order !== undefined)  client.order  = Number(order);

    if (req.file) {
      // Delete old logo
      if (client.logoUrl) {
        const old = path.join(__dirname, '..', client.logoUrl);
        if (fs.existsSync(old)) fs.unlinkSync(old);
      }
      client.logoUrl = `/uploads/${req.file.filename}`;
    } else if (removeLogo === 'true') {
      if (client.logoUrl) {
        const old = path.join(__dirname, '..', client.logoUrl);
        if (fs.existsSync(old)) fs.unlinkSync(old);
      }
      client.logoUrl = undefined;
    }

    await client.save();
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE — auth
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: 'Not found' });
    if (client.logoUrl) {
      const filePath = path.join(__dirname, '..', client.logoUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
