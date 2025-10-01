import express from "express";
import cartController from "../controllers/cart.js";

const router = express.Router();

router.get("/", (req, res) => cartController.getCart(req, res));
router.post("/add-to/:id", (req, res) =>
  cartController.addProductToCart(req, res)
);
router.delete("/remove-from/:id", (req, res) =>
  cartController.removeProductFromCart(req, res)
);

export default router;
