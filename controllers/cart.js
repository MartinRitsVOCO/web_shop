import Cart from "../models/cart.js";
import Product from "../models/product.js";

class CartController {
  getCart = async (req, res) => {
    try {
      const userCart = await req.user.getCart();
      const cartProducts = await userCart.getProducts();
      res.status(201).json({
        products: cartProducts,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to add product to cart.",
        error: error,
      });
    }
  };
  addProductToCart = async (req, res) => {
    try {
      const userCart = await req.user.getCart();
      const product = await Product.findByPk(req.params.id);
      await userCart.addProduct(product);
      res.status(201).json({
        message: "Product added to cart.",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to add product to cart.",
        error: error,
      });
    }
  };
  removeProductFromCart = async (req, res) => {
    try {
      const userCart = await req.user.getCart();
      const product = await Product.findByPk(req.params.id);
      await userCart.removeProduct(product);
      res.status(201).json({
        message: "Product removed from cart.",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to remove product from cart.",
        error: error,
      });
    }
  };
}

export default new CartController();
