import express from 'express'
import AdminController from '../controllers/admin.controller.js'
import AuthorizationMiddleware from '../middlewares/authorization.middleware.js'

const adminRouter = express.Router()

adminRouter.get(
    "/products/get",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    AdminController.getAllProducts
)

adminRouter.post(
    "/product/create",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    AdminController.createProduct
)

adminRouter.post(
    "/product/edit",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    AdminController.editProduct
)

adminRouter.delete(
    "/product/delete",
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    AdminController.deleteProduct
)

export default adminRouter
