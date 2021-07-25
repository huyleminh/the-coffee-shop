import { Layout, Radio, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../../assets/css/layouts/checkout/CheckoutPage.css";
import MenuImage from "../../../assets/images/menu.jpg";
import Hero from "../../../components/layouts/Hero";
import Loading from "../../../components/Loading";
import ProductTable from "../../../components/Product/ProductTable";
import CheckoutAPI from "../../../services/Checkout/CheckoutAPI";
import CheckoutWorkflow from "../../../workflow/CheckoutWorkflow";
import { LoadingOutlined } from "@ant-design/icons";

const { Content } = Layout;

const VOUCHER = {
    freeship: 10000,
    member: 15000,
};

function CheckoutPage() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [payment, setPayment] = useState("cod");
    const [voucher, setVoucher] = useState("");
    const [isSending, setIsSending] = useState(false);

    let totalPrice = 0;
    const checkoutList = JSON.parse(localStorage.getItem("checkout"));
    const records = checkoutList.map((item) => {
        const record = {
            key: item.product.id,
            product: item.product.name,
            quantity: item.quantity,
            price: {
                discount: null,
                price: item.product.price,
            },
            total: 0,
        };

        // if the discount is valid
        if (item.discount) {
            const endDate = new Date(item.discount.endDate).toISOString();
            const now = new Date().toISOString();

            if (endDate > now) {
                record.price.discount = item.discount.percent;
                record.total = (1 - record.price.discount) * record.price.price * record.quantity;
            } else record.total = record.price.price * record.quantity;
        } else record.total = record.price.price * record.quantity;

        totalPrice += record.total;
        return record;
    });

    // Discount from vouchers
    const discountFee =
        totalPrice - VOUCHER[voucher.toLowerCase()] ? VOUCHER[voucher.toLowerCase()] : 0;

    const handleChangePayment = (e) => {
        const target = e.target;
        setPayment(target.value);
    };

    const handleChangeVoucher = (e) => {
        const target = e.target;
        setVoucher(target.value);
    };

    const handleChangeInfo = (e) => {
        const target = e.target;
        const prev = { ...userInfo, [target.name]: target.value };
        setUserInfo(prev);
    };

    // Handle items which are selected
    const handleDeleted = (key) => {
        console.log(key);
    };

    const handleBackToMenu = () => {
        history.push("/menu");
    };

    const handleConfirmCheckout = async () => {
        setIsSending(true);
        const products = records.map((record) => {
            return { id: record.key, quantity: record.quantity, price: record.price.price };
        });

        const flow = new CheckoutWorkflow({ ...userInfo, payment, products });
        const res = await flow.startFlow();
        if (res.status === 200) {
            setIsSending(false);
            alert(res.statusText);
            history.push("/menu");
        } else if (res.status === 400) {
            setIsSending(false);
            alert(res.statusText);
        } else if (res.status === 403) {
            alert(res.statusText);
            history.push("/login");
        } else if (res.status === 404) {
            alert(
                res.statusText + " Please comeback to your cart and start creating an order again."
            );
            history.push("/cart");
        }
    };

    useEffect(() => {
        const fetchUsertInformation = async () => {
            const token = JSON.parse(localStorage.getItem("user")).token;
            try {
                const response = await CheckoutAPI.getUserInformation(token);
                if (response.status === 200) {
                    const dataUser = response.data;
                    dataUser.address = dataUser.address.replaceAll(/&&/g, ", ");
                    setUserInfo(dataUser);
                    setIsLoading(false);
                } else if (response.status === 404) {
                    alert("Can not find your information.");
                    history.push("/404");
                } else if (response.status === 401 || response.status === 403) {
                    alert("You are not logged in, please login again.");
                    history.push("/login");
                }
            } catch (error) {
                console.log(error);
                alert("Something went wrong. You will be automatically redirected to the menu.");
                history.push("/menu");
            }
        };

        fetchUsertInformation();
    }, [history]);

    return (
        <Content>
            <Hero title="Checkout" image={MenuImage} />

            <div className="wrapper checkout">
                <div className="checkout__top">
                    <ProductTable
                        records={records}
                        pagination={{ position: ["bottomCenter"], pageSize: 10 }}
                        readonly
                        disabled
                        hiddens={["image", "action"]}
                        handleDeleted={handleDeleted}
                    />
                    <div className="checkout__right">
                        <h1>Shipping Information</h1>
                        {isLoading ? (
                            <Loading
                                style={{
                                    widht: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    juistifyContent: "center",
                                }}
                                tip="Loading your information, please wait for a moment..."
                            />
                        ) : (
                            <div className="checkout__information">
                                <div className="checkout__information-item">
                                    <label>Receiver</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={userInfo.name}
                                        placeholder="Full name"
                                        onChange={handleChangeInfo}
                                    />
                                </div>

                                <div className="checkout__information-item">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={userInfo.phoneNumber}
                                        placeholder="Phone number"
                                        onChange={handleChangeInfo}
                                    />
                                </div>

                                <div className="checkout__information-item">
                                    <label>Address</label>
                                    <textarea
                                        type="text"
                                        name="address"
                                        value={userInfo.address}
                                        placeholder="Address"
                                        onChange={handleChangeInfo}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="checkout__payment">
                            <Radio.Group value={payment} onChange={handleChangePayment}>
                                <Space direction="vertical">
                                    <Radio value="cod">Cash on delivery</Radio>
                                    <Radio value="e-banking">Internet Banking</Radio>
                                    <Radio style={{ textTransform: "uppercase" }} value="card">
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
                                value={voucher}
                                placeholder="Enter your voucher"
                                onChange={handleChangeVoucher}
                                disabled
                            />
                            <button>Apply</button>
                        </div>

                        <div className="checkout__summary">
                            <div className="checkout__summary-item">
                                <span>Total:</span>
                                <span>{totalPrice} VND</span>
                            </div>
                            <div className="checkout__summary-item">
                                <span>Shipping fee:</span>
                                <span>10000 VND</span>
                            </div>
                            <div className="checkout__summary-item">
                                <span>Voucher:</span>
                                <span>- {discountFee} VND</span>
                            </div>
                            <div className="checkout__summary-item total">
                                <span>Total price:</span>
                                <span style={{ color: "#f00" }}>
                                    {totalPrice - discountFee} VND
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="checkout__buttons">
                    <button id="buy-more" onClick={handleBackToMenu}>
                        &#60; Buy more
                    </button>
                    <button id="confirm" onClick={handleConfirmCheckout}>
                        {isSending ? <LoadingOutlined spin /> : "Confirm"}
                    </button>
                </div>
            </div>
        </Content>
    );
}

export default CheckoutPage;
