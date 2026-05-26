const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  totalViews: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Stats', statsSchema);
