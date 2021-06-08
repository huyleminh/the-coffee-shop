import express from "express";
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Hello, this is coffee shop server");
});

app.listen(PORT, () => {
    console.log(`The coffee shopp's server is listening at http://localhost:${PORT}`);
});
