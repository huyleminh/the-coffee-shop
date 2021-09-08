import Category from "../utilities/database/entities/Category.js";

class CategoriesController {
    static getAll = async (req, res) => {
        const data = await Category.getAll();
        const param = req.query;

        if (Object.keys(param).length !== 0)
            res.send({ status: 404, message: "Page not found" });
        else res.send({ status: 200, data });
    };
}

export default CategoriesController;
