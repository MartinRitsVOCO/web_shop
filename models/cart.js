import { Sequelize } from "sequelize";
import sequelize from "../util/db.js";

const Cart = sequelize.define("Cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});

Cart.associate = (models) => {
  Cart.belongsTo(models.User);
  Cart.belongsToMany(models.Product, { through: "CartItem" });
};

export default Cart;
