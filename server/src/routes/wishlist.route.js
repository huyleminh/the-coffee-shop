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
export default wishlistRouter;
