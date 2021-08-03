import express from 'express'
import EmployeeController from '../controllers/employee.controller.js'
import AuthorizationMiddleware from '../middlewares/authorization.middleware.js'

const employeeRouter = express.Router()

employeeRouter.get(
    '/view-orders',
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    EmployeeController.getAllOrders
)

employeeRouter.post(
    '/verify-order',
    AuthorizationMiddleware.verifyToken,
    AuthorizationMiddleware.verifyDataInToken,
    EmployeeController.verifyOrder
)

export default employeeRouter
