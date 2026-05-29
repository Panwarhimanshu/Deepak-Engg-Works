const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Service = require('./models/Service');
require('dotenv').config();

const services = [
  { title: 'Pipeline Works', description: 'Complete pipeline installation, repair, and maintenance for industrial plants and refineries.', icon: 'pipeline', order: 1 },
  { title: 'Structural Fabrication', description: 'Heavy-duty steel structure fabrication built to exact engineering specifications.', icon: 'structure', order: 2 },
  { title: 'Equipment Erection', description: 'Safe and precise erection of industrial equipment, vessels, and machinery.', icon: 'equipment', order: 3 },
  { title: 'Plant Maintenance', description: 'Scheduled and emergency maintenance services to keep your plant running smoothly.', icon: 'maintenance', order: 4 },
  { title: 'Commissioning Services', description: 'End-to-end commissioning and erection commissioning for new plant setups.', icon: 'commissioning', order: 5 },
  { title: 'Engineering Drawings', description: 'Technical and architectural drawing services for industrial and construction projects.', icon: 'drawings', order: 6 },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Create admin
  const adminExists = await Admin.countDocuments();
  if (adminExists === 0) {
    await Admin.create({ username: 'admin', password: 'admin123' });
    console.log('✅ Admin created — username: admin, password: admin123');
    console.log('   CHANGE PASSWORD AFTER FIRST LOGIN!');
  } else {
    console.log('ℹ️  Admin already exists, skipping');
  }

  // Seed services
  const svcCount = await Service.countDocuments();
  if (svcCount === 0) {
    await Service.insertMany(services);
    console.log('✅ Services seeded');
  } else {
    console.log('ℹ️  Services already exist, skipping');
  }

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch(console.error);
