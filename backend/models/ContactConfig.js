const mongoose = require('mongoose');

const contactConfigSchema = new mongoose.Schema({
  craneOptions: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('ContactConfig', contactConfigSchema);
