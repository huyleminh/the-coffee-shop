import Order from '../utilities/database/entities/Order.js'
import ProductOrder from '../utilities/database/entities/ProductOrder.js'
import { OrderStatus, OrderPaymentStatus } from '../utilities/constants.js';

class EmployeeController {
    static getAllOrders = async (req, res) => {
        let { startDate, endDate } = res.locals.params
        let countParams = Object.keys(res.locals.params).length

        if (startDate === undefined && endDate === undefined && countParams === 0) {
            const today = new Date();
            const parts = today.toJSON().split('T');
            startDate = parts[0];
            endDate = parts[0];
            countParams += 2;
        }

        if (startDate !== undefined && endDate !== undefined && countParams === 2) {
            const orderList = await Order.getAllByDate(startDate, endDate)
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
        let orderStatus, paymentStatus;  // undefined

        if (order === undefined) {
            res.send({ status: 404, message: "This order does not exist" });
            return;
        }

        if (
            order.status === OrderStatus.PENDING &&
            (payload.status === OrderStatus.ACCEPTED || payload.status === OrderStatus.DENIED)
        ) {
            orderStatus = payload.status
            if (orderStatus === OrderStatus.DENIED && order.isPaid === OrderPaymentStatus.PAID)
                paymentStatus = OrderPaymentStatus.REFUND;
        }
        else if (order.status === OrderStatus.ACCEPTED)
            orderStatus = OrderStatus.DELIVERY;
        else if (order.status === OrderStatus.DELIVERY) {
            paymentStatus = OrderPaymentStatus.PAID;
            orderStatus = OrderStatus.DONE;
        }

        if (orderStatus === undefined)
            res.send({ status: 406, message: "This action is not acceptable" });
        else {
            const keys = ["status"]
            const values = [orderStatus]
            if (paymentStatus !== undefined) {
                keys.push("isPaid");
                values.push(paymentStatus);
            }

            const updateStatus = await order.update(keys, values);
            res.send({ status: 200 });
        }
    }
}

export default EmployeeController
