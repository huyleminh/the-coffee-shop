import express from "express";
import AuthorizationMiddleware from "../middlewares/authorization.middleware.js";
import CartController from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.get(
    "/get",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    CartController.getProducts
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

cartRouter.patch(
    "/edit",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    CartController.editProducts
)

export default cartRouter;
