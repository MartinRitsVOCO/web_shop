import express from "express";
import orderController from "../controllers/order.js";

const router = express.Router();

router.get("/get-all/", (req, res) =>
  orderController.getAllUserOrders(req, res)
);
router.post("/create/", (req, res) => orderController.createOrder(req, res));

export default router;
