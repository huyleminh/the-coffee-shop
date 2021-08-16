import { Divider, Modal } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../../../assets/css/layouts/profile/OrderHistoryModal.css";
import ProductTable from "../../../../components/Product/ProductTable";
import { UserProfileEventsHandler } from "../../../../Events";
import UserAPI from "../../../../services/User/UserAPI";
import NotificationBox from "../../../../components/NotificationBox";
import { LoadingOutlined } from "@ant-design/icons";
import Format from "../../../../utilities/Format/Format";

function OrderHistoryModal(props) {
    const { isVisible, data } = props;
    const history = useHistory();
    const [isSending, setIsSending] = useState(false);
    if (!data) return <div></div>;

    const handleCancel = () => UserProfileEventsHandler.trigger("toggleOrderHistoryModal");

    const handleCancelOrder = () => {
        const productId = data.order.id;
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
            alert("You are not allowed to access this page.");
            history.push("/403");
            return;
        }

        setIsSending(true);
        UserAPI.cancelOrder(user.token, productId)
            .then((res) => {
                if (res.status === 200) {
                    setIsSending(false);
                    NotificationBox.triggerSuccess(
                        "CANCEL ORDER",
                        "Cancel order successfully. The page will be reloaded after 2.5 seconds."
                    );
                    setTimeout(() => {
                        window.location.reload();
                    }, 2500);
                } else if (res.status === 401 || res.status === 403) {
                    setIsSending(false);
                    alert("You are not allowed to access this page.");
                    localStorage.removeItem("user");
                    history.push("/403");
                } else if (res.status === 404) {
                    setIsSending(false);
                    alert(res.message);
                    localStorage.removeItem("user");
                    history.push("/404");
                } else if (res.status === 406) {
                    setIsSending(false);
                    NotificationBox.triggerError(
                        "CANCEL ORDER",
                        "This order can not be cancelled. The employee has already confirmed it."
                    );
                    setTimeout(() => {
                        window.location.reload();
                    }, 2500);
                } else {
                    alert("Something went wrong.");
                    setIsSending(false);
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Something went wrong.");
                setIsSending(false);
            });
    };

    const tableRecords = data.products.map((item) => {
        return {
            key: item.id,
            product: item.name,
            price: { price: item.price },
            quantity: item.quantity,
            total: item.price * item.quantity,
        };
    });

    let content = data.order.status ? "" : "None";
    switch (data.order.status) {
        case 0:
            content = "Pending";
            break;
        case 1:
            content = "Accepted";
            break;
        case 2:
            content = "Denied";
            break;
        case 3:
            content = "Done";
            break;
        case 4:
            content = "Cancelled";
            break;
        case 5:
            content = "Delivery";
            break;
        default:
            content = "None";
            break;
    }

    const paidTag =
        data.order.isPaid === 0 ? "not-paid" : data.order.isPaid === 1 ? "paid" : "refunded";

    const removedItems = data.order.totalProducts - data.products.length;

    return (
        <Modal
            title="Order details"
            visible={isVisible}
            width={800}
            onCancel={handleCancel}
            style={{ borderRadius: "8px" }}
            footer={
                <button className="order-modal-btn" onClick={handleCancel}>
                    Close
                </button>
            }
        >
            <div className="order-modal">
                <h1 className="order-modal-title">Shipping information:</h1>
                <div className="order-modal-section">
                    <div className="order-modal-section__item">
                        <span>Fullname:</span>
                        <span>{data.receiver.fullname}</span>
                    </div>
                    <div className="order-modal-section__item">
                        <span>Phone number:</span>
                        <span>{data.receiver.phoneNumber}</span>
                    </div>
                    <div className="order-modal-section__item">
                        <span>Address:</span>
                        <span>{data.receiver.address.replaceAll(/&&/g, " ")}</span>
                    </div>
                </div>

                <Divider />
                <h1 className="order-modal-title">Products list:</h1>
                <ProductTable
                    records={tableRecords}
                    hiddens={["image", "action"]}
                    readonly
                    disabled
                    pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                />

                <h1 className="order-modal-title">Others information:</h1>
                <div className="order-modal-section">
                    {removedItems > 0 ? (
                        <div className="order-modal-section__item">
                            <span style={{ color: "#f00", fontStyle: "italic" }}>
                                (*) There are {removedItems}/{data.order.totalProducts} products
                                that no longer existed.
                            </span>
                        </div>
                    ) : (
                        <></>
                    )}

                    <div className="order-modal-section__item">
                        <span>Payment method:</span>
                        <span>
                            {data.order.payMethod === 0
                                ? "Cash on delivery"
                                : data.order.payMethod === 1
                                ? "VISA/MASTER CARD"
                                : "Internet Banking"}
                        </span>
                    </div>

                    <div className="order-modal-section__item tag">
                        <span>Pay status:</span>
                        <div className="status-tag">
                            <span id={paidTag}>
                                {data.order.isPaid === 0
                                    ? "Not Paid"
                                    : data.order.isPaid === 1
                                    ? "Paid"
                                    : "Refunded"}
                            </span>
                        </div>
                    </div>

                    <div className="order-modal-section__item">
                        <span>Price:</span>
                        <span>{Format.formatPriceWithVND(data.order.totalPrice)} VND</span>
                    </div>

                    <div className="order-modal-section__item">
                        <span>Shipping fee:</span>
                        <span>{Format.formatPriceWithVND(data.order.deliveryFee)} VND</span>
                    </div>

                    <div className="order-modal-section__item">
                        <span>Total price:</span>
                        <span style={{ fontSize: "1.2rem", color: "#f00" }}>
                            {Format.formatPriceWithVND(data.order.totalPrice + data.order.deliveryFee)} VND
                        </span>
                    </div>

                    <div className="order-modal-section__item tag">
                        <span>Status:</span>
                        <div className="status-tag">
                            <span id={`${content.toLowerCase()}`}>{content}</span>
                        </div>
                    </div>

                    {data.order.status === 0 ? (
                        <div className="order-modal-section__item tip">
                            <span style={{ color: "#f00" }}>
                                (*){" "}
                                <i>
                                    If you want to cancel this order, please click to the Cancel
                                    button.
                                </i>
                            </span>
                            <button onClick={handleCancelOrder} className="order-modal-btn" id="order-modal-cancel">
                                {isSending ? <LoadingOutlined spin /> : "Cancel"}
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </Modal>
    );
}

export default OrderHistoryModal;
