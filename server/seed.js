/**
 * MongoDB Seed Script
 * Run: cd server && node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Project  = require('./models/Project');
const Skill    = require('./models/Skill');
const Leetcode = require('./models/Leetcode');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

async function seed() {
  console.log('🌱 Connecting to MongoDB...');
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected');

  // Clear
  await Promise.all([Project.deleteMany({}), Skill.deleteMany({}), Leetcode.deleteMany({})]);
  console.log('🗑️  Cleared existing data');

  // ── Projects ──────────────────────────────────────
  await Project.insertMany([
    {
     title:'FreeFresherJobs — Service Platform',
                order:'1',
                type:'Full Stack',
                emoji:'💼',
                description:'Complete MERN stack platform with JWT authentication, admin dashboard with real-time analytics, daily job updates, blog articles, resources section, and secure authentication system for managing job postings.',
                tags:['React','Node.js','MongoDB','Tailwind CSS','HTML'],
                featured:true,
                bgGradient:'linear-gradient(135deg,rgba(0,229,200,.08),rgba(124,92,252,.08))',
                githubUrl:'#',
                liveUrl:'#',
    },
    {
      title:'URL Shortener',
      order:'2',
                type:'Full Stack',
                emoji:'🔗',
                description:'Full stack URL shortener that converts long links into short URLs, generates QR codes, includes an authentication system, and provides a dashboard showing real-time click analytics.',
                tags:['React','JavaScript','Supabase','Tailwind CSS','HTML'],
                featured:false,
                bgGradient:'linear-gradient(135deg,rgba(0,168,150,.08),rgba(124,92,252,.08))',
                githubUrl:'https://github.com/sachin98765/url-shortener',
                liveUrl:'https://url-shortener-lac-omega.vercel.app/',
    },
    {
      title:'Notification Dashboard',
      order:'3',
                type:'Full Stack',
                emoji:'🔔',
                description:'Full stack dashboard that displays real-time notifications and live data updates. Includes a dynamic UI for monitoring events, alerts, and activity logs.',
                tags:['React','JavaScript','MongoDB','HTML','CSS'],
                featured:false,
                bgGradient:'linear-gradient(135deg,rgba(255,77,109,.08),rgba(124,92,252,.08))',
                githubUrl:'https://github.com/sachin98765/notification-dashboard-fullstack',
                liveUrl:'https://reliable-malasada-4c5812.netlify.app/',
    },
    {
       title:'Password Generator',
       order:'4',
                type:'Frontend',
                emoji:'🔑',
                description:'Frontend password generator that creates secure passwords of any length. Includes customizable options and acts like a recommendation system for generating strong passwords.',
                tags:['React','Tailwind CSS','HTML'],
                featured:false,
                bgGradient:'linear-gradient(135deg,rgba(0,229,200,.06),rgba(124,92,252,.08))',
                githubUrl:'https://reliable-malasada-4c5812.netlify.app/',
                liveUrl:'https://psw-generator-blush.vercel.app/',
    },
     {
       title:'Pinterest Clone',
       order:'5',
                type:'Full Stack',
                emoji:'📌',
                description:'Full stack Pinterest-style platform with authentication system, user dashboard, account creation, and the ability to post images or videos. Includes feed browsing and content management.',
                tags:['React JS','Node JS','Express JS','MongoDB','Tailwind CSS','Bootstrap','HTML'],
                featured:false,
                bgGradient:'linear-gradient(135deg,rgba(255,77,109,.08),rgba(245,166,35,.08))',
                githubUrl:'https://github.com/sachin98765/pinterest',
                liveUrl:'#',
    },
  ]);
  console.log('✅ Projects seeded (5)');

  // ── Skills ────────────────────────────────────────
  await Skill.insertMany([
    // Frontend
    { name: 'React.js',         icon: '⚛️',  percentage: 85, category: 'frontend', color: 'teal',   order: 1 },
    { name: 'JavaScript ES6+',  icon: '🟨',  percentage: 88, category: 'frontend', color: 'teal',   order: 2 },
    { name: 'HTML5 & CSS3',     icon: '🌐',  percentage: 90, category: 'frontend', color: 'teal',   order: 3 },
    { name: 'Tailwind CSS',     icon: '🎨',  percentage: 82, category: 'frontend', color: 'teal',   order: 4 },
    { name: 'Redux Toolkit',    icon: '🔄',  percentage: 72, category: 'frontend', color: 'violet', order: 5 },
    // Backend
    { name: 'Node.js & Express',icon: '🟢',  percentage: 78, category: 'backend',  color: 'violet', order: 1 },
    { name: 'MongoDB & Mongoose',icon:'🍃',  percentage: 75, category: 'backend',  color: 'violet', order: 2 },
    { name: 'REST API Design',  icon: '🔗',  percentage: 80, category: 'backend',  color: 'violet', order: 3 },
    { name: 'JWT & Auth',       icon: '🔐',  percentage: 70, category: 'backend',  color: 'amber',  order: 4 },
    { name: 'Git & GitHub',     icon: '🐙',  percentage: 85, category: 'backend',  color: 'amber',  order: 5 },
  ]);
  console.log('✅ Skills seeded (10)');

  // ── LeetCode ──────────────────────────────────────
  await Leetcode.create({
    totalSolved: 160, easy: 114, medium: 48, hard: 2,
    maxStreak: 59, contestRating: 1367, globalRank: 'Top 91.08%',
    profileUrl: 'https://leetcode.com',
    topicStats: [
      { icon:'📋', name:'Arrays & Hashing',   solved:28 }, { icon:'🪟', name:'Two Pointers',       solved:15 },
      { icon:'🪄', name:'Sliding Window',      solved:12 }, { icon:'📚', name:'Stack & Queue',      solved:18 },
      { icon:'🔍', name:'Binary Search',       solved:14 }, { icon:'🔗', name:'Linked Lists',       solved:16 },
      { icon:'🌲', name:'Trees & BST',         solved:22 }, { icon:'🕸️', name:'Graphs BFS/DFS',     solved:17 },
      { icon:'⚡', name:'Dynamic Programming', solved:14 }, { icon:'🔢', name:'Heap / Priority Q',  solved: 9 },
      { icon:'↩️', name:'Backtracking',        solved: 8 }, { icon:'🧮', name:'Bit Manipulation',   solved: 7 },
    ],
    recentSolves: [
      { problemId:1,   title:'Two Sum',                     difficulty:'Easy',   tags:['Array','Hash Map']     },
      { problemId:15,  title:'3Sum',                        difficulty:'Medium', tags:['Array','Two Pointers'] },
      { problemId:42,  title:'Trapping Rain Water',         difficulty:'Hard',   tags:['Array','Stack']        },
      { problemId:200, title:'Number of Islands',           difficulty:'Medium', tags:['BFS','Graph']          },
      { problemId:70,  title:'Climbing Stairs',             difficulty:'Easy',   tags:['DP','Math']            },
      { problemId:124, title:'Binary Tree Max Path Sum',    difficulty:'Hard',   tags:['Tree','DFS']           },
      { problemId:238, title:'Product of Array Except Self',difficulty:'Medium', tags:['Array']                },
      { problemId:56,  title:'Merge Intervals',             difficulty:'Medium', tags:['Array','Sorting']      },
    ],
  });
  console.log('✅ LeetCode stats seeded');

  console.log('\n🎉 Database seeded successfully!');
  console.log('   Run: npm run dev  (from root) to start');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
