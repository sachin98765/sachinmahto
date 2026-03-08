# 🚀 MERN Stack Portfolio Website

A complete full-stack portfolio website built with **MongoDB + Express.js + React.js + Node.js + Tailwind CSS**.

---

## 📁 Project Structure

```
mern-portfolio/
├── client/                  # React 18 + Vite + Tailwind CSS (Frontend)
│   ├── src/
│   │   ├── components/      # Navbar, Hero, About, Skills, LeetCode, Projects, Education, Contact, Footer
│   │   ├── pages/           # Home.jsx
│   │   ├── hooks/           # useScrollSpy.js
│   │   ├── utils/           # api.js (Axios)
│   │   └── context/         # ThemeContext.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                  # Node.js + Express.js (Backend)
│   ├── models/              # Mongoose models
│   ├── routes/              # Express API routes
│   ├── middleware/          # Auth JWT middleware
│   ├── config/              # MongoDB connection
│   ├── seed.js              # Populate DB with sample data
│   └── index.js             # Express server entry
│
├── package.json             # Root scripts (concurrently)
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free) OR MongoDB installed locally
- Git

---

### Step 1 — Clone & Install

```bash
# Install all dependencies at once
npm run install:all
```

---

### Step 2 — Configure Environment

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio
JWT_SECRET=your_secret_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Optional: Gmail for contact form emails
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=your@gmail.com
```

> **MongoDB Atlas:** Go to https://cloud.mongodb.com → Create free cluster → Get connection string

---

### Step 3 — Seed Database (Optional)

```bash
cd server
node seed.js
```

This populates MongoDB with sample projects, skills, and LeetCode data.

---

### Step 4 — Run Development

```bash
# From root — runs both simultaneously
npm run dev

# Client: http://localhost:5173
# Server: http://localhost:5000
# API:    http://localhost:5000/api
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/health` | Server health check | No |
| GET | `/api/projects` | Get all projects | No |
| POST | `/api/projects` | Add project | Admin |
| PUT | `/api/projects/:id` | Update project | Admin |
| DELETE | `/api/projects/:id` | Delete project | Admin |
| GET | `/api/skills` | Get all skills | No |
| POST | `/api/skills` | Add skill | Admin |
| GET | `/api/leetcode` | Get LeetCode stats | No |
| PUT | `/api/leetcode` | Update stats | Admin |
| POST | `/api/contact` | Send contact message | No |
| GET | `/api/contact` | View all messages | Admin |
| POST | `/api/auth/login` | Admin login → JWT | No |
| POST | `/api/auth/register` | Register admin (once) | No |

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, Vite, Tailwind CSS v3, React Router v6, Axios, Framer Motion |
| **Backend** | Node.js, Express.js, Mongoose ODM |
| **Database** | MongoDB Atlas |
| **Auth** | JWT (jsonwebtoken) + bcryptjs |
| **Email** | Nodemailer (Gmail SMTP) |
| **Security** | Helmet, CORS, express-rate-limit |
| **Dev Tools** | Nodemon, Concurrently, ESLint |

---

## 🚀 Deployment

### Frontend → Vercel
```bash
cd client && npm run build
# Upload dist/ to Vercel or connect GitHub repo
```

### Backend → Render / Railway
```bash
# Set environment variables in dashboard
# Deploy server/ folder
```

---

## 📧 Contact Form Setup (Gmail)

1. Go to Google Account → Security → 2-Step Verification → App Passwords
2. Generate password for "Mail"
3. Add to `.env`: `EMAIL_PASS=xxxx xxxx xxxx xxxx`

---

## 👤 Admin Panel

Register admin once:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

Then login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

Use the returned JWT token as `Authorization: Bearer <token>` for protected routes.
