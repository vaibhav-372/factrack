const mongoose = require("mongoose");

// Manager Schema
const managerSchema = new mongoose.Schema(
  {
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
    isDeleted: { type: Boolean },
    status: { type: String },
  },
  { timestamps: true }
);

// Product Schema
const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    companyName: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

// Exporting both models
module.exports = {
  Manager: mongoose.model("ManagersList", managerSchema),
  Product: mongoose.model("Product", productSchema),
};
