const mongoose = require('mongoose');

const recentSolveSchema = new mongoose.Schema({
  problemId:  Number,
  title:      String,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  tags:       [String],
  solvedAt:   { type: Date, default: Date.now },
}, { _id: false });

const topicSchema = new mongoose.Schema({
  icon:   String,
  name:   String,
  solved: Number,
}, { _id: false });

const leetcodeSchema = new mongoose.Schema({
  totalSolved:    { type: Number, default: 0 },
  easy:           { type: Number, default: 0 },
  medium:         { type: Number, default: 0 },
  hard:           { type: Number, default: 0 },
  maxStreak:      { type: Number, default: 0 },
  contestRating:  { type: Number, default: 0 },
  globalRank:     { type: String, default: 'Top 20%' },
  profileUrl:     { type: String, default: 'https://leetcode.com' },
  recentSolves:   [recentSolveSchema],
  topicStats:     [topicSchema],
}, { timestamps: true });

module.exports = mongoose.model('Leetcode', leetcodeSchema);
