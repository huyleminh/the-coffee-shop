import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import Hero from "../../../components/layouts/Hero";
import backgroundImage from "../../../assets/images/menu.jpg";
import ProductTable from "../../../components/Product/ProductTable";
import "../../../assets/css/layouts/cart/CartLayout.css";
import { useHistory } from "react-router-dom";
import Loading from "../../../components/Loading";
const { Content } = Layout;

// Handle items which are selected

function CartLayout() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);
    const [isSending, setIsSending] = useState(false);

    const [numberOfSelected, setNumberOfSelected] = useState(0);

    let totalMoney = 0;
    //const [images, setImages] = useState([]);

    const [cart, setCart] = useState([
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
        {
            key: "5",
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
            key: "6",
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
            key: "7",
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
            key: "8",
            product: "John Brown",
            price: {
                discount: 0.25,
                price: 100000,
            },
            quantity: "1",
            total: 75000,
            action: "remove",
        },
    ]);

    const handleGoHome = () => {
        history.push("/menu");
    };

    const handleRemoveItem = (key) => {
        console.log(key);
        const removeItem = () => {
            const newCart = [];
            for (let item of cart) {
                console.log(item);
                if (item["product"]["id"] !== key) {
                    newCart.push(item);
                }
            }
            console.log(newCart);
            setCart(newCart);
        };

        removeItem();
    };

    const handleRemoveSelected = () => {
        console.log(selectedItem);

        const removeSelectedItem = () => {
            const tempCart = cart;
            const removeItem = [];
            let isDeleted = false;
            for (let item of cart) {
                for (let key of selectedItem) {
                    isDeleted = false;
                    if (item["product"]["id"] === key) {
                        removeItem.push(item);
                        isDeleted = true;
                    }
                    if (!isDeleted) {
                        tempCart.push(item);
                    }
                }
                console.log(removeItem);
                console.log(tempCart);
            }
            setCart(tempCart);
        };
        removeSelectedItem();
        setNumberOfSelected(0);
    };

    const handleSelected = (products, rows) => {
        let count = 0;
        for (let i in products) {
            count++;
            console.log(i);
            console.log(products);
        }
        setNumberOfSelected(count);
        setSelectedItem(products);
    };

    const handleQuantity = (item, value) => {
        console.log(item);

        const cloneData = [...cart];

        for (let i in cloneData) {
            if (cloneData[i]["key"] === item["key"]) {
                cloneData[i]["quantity"] = value;
                break;
            }
        }
        setCart(cloneData);
    };

    useEffect(() => {
        setIsLoading(false);
    }, [cart]);

    return (
        <Content>
            <Hero title="MY CART" image={backgroundImage} />
            <div className="wrapper cart">
                <div className="cart__top">
                    <div className="cart__topRight">
                        <span className="numberOfItems"> {numberOfSelected} Item(s)</span>
                        <button className="CartRemoveButton" onClick={handleRemoveSelected}>
                            Remove
                        </button>
                    </div>
                    {isLoading ? (
                        <Loading
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        />
                    ) : (
                        <>
                            <ProductTable
                                records={cart}
                                pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                                handleSelected={handleSelected}
                                handleDeleted={handleRemoveItem}
                                handleQuantity={handleQuantity}
                            />
                        </>
                    )}
                    {/* <ProductTable
                        records={cart}
                        pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                        handleDeleted={handleDeleted}
                        handleQuantity={handleQuantity}
                        handleSelected={handleSelected}
                        handleRemoveItem={handleRemoveItem}
                        handleRemoveAll={handleRemoveAll}
                    ></ProductTable> */}
                </div>
            </div>
            <div className="cart__bottom">
                <span className="cart__bottom__returnAndTotal">
                    <button className="CartBuyMoreButton" onClick={handleGoHome}>
                        Buy More
                    </button>
                    <text className="TotalPrice">TOTAL PRICE: {totalMoney} đ</text>
                </span>
            </div>
        </Content>
    );
}
export default CartLayout;
