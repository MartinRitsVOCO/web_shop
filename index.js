import express, { json, urlencoded } from "express";

import sequelize from "./util/db.js";
import initModels from "./models/index.js";

import adminRoutes from "./routers/admin.js";
import productRoutes from "./routers/product.js";

const app = express();
const _PORT = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

sequelize.models = await initModels();
sequelize
  .sync()
  .then(() => {
    return sequelize.models.User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return sequelize.models.User.create({
        name: "user",
        email: "user@localhost",
      });
    }
  })
  .then((user) => {
    console.log("Database sync successful.");
    user ? console.log(user) : null;
  })
  .catch((error) => {
    console.error("Database sync failed.", error);
  });

app.get("/", (req, res) => {
  res.send("<h1>Web Shop</h1>");
});

app.use((req, res, next) => {
  sequelize.models.User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
});

app.use("/api/admin/", adminRoutes);
app.use("/api/product/", productRoutes);

app.listen(_PORT, () => {
  console.log(`Server is running on http://localhost:${_PORT}`);
});
