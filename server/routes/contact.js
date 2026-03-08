const express    = require('express');
const nodemailer = require('nodemailer');
const Contact    = require('../models/Contact');
const { protect } = require('../middleware/auth');
const router     = express.Router();

/* ─── Mail transporter ─── */
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
};

// POST /api/contact  (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ success: false, error: 'Name, email and message are required.' });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || 'Portfolio Contact',
      message: message.trim(),
      ip: req.ip,
    });

    // Send email notification (non-blocking)
    const transporter = createTransporter();
    if (transporter) {
      transporter.sendMail({
        from: `"Portfolio 📬" <${process.env.EMAIL_USER}>`,
        to:   process.env.EMAIL_TO || process.env.EMAIL_USER,
        subject: `New message from ${name}: ${subject || 'Portfolio Contact'}`,
        html: `
          <div style="font-family:sans-serif;background:#0b0d14;color:#c8cedf;padding:32px;border-radius:12px;max-width:600px;margin:auto;border:1px solid #1e2438">
            <h2 style="color:#00e5c8;margin-bottom:4px">📬 New Portfolio Message</h2>
            <p style="color:#5a6180;font-size:12px;margin-bottom:24px">${new Date().toLocaleString()}</p>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#5a6180;font-size:13px;width:100px">Name</td><td style="color:#eef0f8;font-size:14px">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#5a6180;font-size:13px">Email</td><td style="color:#eef0f8;font-size:14px">${email}</td></tr>
              <tr><td style="padding:8px 0;color:#5a6180;font-size:13px">Subject</td><td style="color:#eef0f8;font-size:14px">${subject || '—'}</td></tr>
            </table>
            <div style="margin-top:20px;padding:16px;background:#161a28;border-radius:6px;border-left:3px solid #00e5c8">
              <p style="margin:0;font-size:14px;line-height:1.7;color:#c8cedf">${message.replace(/\n/g,'<br/>')}</p>
            </div>
            <p style="margin-top:20px;font-size:12px;color:#2e3450">Reply to: <a href="mailto:${email}" style="color:#00e5c8">${email}</a></p>
          </div>`,
      }).catch(err => console.warn('Email notification failed:', err.message));
    }

    res.status(201).json({ success: true, message: 'Your message was sent! I\'ll reply within 24 hours.', id: contact._id });
  } catch (err) {
    console.error('Contact route error:', err);
    res.status(500).json({ success: false, error: 'Server error. Please try again.' });
  }
});

// GET /api/contact  (admin)
router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await Contact.countDocuments(filter);
    res.json({ success: true, count: contacts.length, total, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/contact/:id  (admin — update status)
router.patch('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, error: 'Message not found' });
    res.json({ success: true, data: contact });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
