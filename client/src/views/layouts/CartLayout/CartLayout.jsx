import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import Hero from "../../../components/layouts/Hero";
import ProductTable from "../../../components/Product/ProductTable";
import "../../../assets/css/layouts/cart/CartLayout.css";
import { useHistory } from "react-router-dom";
import Loading from "../../../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingOutlined } from "@ant-design/icons";
import CartImage from "../../../assets/images/landing-hero.jpg";
const { Content } = Layout;

// Handle items which are selected

function CartLayout() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const [numberOfSelected, setNumberOfSelected] = useState(0);

    let totalMoney = 0;
    //const [images, setImages] = useState([]);

    const [cart, setCart] = useState([
        {
            id: "1",
            product: "Latte",
            price: {
                discount: 0.25,
                price: 100000,
            },
            quantity: "1",
            total: 75000,
            action: "wishlist",
        },
        {
            key: "2",
            product: "John Brown 1",
            price: {
                discount: 0.25,
                price: 100000,
            },
            quantity: "1",
            total: 75000,
            action: "wishlist",
        },
        {
            key: "3",
            product: "John Brown 2",
            price: {
                discount: 0.25,
                price: 100000,
            },
            quantity: "1",
            total: 75000,
            action: "wishlist",
        },
        {
            key: "4",
            product: "John Brown 3",
            price: {
                discount: 0.25,
                price: 100000,
            },
            quantity: "1",
            total: 75000,
            action: "wishlist",
        },
        {
            key: "5",
            product: "John Brown 4",
            price: {
                discount: 0.25,
                price: 100000,
            },
            quantity: "1",
            total: 75000,
            action: "wishlist",
        },
        {
            key: "6",
            product: "John Brown 5",
            price: {
                discount: 0.25,
                price: 100000,
            },
            quantity: "1",
            total: 75000,
            action: "wishlist",
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
            action: "wishlist",
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
            action: "wishlist",
        },
    ]);

    const handleGoMenu = () => {
        history.push("/menu");
    };

    const handleRemoveItem = (key) => {
        setIsSending(true);
        setSelectedItem([key]);
        setIsRemoving(true);
        setIsSending(false);
    };

    const handleSelected = (keys) => {
        console.log("keys: ", keys);
        setSelectedItem(keys);
    };

    const handleQuantity = (item, value) => {
        console.log(item);

        const cloneData = [...cart];
        for (let clone of cloneData) {
            if (clone["key"] === item["key"]) {
                clone["quantity"] = value;
                break;
            }
        }
        setCart(cloneData);
    };

    const removeSelectedItem = () => {
        const newCart = [];
        const removeItem = [];
        let isModified = false;
        let isDeleted = false;
        console.log("CART: ", cart);
        console.log("SELECTED: ", selectedItem);
        for (let item of cart) {
            isDeleted = false;
            for (let key of selectedItem) {
                console.log(item);
                if (item["key"] === key) {
                    isModified = true;
                    removeItem.push(item);
                    isDeleted = true;
                }
            }
            if (!isDeleted) {
                newCart.push(item);
            }
        }
        console.log("NEW CART: ", newCart);

        if (isModified) {
            setCart(newCart);
        }
    };

    const handleRemoveAction = (key) => {
        console.log("action: ", key);
    };

    const handleRemoveSelected = () => {
        if (selectedItem.length === 0) {
            alert("No item is being selected.\nPlease select item(s) and try again.");
        } else {
            setIsSending(true);
            setIsRemoving(true);
            setIsSending(false);
        }
    };

    useEffect(() => {
        if (isRemoving) {
            setIsLoading(true);
            removeSelectedItem();
            setIsRemoving(false);
            setSelectedItem([]);
            setIsLoading(false);
        }
    }, [isRemoving]);

    return (
        <Content>
            <Hero title="MY CART" image={CartImage} />
            <div className="wrapper wishlist">
                <div className="command_bar">
                    <div className="cmd_item">
                        {isSending ? <LoadingOutlined spin /> : <span></span>}
                    </div>
                    <div className="cmd_item">
                        <span>{selectedItem.length} item(s) selected</span>
                    </div>
                    <div className="cmd_item" title="Add selected item(s) to cart">
                        <button className="btn_cart_selected">Checkout</button>
                    </div>
                    <div className="cmd_item" title="Remove selected item(s) from wishlist">
                        <button className="table-deleted" onClick={handleRemoveSelected}>
                            Remove
                        </button>
                    </div>
                </div>
                {isLoading ? (
                    <Loading
                        style={{
                            wkeyth: "100%",
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
                            handleAction={handleRemoveAction}
                        />
                    </>
                )}

                <div>
                    <button className="btn_go_menu" onClick={handleGoMenu}>
                        VISIT MENU
                    </button>
                </div>
            </div>
        </Content>
    );
    // return (
    //     <Content>
    //         <Hero title="MY CART" image={backgroundImage} />
    //         <div className="wrapper cart">
    //             <div className="cart__top">
    //                 <div className="cart__topRight">
    //                     <span className="numberOfItems"> {numberOfSelected} Item(s)</span>
    //                     <button className="CartRemoveButton" onClick={handleRemoveSelected}>
    //                         Remove
    //                     </button>
    //                 </div>
    //                 {isLoading ? (
    //                     <Loading
    //                         style={{
    //                             wkeyth: "100%",
    //                             height: "100%",
    //                             display: "flex",
    //                             justifyContent: "center",
    //                             alignItems: "center",
    //                         }}
    //                     />
    //                 ) : (
    //                     <>
    //                         <ProductTable
    //                             records={cart}
    //                             pagination={{ position: ["bottomCenter"], pageSize: 5 }}
    //                             handleSelected={handleSelected}
    //                             handleDeleted={handleRemoveItem}
    //                             handleQuantity={handleQuantity}
    //                         />
    //                     </>
    //                 )}
    //             </div>
    //         </div>
    //         <div className="cart__bottom">
    //             <span className="cart__bottom__returnAndTotal">
    //                 <button className="CartBuyMoreButton" onClick={handleGoMenu}>
    //                     Buy More
    //                 </button>
    //                 <text className="TotalPrice">TOTAL PRICE: {totalMoney} đ</text>
    //             </span>
    //         </div>
    //     </Content>
    // );
}

export default CartLayout;
