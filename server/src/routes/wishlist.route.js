import express from "express";
import WishlistController from "../controllers/wishlist.controller.js";
import AuthorizationMiddleware from "../middlewares/authorization.middleware.js";

const wishlistRouter = express.Router();

wishlistRouter.get(
    "/get",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    WishlistController.getProduct
);
wishlistRouter.post(
    "/add",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    WishlistController.addProduct
);
wishlistRouter.delete(
    "/delete",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    WishlistController.deleteProduct
);
export default wishlistRouter;
