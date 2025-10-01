import express, { json, urlencoded } from "express";

import sequelize from "./util/db.js";
import initModels from "./models/index.js";

import adminRoutes from "./routers/admin.js";
import productRoutes from "./routers/product.js";
import cartRoutes from "./routers/cart.js";

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
    return user;
  })
  .then(async (user) => {
    const userCart = await user.getCart();
    if (!userCart) {
      return await user.createCart();
    }
    return userCart;
  })
  .then((cart) => {
    console.log("Database sync successful.");
    cart ? console.log(cart) : null;
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
app.use("/api/cart/", cartRoutes);

app.listen(_PORT, () => {
  console.log(`Server is running on http://localhost:${_PORT}`);
});
