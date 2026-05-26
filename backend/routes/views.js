const router = require('express').Router();
const Stats = require('../models/Stats');
const auth = require('../middleware/auth');

// Public: increment view count (called once per session from frontend)
router.post('/track', async (req, res) => {
  try {
    let stats = await Stats.findOne();
    if (!stats) {
      stats = await Stats.create({ totalViews: 1 });
    } else {
      stats.totalViews += 1;
      await stats.save();
    }
    res.json({ totalViews: stats.totalViews });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: get view stats
router.get('/', auth, async (req, res) => {
  try {
    let stats = await Stats.findOne();
    if (!stats) stats = await Stats.create({});
    res.json({ totalViews: stats.totalViews });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
