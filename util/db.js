import { Sequelize } from "sequelize";

const sequelize = new Sequelize("web_shop", "root", "qwerty", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
