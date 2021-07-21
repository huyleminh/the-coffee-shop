import { Layout, Radio, Space } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import "../../../assets/css/layouts/checkout/CheckoutPage.css";
import MenuImage from "../../../assets/images/menu.jpg";
import Hero from "../../../components/layouts/Hero";
// import PropTypes from "prop-types";
import ProductTable from "../../../components/Product/ProductTable";

const { Content } = Layout;

CheckoutPage.propTypes = {};

function CheckoutPage(props) {
    const history = useHistory();
    const data = [
        {
            key: "1",
            product: "Latte",
            price: {
                discount: 0.25,
                price: 100000,
            },
            quantity: "1",
            total: 75000,
            action: "remove",
        },
        {
            key: "2",
            product: "John Brown",
            price: {
                discount: 0.25,
                price: 100000,
            },
            quantity: "1",
            total: 75000,
            action: "remove",
        },
        {
            key: "3",
            product: "John Brown",
            price: {
                discount: 0.25,
                price: 100000,
            },
            quantity: "1",
            total: 75000,
            action: "remove",
        },
        {
            key: "4",
            product: "John Brown",
            price: {
                discount: 0.25,
                price: 100000,
            },
            quantity: "1",
            total: 75000,
            action: "remove",
        },
    ];

    // Handle items which are selected
    const handleDeleted = (key) => {
        console.log(key);
    };

    const handleBackToMenu = () => {
        history.push("/menu");
    }

    return (
        <Content>
            <Hero title="Checkout" image={MenuImage} />

            <div className="wrapper checkout">
                <div className="checkout__top">
                    <ProductTable
                        records={data}
                        pagination={{ position: ["bottomCenter"], pageSize: 10 }}
                        readonly
                        disabled
                        handleDeleted={handleDeleted}
                    />

                    <div className="checkout__right">
                        <h1>Information</h1>
                        <div className="checkout__information">
                            <div className="checkout__information-item">
                                <label>Full name</label>
                                <input type="text" name="fullname" placeholder="Full name" />
                            </div>

                            <div className="checkout__information-item">
                                <label>Phone</label>
                                <input type="text" name="phoneNumber" placeholder="Phone number" />
                            </div>

                            <div className="checkout__information-item">
                                <label>Address</label>
                                <input type="text" name="adress" placeholder="Address" />
                            </div>
                        </div>

                        <div className="checkout__payment">
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio>Cash on delivery</Radio>
                                    <Radio>Internet Banking</Radio>
                                    <Radio style={{ textTransform: "uppercase" }}>
                                        Visa/Master Card
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </div>

                        <h1>Voucher</h1>
                        <div className="checkout__voucher">
                            <input
                                type="text"
                                name="voucher"
                                placeholder="Enter your voucher"
                            />
                            <button>Apply</button>
                        </div>

                        <div className="checkout__summary">
                            <div className="checkout__summary-item">
                                <span>Total:</span>
                                <span>150000 VND</span>
                            </div>
                            <div className="checkout__summary-item">
                                <span>Shipping fee:</span>
                                <span>10000 VND</span>
                            </div>
                            <div className="checkout__summary-item">
                                <span>Voucher:</span>
                                <span>- 0 VND</span>
                            </div>
                            <div className="checkout__summary-item total">
                                <span>Total price:</span>
                                <span style={{ color: "#f00" }}>160000 VND</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="checkout__buttons">
                    <button id="buy-more" onClick={handleBackToMenu}>&#60; Buy more</button>
                    <button id="confirm">Confirm</button>
                </div>
            </div>
        </Content>
    );
}

// bottomLeft, bottomRight

export default CheckoutPage;
