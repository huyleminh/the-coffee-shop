import express from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", AuthController.postLogin);
authRouter.post("/signup", AuthController.postSignup);

export default authRouter;
