const mongoose = require('mongoose');

const ManagerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Manager', ManagerSchema, 'managers');