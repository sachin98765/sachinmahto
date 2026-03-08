const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: [true, 'Title required'], trim: true, maxlength: 120 },
  description: { type: String, required: [true, 'Description required'], maxlength: 500 },
  type:        { type: String, enum: ['Full Stack', 'Frontend', 'Backend', 'Mobile'], default: 'Full Stack' },
  emoji:       { type: String, default: '🚀' },
  tags:        [{ type: String, trim: true }],
  githubUrl:   { type: String, trim: true, default: '#' },
  liveUrl:     { type: String, trim: true, default: '#' },
  featured:    { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
  bgGradient:  { type: String, default: 'linear-gradient(135deg,rgba(0,229,200,.08),rgba(124,92,252,.08))' },
  isActive:    { type: Boolean, default: true },
}, { timestamps: true });

projectSchema.index({ order: 1, createdAt: -1 });
module.exports = mongoose.model('Project', projectSchema);
