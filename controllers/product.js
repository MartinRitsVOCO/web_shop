import Product from "../models/product.js";

class ProductController {
  getAllProducts = async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(201).json({
        products: products,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to get all products.",
        error: error,
      });
    }
  };

  getProductById = async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      res.status(201).json({
        product: product,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to get all product by id.",
        error: error,
      });
    }
  };
}

export default new ProductController();
