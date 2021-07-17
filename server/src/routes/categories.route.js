import express from "express";
import CategoriesController from "../controllers/categories.controller.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/", CategoriesController.getAll);

export default categoriesRouter;
