const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

const allowedOrigins = [/^http:\/\/localhost:\d+$/];
if (process.env.FRONTEND_URL) {
  // Support a comma-separated list of allowed production origins
  process.env.FRONTEND_URL.split(',').forEach((o) => allowedOrigins.push(o.trim()));
}
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/services', require('./routes/services'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/views',   require('./routes/views'));
app.use('/api/cranes',         require('./routes/cranes'));
app.use('/api/clients',        require('./routes/clients'));
app.use('/api/contact-config', require('./routes/contactConfig'));

app.get('/', (req, res) => res.json({ message: 'Deepak Engineering Works API' }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
