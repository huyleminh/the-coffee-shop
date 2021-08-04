import Order from '../utilities/database/entities/Order.js'
import ProductOrder from '../utilities/database/entities/ProductOrder.js'
import { getRangeDate } from '../utilities/utilityFunctions.js';
import { OrderStatus, OrderPaymentStatus } from '../utilities/constants.js';

class EmployeeController {
    static getAllOrders = async (req, res) => {
        let { startDate, endDate } = res.locals.params
        let countParams = Object.keys(res.locals.params).length

        if (startDate === undefined && endDate === undefined && countParams === 0) {
            const today = new Date()
            const parts = today.toJSON().split('T')
            startDate = parts[0]
            endDate = parts[0]
            countParams += 2
        }

        if (startDate !== undefined && endDate !== undefined && countParams === 2) {
            const rangeDate = getRangeDate(startDate, endDate)
            const orderList = await Order.getAllByDate(rangeDate.start.toJSON(), rangeDate.end.toJSON())
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
        } else {
            res.send({ status: 400, message: "Params is invalid" })
        }
    }

    static verifyOrder = async (req, res) => {
        const payload = res.locals.payload  // { orderId, status }
        const [order] = await Order.getByOrderId(payload.orderId)

        if (order === undefined)
            res.send({ status: 404, message: "This order does not exist" })
        else if (order.status !== OrderStatus.PENDING)
            res.send({ status: 406, message: "This action is not acceptable" })
        else {
            let status = payload.status
            if (status === OrderStatus.ACCEPTED && order.isPaid === OrderPaymentStatus.PAID)
                status = OrderStatus.DELIVERY

            const updateStatus = await order.update(["status"], [status])
            res.send({ status: 200 })
        }
    }
}

export default EmployeeController
