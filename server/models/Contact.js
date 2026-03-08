const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true, maxlength: 100 },
  email:   { type: String, required: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
  subject: { type: String, trim: true, maxlength: 200, default: 'Portfolio Contact' },
  message: { type: String, required: true, maxlength: 2000 },
  status:  { type: String, enum: ['unread', 'read', 'replied'], default: 'unread' },
  ip:      { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
