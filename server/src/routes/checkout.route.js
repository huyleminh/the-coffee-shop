import express from "express"
import AuthorizationMiddleware from "../middlewares/authorization.middleware.js"
import CheckoutController from "../controllers/checkout.controller.js"
import OrderController from "../controllers/order.controller.js"

const checkoutRouter = express.Router()

checkoutRouter.post(
    "/confirm",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    CheckoutController.confirmInfo,
    OrderController.createOrder
)

export default checkoutRouter
