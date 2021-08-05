import express from 'express'
import DiscountsController from '../controllers/discounts.controller.js'

const discountsRouter = express.Router()

discountsRouter.get("/", DiscountsController.getAll)

export default discountsRouter
