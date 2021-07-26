import Order from "../utilities/database/entities/Order.js";
import ProductOrder from "../utilities/database/entities/ProductOrder.js";
import { v4 as uuidv4} from "uuid"

class OrderController {
    static createOrder = async (req, res) => {
        const userInfo = res.locals.userInfo
        const payload = res.locals.payload

        // create an Order object
        const now = new Date()
        const order = new Order(
            uuidv4(),
            userInfo.id,
            now.toJSON(),
            0,
            payload.isPaid,
            payload.payMethod,
            payload.receiverInfo.fullname,
            payload.receiverInfo.deliveryAddress,
            payload.receiverInfo.phoneNumber
        )

        // creat an array of ProductOrder object
        const productOrderList = payload.products.map(productInfo => {
            return new ProductOrder(
                productInfo.id,
                order.id,
                productInfo.quantity,
                productInfo.price
            )
        })

        // insert an Order object and an array of ProductOrder object into the database
        const insertOrder = await order.insert()
        const insertProductOrderList = await ProductOrder.insertList(productOrderList)

        res.send({ status: 200 })
    }
}

export default OrderController
