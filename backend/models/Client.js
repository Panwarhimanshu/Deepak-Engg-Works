const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  sector:  { type: String, default: '' },
  type:    { type: String, enum: ['running', 'past'], required: true },
  logoUrl: { type: String },
  logoPublicId: { type: String },
  order:   { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
