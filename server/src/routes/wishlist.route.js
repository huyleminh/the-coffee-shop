import express from "express";
import WishlistController from "../controllers/wishlist.controller.js";
import AuthorizationMiddleware from "../middlewares/authorization.middleware.js";

const wishlistRouter = express.Router();

wishlistRouter.get(
    "/get",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyInfoInToken,
    WishlistController.getProductInWishlist
);
wishlistRouter.post(
    "/add",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyInfoInToken,
    WishlistController.addProductIntoWishlist
);
wishlistRouter.delete(
    "/delete",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyInfoInToken,
    WishlistController.DeleteProductInWishlist
);
export default wishlistRouter;
