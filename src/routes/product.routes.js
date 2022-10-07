const express = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productController");

const router = express.Router();

// get All Products
router.get("/getAllproducts", getProducts);

router.get("/getProduct/:id",getProductById)

// create product
router.post("/create", createProduct);

// update product
router.put("/update", updateProduct);

// delete product
router.delete("/delete/:id", deleteProduct);

module.exports = router;
