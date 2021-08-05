import { Divider, Modal } from "antd";
import PropTypes, { any } from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NotificationBox from "../../../components/NotificationBox";
import ProductTable from "../../../components/Product/ProductTable";
import EmployeeAPI from "../../../services/Employee/EmployeeAPI";
import { LoadingOutlined } from "@ant-design/icons";

OrderModal.propTypes = {
    visible: PropTypes.bool,
    data: any,
    toggleModal: PropTypes.func,
};

const orderStatus = [
    {
        key: 0,
        message: "Please click the Deny or Accept button to deny or accept this order.",
        buttons: ["Deny", "Accept"],
        keys: ["denied", "accepted"],
    },
    {
        key: 1,
        message: "If this order is ready to delivery, click the Delivery button.",
        buttons: ["Delivery"],
        keys: ["delivering"],
    },
    {
        key: 5,
        message: "If this order has been delivered, click the Done button.",
        buttons: ["Done"],
        keys: ["done"],
    },
];
Object.freeze(orderStatus);

function OrderModal(props) {
    const history = useHistory();
    const { visible, data, toggleModal } = props;
    const [isSending, setIsSending] = useState(false);
    if (!data) return <></>;

    const handleCancel = () => toggleModal();

    const handleVerifyOrder = (e) => {
        const target = e.target;
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
            alert("You are not allowed to access this page.");
            localStorage.removeItem("user");
            history.push("/403");
            return;
        }

        setIsSending(true);
        const orderId = data.order.id;
        const status = target.value === "Accept" ? 1 : target.value === "Deny" ? 2 : target.value === "Done" ? 3 : 5;

        EmployeeAPI.verifyOrderById(user.token, { orderId, status })
            .then((response) => {
                if (response.status === 200) {
                    setIsSending(false);
                    NotificationBox.triggerSuccess(
                        "VERIFY ORDER",
                        "Verify order successfully. The page will be reloaded after 1 seconds."
                    );
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else if (response.status === 401 || response.status === 403) {
                    setIsSending(false);
                    alert("You are not allowed to access this page.");
                    localStorage.removeItem("user");
                    history.push("/403");
                } else if (response.status === 404) {
                    setIsSending(false);
                    if (response.message === "This user does not exist") {
                        alert("You are not allowed to access this page.");
                        localStorage.removeItem("user");
                        history.push("/403");
                    } else {
                        alert(response.message);
                    }
                } else if (response.status === 406) {
                    setIsSending(false);
                    NotificationBox.triggerError("VERIFY ORDER", response.message);
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Someting went wrong.");
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
            content = "Delivering";
            break;
        default:
            content = "None";
            break;
    }

    const paidTag =
        data.order.isPaid === 0 ? "not-paid" : data.order.isPaid === 1 ? "paid" : "refunded";

    // To check whether any items have been removed.
    const removedItems = data.order.totalProducts - data.products.length;

    // Button tip at the bottom of the modal
    const tips = orderStatus
        .filter((item) => item.key === data.order.status)
        .map((item) => {
            return (
                <div className="order-modal-section__item tip" key={`tip${item.key.toString()}`}>
                    <span style={{ color: "#f00" }}>
                        (*) <i>{item.message}</i>
                    </span>
                    <div>
                        {item.buttons.map((btn, index) => (
                            <button
                                className="order-modal-btn"
                                id={`order-modal-${item.keys[index]}`}
                                key={btn}
                                value={btn}
                                onClick={handleVerifyOrder}
                            >
                                {isSending ? <LoadingOutlined spin /> : btn}
                            </button>
                        ))}
                    </div>
                </div>
            );
        });

    return (
        <Modal
            title="Order details"
            visible={visible}
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
                        <span>{data.order.totalPrice} VND</span>
                    </div>

                    <div className="order-modal-section__item">
                        <span>Shipping fee:</span>
                        <span>{data.order.deliveryFee} VND</span>
                    </div>

                    <div className="order-modal-section__item">
                        <span>Total price:</span>
                        <span style={{ fontSize: "1.2rem", color: "#f00" }}>
                            {data.order.totalPrice + data.order.deliveryFee} VND
                        </span>
                    </div>

                    <div className="order-modal-section__item tag">
                        <span>Status:</span>
                        <div className="status-tag">
                            <span id={`${content.toLowerCase()}`}>{content}</span>
                        </div>
                    </div>

                    {tips.map((tip) => tip)}
                </div>
            </div>
        </Modal>
    );
}

export default OrderModal;
