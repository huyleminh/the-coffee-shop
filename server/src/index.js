import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import productsRouter from "./routes/products.route.js";
import categoriesRouter from "./routes/categories.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    )
    next();
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);

app.listen(PORT, () => {
    console.log(
        `The coffee shop's server is listening at http://localhost:${PORT}`
    );
});
