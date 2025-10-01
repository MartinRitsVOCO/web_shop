import { Sequelize } from "sequelize";
import sequelize from "../util/db.js";

const Order = sequelize.define("Order", {
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

Order.associate = (models) => {
  Order.belongsTo(models.User);
  Order.belongsToMany(models.Product, { through: "OrderItems" });
};

export default Order;
