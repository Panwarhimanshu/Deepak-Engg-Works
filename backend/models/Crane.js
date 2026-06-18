const mongoose = require('mongoose');

const craneSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  category:   { type: String, required: true, enum: ['Telescopic Boom', 'Lattice Boom', 'Crawler', 'Pick & Carry'] },
  capacity:   { type: Number, required: true },
  mainBoom:   { type: Number },
  jib:        { type: Number },
  imageUrl:   { type: String },
  imagePublicId: { type: String },
  order:      { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Crane', craneSchema);
