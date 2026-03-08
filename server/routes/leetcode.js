const express  = require('express');
const Leetcode = require('../models/Leetcode');
const { protect } = require('../middleware/auth');
const router   = express.Router();

const FALLBACK = {
  totalSolved: 0, easy: 0, medium: 0, hard: 0,
  maxStreak: 0, contestRating: 0, globalRank: 'Top 100%',
  profileUrl: 'https://leetcode.com',
  topicStats: [
    { icon:'📋', name:'Arrays & Hashing',      solved:28 },
    { icon:'🪟', name:'Two Pointers',           solved:15 },
    { icon:'🪄', name:'Sliding Window',         solved:12 },
    { icon:'📚', name:'Stack & Queue',          solved:18 },
    { icon:'🔍', name:'Binary Search',          solved:14 },
    { icon:'🔗', name:'Linked Lists',           solved:16 },
    { icon:'🌲', name:'Trees & BST',            solved:22 },
    { icon:'🕸️', name:'Graphs BFS/DFS',         solved:17 },
    { icon:'⚡', name:'Dynamic Programming',    solved:14 },
    { icon:'🔢', name:'Heap / Priority Q',      solved: 9 },
    { icon:'↩️', name:'Backtracking',           solved: 8 },
    { icon:'🧮', name:'Bit Manipulation',       solved: 7 },
  ],
  recentSolves: [
    { problemId:1,   title:'Two Sum',                  difficulty:'Easy',   tags:['Array','Hash Map'],     solvedAt: new Date() },
    { problemId:15,  title:'3Sum',                     difficulty:'Medium', tags:['Array','Two Pointers'], solvedAt: new Date() },
    { problemId:42,  title:'Trapping Rain Water',      difficulty:'Hard',   tags:['Array','Stack'],        solvedAt: new Date() },
    { problemId:200, title:'Number of Islands',        difficulty:'Medium', tags:['BFS','Graph'],          solvedAt: new Date() },
    { problemId:70,  title:'Climbing Stairs',          difficulty:'Easy',   tags:['DP','Math'],            solvedAt: new Date() },
    { problemId:124, title:'Binary Tree Max Path Sum', difficulty:'Hard',   tags:['Tree','DFS'],           solvedAt: new Date() },
    { problemId:238, title:'Product of Array Except Self', difficulty:'Medium', tags:['Array'],            solvedAt: new Date() },
    { problemId:56,  title:'Merge Intervals',          difficulty:'Medium', tags:['Array','Sorting'],      solvedAt: new Date() },
  ],
};

// GET /api/leetcode
router.get('/', async (req, res) => {
  try {
    const stats = await Leetcode.findOne();
    res.json({ success: true, data: stats || FALLBACK });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/leetcode  (admin — upsert)
router.put('/', protect, async (req, res) => {
  try {
    const stats = await Leetcode.findOneAndUpdate({}, req.body, {
      upsert: true, new: true, runValidators: true,
    });
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
