import { Divider, Modal } from "antd";
import React from "react";
import "../../../../assets/css/layouts/profile/OrderHistoryModal.css";
import ProductTable from "../../../../components/Product/ProductTable";
import { UserProfileEventsHandler } from "../../../../Events";
// import PropTypes from 'prop-types';

OrderHistoryModal.propTypes = {};

function OrderHistoryModal(props) {
    const { isVisible, data } = props;
    if (!data) return <div></div>;

    const handleCancel = () => UserProfileEventsHandler.trigger("toggleOrderHistoryModal");

    const tableRecords = data.products.map((item) => {
        return {
            key: item.id,
            product: item.name,
            price: { price: item.price },
            quantity: item.quantity,
            total: item.price * item.quantity,
        };
    });

    const totalPrice = tableRecords.reduce((accumulator, current) => {
        return accumulator + current.total;
    }, 0);

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
                    <div className="order-modal-section__item">
                        <span>Payment method:</span>
                        <span>COD</span>
                    </div>

                    <div className="order-modal-section__item">
                        <span>Price:</span>
                        <span>{totalPrice} VND</span>
                    </div>

                    <div className="order-modal-section__item">
                        <span>Shipping fee:</span>
                        <span>{data.order.deliveryFee} VND</span>
                    </div>

                    <div className="order-modal-section__item">
                        <span>Total price:</span>
                        <span style={{ fontSize: "1.2rem", color: "#f00" }}>
                            {totalPrice + data.order.deliveryFee} VND
                        </span>
                    </div>

                    <div className="order-modal-section__item tag">
                        <span>Status:</span>
                        <div className="status-tag">
                            <span id={`${content.toLowerCase()}`}>{content}</span>
                        </div>
                    </div>

                    {data.order.status === 0 ? (
                        <div className="order-modal-section__item">
                            <span style={{ color: "#f00" }}>
                                (*){" "}
                                <i>
                                    If you want to cancel this order, please click to the Cancel
                                    button.
                                </i>
                            </span>
                            <button id="order-modal-cancel">Cancel</button>
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
