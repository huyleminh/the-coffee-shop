import express from "express";
import WishlistController from "../controllers/wishlist.controller.js";
import AuthorizationMiddleware from "../middlewares/authorization.middleware.js";

const wishlistRouter = express.Router();

wishlistRouter.get(
    "/get",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    WishlistController.getProductInWishlist
);
wishlistRouter.post(
    "/add",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    WishlistController.addProductIntoWishlist
);
wishlistRouter.delete(
    "/delete",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    WishlistController.DeleteProductInWishlist
);
export default wishlistRouter;
