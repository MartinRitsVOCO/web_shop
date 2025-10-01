import express from "express";
import adminController from "../controllers/admin.js";
import productController from "../controllers/product.js";

const router = express.Router();

router.post("/product/add", (req, res) => adminController.addProduct(req, res));
router.get("/product/all", (req, res) =>
  productController.getAllProducts(req, res)
);
router.get("/product/by-id/:id", (req, res) =>
  productController.getProductById(req, res)
);
router.put("/product/update/:id", (req, res) =>
  adminController.updateProduct(req, res)
);
router.delete("/product/delete/:id", (req, res) =>
  adminController.deleteProduct(req, res)
);

export default router;
