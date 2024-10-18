const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  description: { type: String, required: true },
  incidentType:{type:String, required:true},
  coordinates: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  address: { type: String, required: true }
});

module.exports = mongoose.model('Report', reportSchema);
