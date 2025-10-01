import Product from "../models/product.js";

class AdminController {
  addProduct = async (req, res) => {
    try {
      const product = await Product.create({
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        UserId: req.user.id,
      });
      res.status(201).json({
        message: "Product added.",
        productId: product.id,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to add product.",
        error: error,
      });
    }
  };
  updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, price, imageUrl, description } = req.body;
      const [updated] = await Product.update(
        { title, price, imageUrl, description },
        { where: { id } }
      );
      if (updated) {
        const updatedProduct = await Product.findByPk(req.params.id);
        res.status(201).json(updatedProduct);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to update product.",
        error: error,
      });
    }
  };
  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Product.destroy({ where: { id } });
      if (deleted) {
        res.status(201).send({ message: "Product deleted successfully." });
      } else {
        res.status(404).json({ error: "Product not found." });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete product.",
        error: error,
      });
    }
  };
}

export default new AdminController();
