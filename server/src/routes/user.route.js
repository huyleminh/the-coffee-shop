import express from "express";
import AuthorizationMiddleware from "../middlewares/authorization.middleware.js";
import UserController from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get(
    "/profile/get",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyInfoInToken,
    UserController.getProfile
);

userRouter.patch(
    "/profile/edit",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyInfoInToken,
    UserController.editProfile
);

export default userRouter;
