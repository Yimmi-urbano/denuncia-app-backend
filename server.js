const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const Report = require('./models/Report');

// POST: Crear una denuncia
app.post('/api/reports', async (req, res) => {
  const { description, coordinates,incidentType,address } = req.body;
  try {
    const newReport = new Report({ description, coordinates, incidentType, address});
    await newReport.save();
    res.status(201).json({ message: 'Report created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create report' });
  }
});

// GET: Obtener todas las denuncias
app.get('/api/reports', async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch reports' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
