import { Sequelize } from "sequelize";
import sequelize from "../util/db.js";

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.associate = (models) => {
  User.hasMany(models.Product);
  User.hasOne(models.Cart);
  User.hasMany(models.Order);
};

export default User;
