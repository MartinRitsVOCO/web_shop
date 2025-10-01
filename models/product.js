import { Sequelize } from "sequelize";
import sequelize from "../util/db.js";

const Product = sequelize.define("Product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Product.associate = (models) => {
  Product.belongsTo(models.User, { constraints: true, onDelete: "CASCADE" });
  Product.belongsToMany(models.Cart, { through: "CartItem" });
};

export default Product;
