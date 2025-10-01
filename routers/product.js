import express from "express";
import productController from "../controllers/product.js";

const router = express.Router();

router.get("/all", (req, res) => productController.getAllProducts(req, res));
router.get("/by-id/:id", (req, res) =>
  productController.getProductById(req, res)
);

export default router;
