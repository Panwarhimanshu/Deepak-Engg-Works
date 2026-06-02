const router = require('express').Router();
const ContactConfig = require('../models/ContactConfig');
const auth = require('../middleware/auth');

const getOrCreate = async () => {
  let config = await ContactConfig.findOne();
  if (!config) config = await ContactConfig.create({});
  return config;
};

// Public: get crane options list
router.get('/', async (req, res) => {
  try {
    const config = await getOrCreate();
    res.json({ craneOptions: config.craneOptions });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: add a crane option
router.post('/cranes', auth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: 'Name is required' });
    const config = await getOrCreate();
    if (config.craneOptions.includes(name.trim())) {
      return res.status(400).json({ message: 'Already exists' });
    }
    config.craneOptions.push(name.trim());
    await config.save();
    res.json({ craneOptions: config.craneOptions });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: rename a crane option
router.put('/cranes/:name', auth, async (req, res) => {
  try {
    const oldName = decodeURIComponent(req.params.name);
    const { name: newName } = req.body;
    if (!newName?.trim()) return res.status(400).json({ message: 'Name is required' });
    const config = await getOrCreate();
    const idx = config.craneOptions.indexOf(oldName);
    if (idx === -1) return res.status(404).json({ message: 'Option not found' });
    if (newName.trim() !== oldName && config.craneOptions.includes(newName.trim())) {
      return res.status(400).json({ message: 'Already exists' });
    }
    config.craneOptions[idx] = newName.trim();
    await config.save();
    res.json({ craneOptions: config.craneOptions });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: delete a crane option
router.delete('/cranes/:name', auth, async (req, res) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const config = await getOrCreate();
    config.craneOptions = config.craneOptions.filter((o) => o !== name);
    await config.save();
    res.json({ craneOptions: config.craneOptions });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
