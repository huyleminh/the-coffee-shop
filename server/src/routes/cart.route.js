import express from "express"
import AuthorizationMiddleware from "../middlewares/authorization.middleware.js"
import CartController from "../controllers/cart.controller.js"

const cartRouter = express.Router()

cartRouter.post(
    "/add",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyInfoInToken,
    CartController.addProduct
)

export default cartRouter
