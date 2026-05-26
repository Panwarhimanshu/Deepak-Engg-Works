const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  phone1:        { type: String, default: '+91 98241 37362' },
  phone2:        { type: String, default: '+91 84016 08487' },
  email1:        { type: String, default: 'deepak.enggwork@yahoo.com' },
  email2:        { type: String, default: 'deepakengg@gmail.com' },
  officeAddress: { type: String, default: 'S-18, James Plaza Square, Asian Paint Chowkdi, Station Road, G.I.D.C., Ankleshwar – 393 002, Dist. Bharuch, Gujarat' },
  worksAddress:  { type: String, default: 'Plot No. 501/H, Ramdevpir Chowkdi, Opp. Water Treatment Plant, Station Road, GIDC, Ankleshwar – 393 002, Dist. Bharuch' },
  workingHours:  { type: String, default: 'Monday – Sunday, 9 AM – 6 PM' },
  mapUrl:        { type: String, default: 'https://maps.google.com/maps?q=Ankleshwar+GIDC+Gujarat&t=&z=13&ie=UTF8&iwloc=&output=embed' },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
