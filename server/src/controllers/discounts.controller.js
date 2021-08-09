import Discount from '../utilities/database/entities/Discount.js'

class DiscountsController {
    static getAll = async (req, res) => {
        const discounts = await Discount.getAll()

        if (Object.keys(req.query).length !== 0)
            res.send({ status: 404, message: "Page not found" });
        else
            res.send({ status: 200, data: discounts });
    }
}

export default DiscountsController
