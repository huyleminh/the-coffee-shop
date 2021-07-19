import express from "express";
import AuthorizationMiddleware from "../middlewares/authorization.middleware.js";
import CartController from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.get(
    "/get",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    CartController.getProduct
);

cartRouter.post(
    "/add",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    CartController.addProduct
);

cartRouter.delete(
    "/delete",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    CartController.deleteProduct
)

export default cartRouter;
