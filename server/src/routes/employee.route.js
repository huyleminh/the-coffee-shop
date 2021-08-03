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

export default employeeRouter
