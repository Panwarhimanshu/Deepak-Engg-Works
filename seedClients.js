require('dotenv').config();
const mongoose = require('mongoose');
const Client = require('./models/Client');

const clients = [
  // Running clients (26)
  { name: 'Aarti Industries Ltd',                          sector: 'Specialty Chemicals',            type: 'running', order: 1  },
  { name: 'Gujarat Fluorochemicals Limited',               sector: 'Fluorochemicals',                type: 'running', order: 2  },
  { name: 'Deccan Fine Chemical (India) Pvt Ltd',          sector: 'Fine Chemicals',                 type: 'running', order: 3  },
  { name: 'Cohizon Life Science Ltd',                      sector: 'Life Sciences',                  type: 'running', order: 4  },
  { name: 'GFCL EV Product Limited',                       sector: 'EV / Battery Materials',         type: 'running', order: 5  },
  { name: 'Navin Fluorine Advance Science Limited',        sector: 'Fluorine Chemistry',             type: 'running', order: 6  },
  { name: 'PI Industries Ltd',                             sector: 'Agrochemicals',                  type: 'running', order: 7  },
  { name: 'Gujarat Insecticides Ltd',                      sector: 'Agrochemicals',                  type: 'running', order: 8  },
  { name: 'Birla Century Textiles Industries Ltd',         sector: 'Textiles & Manufacturing',       type: 'running', order: 9  },
  { name: 'Mega Innovative Crops Pvt Ltd',                 sector: 'Crop Protection',                type: 'running', order: 10 },
  { name: 'India Pesticide Limited',                       sector: 'Agrochemicals',                  type: 'running', order: 11 },
  { name: 'Gharda Chemical Limited',                       sector: 'Agrochemicals & Pharma',         type: 'running', order: 12 },
  { name: 'Cheminova India Ltd',                           sector: 'Crop Protection Chemicals',      type: 'running', order: 13 },
  { name: 'The Lakshmiji Organics Pvt Ltd',                sector: 'Organic Chemicals',              type: 'running', order: 14 },
  { name: 'SRF India Limited',                             sector: 'Technical Textiles & Chemicals', type: 'running', order: 15 },
  { name: 'Neogen Chemicals Limited',                      sector: 'Organolithium & Bromine',        type: 'running', order: 16 },
  { name: 'Birla Advanced Knits Pvt Ltd',                  sector: 'Textiles',                       type: 'running', order: 17 },
  { name: 'Shalvis Specialities Limited',                  sector: 'Specialty Chemicals',            type: 'running', order: 18 },

  // Past clients (19)
  { name: 'Jubilant Life Science Ltd',                     sector: 'Pharma & Life Sciences',         type: 'past',    order: 1  },
  { name: 'Huntsman Performance Products (India) Pvt Ltd', sector: 'Specialty Chemicals',            type: 'past',    order: 2  },
  { name: 'UPL Ltd (United Phosphorus Ltd)',               sector: 'Agri Solutions',                 type: 'past',    order: 3  },
  { name: 'Atul Ltd',                                      sector: 'Specialty Chemicals',            type: 'past',    order: 4  },
  { name: 'Lanxess India Pvt Ltd',                         sector: 'Specialty Chemicals',            type: 'past',    order: 5  },
  { name: 'Viswaat Chemical',                              sector: 'Industrial Chemicals',           type: 'past',    order: 6  },
  { name: 'Navin Fluorine Pvt Ltd',                        sector: 'Fluorine Chemistry',             type: 'past',    order: 7  },
  { name: 'Panama Petrochemical Pvt Ltd',                  sector: 'Petrochemicals',                 type: 'past',    order: 8  },
  { name: 'Sterling Auxiliaries Pvt Ltd',                  sector: 'Specialty Chemicals',            type: 'past',    order: 9  },
  { name: 'Savla Chemicals',                               sector: 'Industrial Chemicals',           type: 'past',    order: 10 },
  { name: 'Arcoy Biorefinery Pvt Ltd',                     sector: 'Biorefinery',                    type: 'past',    order: 11 },
  { name: 'Laffans Petrochemicals',                        sector: 'Petrochemicals',                 type: 'past',    order: 12 },
  { name: 'Meredian Chem Bond Ltd',                        sector: 'Specialty Chemicals',            type: 'past',    order: 13 },
  { name: 'Rashdeep Chemical Pvt Ltd',                     sector: 'Industrial Chemicals',           type: 'past',    order: 14 },
  { name: 'Birla Grasim Pvt Ltd',                          sector: 'Textiles & Chemicals',           type: 'past',    order: 15 },
  { name: 'KLJ Petroplast Limited',                        sector: 'Plastics & Petrochemicals',      type: 'past',    order: 16 },
  { name: 'Hemani Industries Ltd',                         sector: 'Industrial Chemicals',           type: 'past',    order: 17 },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Client.deleteMany({});
    console.log('Cleared existing clients');
    await Client.insertMany(clients);
    console.log(`✓ Inserted ${clients.length} clients (${clients.filter(c => c.type === 'running').length} running, ${clients.filter(c => c.type === 'past').length} past)`);
    process.exit(0);
  })
  .catch((err) => { console.error(err); process.exit(1); });
