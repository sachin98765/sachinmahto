const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name:       { type: String, required: true, trim: true },
  icon:       { type: String, default: '⚡' },
  percentage: { type: Number, required: true, min: 0, max: 100 },
  category:   { type: String, enum: ['frontend', 'backend', 'tool'], required: true },
  color:      { type: String, enum: ['teal', 'violet', 'amber'], default: 'teal' },
  order:      { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
