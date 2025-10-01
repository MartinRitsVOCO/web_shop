import Product from "../models/product.js";

class OrderController {
  createOrder = async (req, res) => {
    try {
      const userCart = await req.user.getCart({
        include: [{ model: Product }],
      });
      const newOrder = await req.user.createOrder();
      await newOrder.setProducts(userCart.Products);
      userCart.setProducts([]);
      res.status(201).json({
        message: "Order created.",
        order: newOrder,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create order.",
        error: error,
      });
    }
  };
  getAllUserOrders = async (req, res) => {
    try {
      const orders = await req.user.getOrders();
      res.status(201).json({
        orders: orders,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to get orders.",
        error: error,
      });
    }
  };
}

export default new OrderController();
