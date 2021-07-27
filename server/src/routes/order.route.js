import express from 'express'
import AuthorizationMiddleware from "../middlewares/authorization.middleware.js";
import OrderController from "../controllers/order.controller.js";

const orderRouter = express.Router()

orderRouter.get(
    "/view-history",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    OrderController.getAll
)

export default orderRouter;