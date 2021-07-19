import express from "express";
import AuthorizationMiddleware from "../middlewares/authorization.middleware.js";
import CartController from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.get(
    "/get",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyInfoInToken,
    CartController.getProduct
);

cartRouter.post(
    "/add",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyInfoInToken,
    CartController.addProduct
);

export default cartRouter;
