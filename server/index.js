require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const rateLimit  = require('express-rate-limit');
const connectDB  = require('./config/db');

const app = express();

/* ─── Security ─── */
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://sachinmahto-dev.vercel.app',
  credentials: true,
}));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

/* ─── Rate Limiting ─── */
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use('/api/contact', rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages sent. Try again in 1 hour.' },
}));

/* ─── Routes ─── */
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills',   require('./routes/skills'));
app.use('/api/leetcode', require('./routes/leetcode'));
app.use('/api/contact',  require('./routes/contact'));

/* ─── Health Check ─── */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});

/* ─── 404 ─── */
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found` });
});

/* ─── Global Error Handler ─── */
app.use((err, req, res, next) => {
  console.error('💥 Error:', err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

/* ─── Start ─── */
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀  Server running → http://localhost:${PORT}`);
    console.log(`📡  API ready     → http://localhost:${PORT}/api/health`);
  });
});
