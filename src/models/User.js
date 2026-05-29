const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, default: '' },
  status: { type: String, enum: ['member', 'visitor', 'admin'], default: 'visitor' },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['member', 'visitor', 'admin'], default: 'visitor' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
