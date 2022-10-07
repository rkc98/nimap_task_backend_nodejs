const {
  getCategory,
  updateCategory,
  deleteCategory,
  createCategory,
  getCategoryById,
} = require("../controllers/categoryController");

const express = require("express");

const router = express.Router();

// get All Categories
router.get("/getAllCategories", getCategory);

// create Categories
router.post("/create", createCategory);

// update Categories
router.put("/update", updateCategory);

// delete Categories
router.delete("/delete/:id", deleteCategory);

// get Category By Id
router.get("/getCategory/:id", getCategoryById);

module.exports = router;
