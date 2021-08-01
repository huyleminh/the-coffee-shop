import Order from "../utilities/database/entities/Order.js";
import ReceiverInfo from "../utilities/database/entities/ReceiverInfo.js";
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
            payload.deliveryFee
        )

        // create a ReceiverInfo object
        const receiverInfo = new ReceiverInfo(
            order.id,
            payload.receiverInfo.fullname,
            payload.receiverInfo.address,
            payload.receiverInfo.phoneNumber
        )

        // create an array of ProductOrder object
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
        const insertReceiverInfo = await receiverInfo.insert()
        const insertProductOrderList = await ProductOrder.insertList(productOrderList)

        res.send({ status: 200 })
    }

    static getAll = async (req, res) => {
        const userId = res.locals.userInfo.id
        const orderList = await Order.getAllByUserId(userId)
        const productsList = []

        for (let order of orderList)
            productsList.push(await ProductOrder.getAllProductByOrderId(order.id))

        res.send({
            status: 200,
            data: orderList.map((order, index) => {
                return {
                    order: {
                        aliasId: order.aliasId,
                        createdAt: order.createdAt,
                        status: order.status,
                        status: order.isPaid,
                        payMethod: order.payMethod,
                        deliveryFee: order.deliveryFee
                    },
                    receiver: {
                        fullname: order.fullname,
                        address: order.address,
                        phoneNumber: order.phoneNumber
                    },
                    products: productsList[index]
                }
            })
        })
    }
}

export default OrderController
