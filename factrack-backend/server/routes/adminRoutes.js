const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authenticateAdmin = require("../middleware/authMiddleware.cjs");
const { Manager, Product } = require("../models/Admin");
require("dotenv").config();

const router = express.Router();

//----------------Manager-------------

// Admin Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  // This is the correct way (you can include username/email in token payload)
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({
    success: true,
    message: "Admin login successful",
    token, // send token to frontend
  });
});

// Adding New Manager
router.post("/add-manager", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      dept,
      DOJ,
      managerID,
      qualification,
      salary,
      username,
      remarks,
    } = req.body;

    // Check for existing email or username
    const existingEmail = await Manager.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "Manager with this email already exists" });
    }

    const existingUsername = await Manager.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const newManager = new Manager({
      name,
      email,
      phone,
      dept,
      DOJ,
      managerID,
      qualification,
      salary,
      username,
      remarks,
      isDeleted: 0,
      status:'Off Duty'
    });

    const saved = await newManager.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error adding manager:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch All Managers
router.get("/fetch-managers", async (req, res) => {
  try {
    // Fetch all managers from the database
    const fetchedManagers = await Manager.find();
    // console.log(`fetched managers list data from backend is:-`, fetchedManagers)

    res.json({
      success: true,
      data: fetchedManagers,
    });
  } catch (err) {
    console.error("Error fetching managers:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching managers",
    });
  }
});

// Update a manager
router.put("/update-manager/:id", async (req, res) => {
  try {
    const updatedManager = await Manager.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedManager)
      return res.status(404).json({ message: "Manager not found" });
    res.json(updatedManager);
  } catch (err) {
    let message = "Update failed";
    if (err.code === 11000) {
      if (err.keyPattern?.email) message = "Email already exists";
      else if (err.keyPattern?.username) message = "Username already exists";
    }
    res.status(400).json({ message });
  }
});

// Soft delete a manager by setting isDeleted to 1
router.put("/delete-manager/:id", async (req, res) => {
  try {
    const manager = await Manager.findByIdAndUpdate(
      req.params.id,
      { isDeleted: 1 },
      { new: true }
    );

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    res.json({
      success: true,
      message: "Manager deleted (soft delete) successfully",
      data: manager,
    });
  } catch (err) {
    console.error("Error deleting manager:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error while deleting manager" });
  }
});

//------------------Product------------

router.post("/add-product", async (req, res) => {
  try {
    const { productName, companyName, stock } = req.body;

    console.log(
      `productName:- ${productName}, companyName:- ${companyName}, stock:- ${stock}`
    );

    // First validate input
    if (!productName || !companyName) {
      return res.status(400).json({
        success: false,
        message: "Product Name and Company Name are required.",
      });
    }

    // Check for existing product
    const existingProduct = await Product.findOne({
      productName,
      companyName,
    });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        error: "Product already exists",
        message:
          "This product already exists, you can directly update the product",
      });
    }

    const newProduct = new Product({
      productName,
      companyName,
      stock,
    });

    const saved = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: saved,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding product",
    });
  }
});

// fetch peoducts
router.get("/fetch-products", async (req, res) => {
  try {
    // Fetch all products from the database
    const fetchedProducts = await Product.find();
    // console.log(`fetched products list data from backend is:-`, fetchedproducts)

    res.json({
      success: true,
      data: fetchedProducts,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
});

//update products
router.put("/update-product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, companyName, stock } = req.body;

    // Validate incoming data
    if (!productName || !companyName || stock == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate product (excluding the current one)
    const duplicate = await Product.findOne({
      _id: { $ne: id },
      productName: { $regex: new RegExp(`^${productName}$`, "i") },
      companyName: { $regex: new RegExp(`^${companyName}$`, "i") },
    });

    if (duplicate) {
      return res.status(409).json({
        message:
          "This product already exists, you can directly update the product.",
      });
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { productName, companyName, stock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Something went wrong on the server" });
  }
});


//deletinh products
router.delete('/delete-product/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully', data: deletedProduct });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error during deletion' });
  }
});


// Update Manager Attendance
router.put("/update-manager-attendance/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log(`status received on backend:-`, status) 
  console.log(`id received on backend:-`, id) 

  try {
    // Validate input
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    // Find and update manager's status
    const updatedManager = await Manager.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );

    if (!updatedManager) {
      return res.status(404).json({
        success: false,
        message: "Manager not found",
      });
    }

    res.json({
      success: true,
      message: "Attendance marked successfully",
      data: updatedManager,
    });
  } catch (err) {
    console.error("Error updating attendance:", err);
    res.status(500).json({
      success: false,
      message: "Server error while updating attendance",
    });
  }
}); 



module.exports = router;