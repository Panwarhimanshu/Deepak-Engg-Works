const express  = require('express');
const router   = express.Router();
const Client   = require('../models/Client');
const verifyToken = require('../middleware/auth');
const { makeUpload, fileInfo, deleteAsset } = require('../config/upload');

const upload = makeUpload('clients', 'client');

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
    const file = fileInfo(req.file);
    const client = new Client({
      name,
      sector: sector || '',
      type,
      order: Number(order) || 0,
      logoUrl: file ? file.url : undefined,
      logoPublicId: file ? file.publicId : undefined,
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
      await deleteAsset({ url: client.logoUrl, publicId: client.logoPublicId });
      const file = fileInfo(req.file);
      client.logoUrl = file.url;
      client.logoPublicId = file.publicId;
    } else if (removeLogo === 'true') {
      await deleteAsset({ url: client.logoUrl, publicId: client.logoPublicId });
      client.logoUrl = undefined;
      client.logoPublicId = undefined;
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
    await deleteAsset({ url: client.logoUrl, publicId: client.logoPublicId });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
