import dotenv from "dotenv";
import express from "express";
// import TestController from "./controllers/test.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => {
    res.send("Hello world");
});

// app.get("/test", TestController.getData);

app.listen(PORT, () => {
    console.log(`The coffee shopp's server is listening at http://localhost:${PORT}`);
});
