import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import productsRouter from "./routes/products.route.js";
import categoriesRouter from "./routes/categories.route.js";
import wishlistRouter from "./routes/wishlist.route.js";
import cartRouter from "./routes/cart.route.js";
import checkoutRouter from "./routes/checkout.route.js";
import orderRouter from "./routes/order.route.js";
import employeeRouter from "./routes/employee.route.js";
import adminRouter from "./routes/admin.route.js";
import discountsRouter from "./routes/discounts.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", `${process.env.AUTH_CLIENT_URL}`);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    next();
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/order", orderRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/admin", adminRouter);
app.use("/api/discounts", discountsRouter);

app.listen(PORT, () => {
    console.log(
        `The coffee shop's server is listening at http://localhost:${PORT}`
    );
});
