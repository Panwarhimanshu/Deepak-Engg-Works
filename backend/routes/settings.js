const router = require('express').Router();
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');

// Public: get settings (used by frontend Contact/About pages)
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: update settings
router.put('/', auth, async (req, res) => {
  try {
    const allowed = ['phone1', 'phone2', 'email1', 'email2', 'officeAddress', 'worksAddress', 'workingHours', 'mapUrl'];
    const update = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));

    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(update);
    } else {
      Object.assign(settings, update);
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
