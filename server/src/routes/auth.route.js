import express from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", AuthController.postLogin);
authRouter.get("/verify", AuthController.verifyToken);

export default authRouter;
