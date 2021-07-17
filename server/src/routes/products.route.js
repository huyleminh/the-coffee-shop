import express from 'express';
import ProductsMiddleware from "../middlewares/products.middleware.js";
import ProductsController from "../controllers/products.controller.js";

const productsRouter = express.Router();

productsRouter.get("/", ProductsMiddleware.verifyParams, ProductsController.getProducts);

export default productsRouter;
