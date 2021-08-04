import Order from "../utilities/database/entities/Order.js";
import ReceiverInfo from "../utilities/database/entities/ReceiverInfo.js";
import ProductOrder from "../utilities/database/entities/ProductOrder.js";
import { v4 as uuidv4 } from "uuid"
import orderid from "order-id"
import dotenv from "dotenv"
import { OrderStatus } from '../utilities/constants.js';

dotenv.config()
const orderIdLib = orderid(process.env.SECRET_TOKEN_KEY)

class OrderController {
    static createOrder = async (req, res) => {
        const userInfo = res.locals.userInfo
        const payload = res.locals.payload

        // generate a aliasId (order-id)
        // and check whether this value has occurred in the database
        const aliasIdList = await Order.getAllAliasId()
        let aliasId = orderIdLib.generate()
        while (aliasIdList.includes(aliasId))
            aliasId = orderIdLib.generate()

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
            payload.totalProducts,
            payload.totalPrice
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
                        id: order.id,
                        aliasId: order.aliasId,
                        createdAt: order.createdAt,
                        status: order.status,
                        isPaid: order.isPaid,
                        payMethod: order.payMethod,
                        deliveryFee: order.deliveryFee,
                        totalProducts: order.totalProducts,
                        totalPrice: order.totalPrice
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

    static cancelOneOrder = async (req, res) => {
        const { orderId } = res.locals.payload
        const userId = res.locals.userInfo.id
        const [order] = await Order.getByOrderIdAndUserId(orderId, userId)

        if (order === undefined)
            res.send({ status: 404, message: "This order does not exist" })
        else if (order.status !== OrderStatus.PENDING)
            res.send({ status: 406, message: "This order cannot be cancelled" })
        else {
            const updateStatus = order.update(["status"], [OrderStatus.CANCEL])
            res.send({ status: 200 })
        }
    }
}

export default OrderController
