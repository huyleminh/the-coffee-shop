import Order from "../utilities/database/entities/Order.js";
import ProductOrder from "../utilities/database/entities/ProductOrder.js";
import { v4 as uuidv4 } from "uuid"
import orderid from "order-id"
import dotenv from "dotenv"

dotenv.config()
const orderId = orderid(process.env.SECRET_TOKEN_KEY)

class OrderController {
    static createOrder = async (req, res) => {
        const userInfo = res.locals.userInfo
        const payload = res.locals.payload

        // generate a aliasId (order-id)
        // and check whether this value has occurred in the database
        const aliasIdList = await Order.getAllAliasId()
        let aliasId = orderId.generate()
        while (aliasIdList.includes(aliasId))
            aliasId = orderId.generate()

        // create an Order object
        const now = new Date()
        const order = new Order(
            uuidv4(),
            aliasId,
            userInfo.id,
            now.toJSON(),
            0,
            payload.isPaid,
            payload.payMethod,
            payload.deliveryFee,
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
