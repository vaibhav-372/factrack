const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dept: { type: String, required: true },
  DOJ: { type: Date, required: true },
  managerID: { type: String, required: true },
  qualification: { type: String, required: true },
  salary: { type: Number, required: true },
  username: { type: String, required: true, unique: true },
  remarks: { type: String },
  isDeleted: {type: Boolean},
}, { timestamps: true });

module.exports = mongoose.model('ManagersList', managerSchema);
