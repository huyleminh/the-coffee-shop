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
import ProductItem from "../MenuPage/Product/ProductItem";
import CartAPI from "../../../services/Cart/CartAPI.js";
import { Storage } from "../../../utilities/firebase/FirebaseConfig.js";
const { Content } = Layout;

// Handle items which are selected

function CartLayout() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [itemToBuy, setItemToBuy] = useState([]);
    const [totalMoney, setTotalMoney] = useState(0);
    const [images, setImages] = useState([]);

    const [cart, setCart] = useState(() => {
        const cartLocal = JSON.parse(localStorage.getItem("cart"));
        return cartLocal ? cartLocal : [];
    });

    const handleGoMenu = () => {
        history.push("/menu");
    };

    const handleCheckout = () => {
        history.push("/checkout");
    };

    // const handleRemoveItem = (key) => {
    //     setIsSending(true);
    //     setSelectedItem([key]);
    //     setIsRemoving(true);
    //     setIsSending(false);
    // };

    const handleSelected = (keys) => {
        for (let i = 0; i < 1; i++) {
            setSelectedItem([keys]);
        }
        //setSelectedItem([keys]);
        console.log(selectedItem);
    };

    const handleToBuyItem = () => {
        let tempTotalMoney = 0;
        let tempItemToBuy = [];
        for (let item of cart) {
            if (Number(item["quantity"]) > 0) {
                tempTotalMoney += item["total"];
                tempItemToBuy.push(item);
            }
        }
        setTotalMoney(tempTotalMoney);
        setItemToBuy(tempItemToBuy);
    };

    const handleQuantity = (item, value) => {
        // console.log("ITEM: ", item);
        // const cloneData = [...cart];
        // console.log("CLONE DATA: ", cloneData);
        // handleToBuyItem();
        // for (let clone of cloneData) {
        //     console.log(clone["product"]["id"]);
        //     console.log(item["key"]);
        //     if (clone["product"]["id"] === item["key"]) {
        //         console.log(clone["id"]);
        //         const base =
        //             clone["product"]["price"] -
        //             clone["product"]["price"] * clone["discount"]["percent"];
        //         console.log(base);
        //         setTotalMoney(totalMoney - clone["total"]);
        //         clone["quantity"] = value;
        //         clone["total"] = base * value;
        //         setTotalMoney(totalMoney + clone["total"]);
        //         if (value > 0) {
        //             let tempToBuy = itemToBuy;
        //             console.log("CLONE KEY: ", clone["key"]);
        //             console.log("TO BUY: ", itemToBuy);
        //             console.log("TEMP SELECTED: ", tempToBuy);
        //         }
        //     }
        // }
        // setCart(cloneData);
    };

    // const removeSelectedItem = () => {
    //     console.log("CART: ", cart);
    //     //console.log("CART TABLE: ", cartTable);

    //     const newCart = [];
    //     const removeItem = [];
    //     let isModified = false;
    //     let isDeleted = false;

    //     console.log("SELECTED: ", selectedItem);
    //     for (let item of cart) {
    //         isDeleted = false;
    //         for (let key of selectedItem[0]) {
    //             console.log(item);
    //             if (item["key"] === key) {
    //                 isModified = true;
    //                 removeItem.push(item);
    //                 isDeleted = true;
    //             }
    //         }
    //         if (!isDeleted) {
    //             newCart.push(item);
    //         }
    //     }
    //     console.log("NEW CART: ", newCart);

    //     if (isModified) {
    //         setCart(newCart);
    //     }
    // };
    const handleRemoveItem = (key) => {
        setIsSending(true);
        // setSelectedItem([key]);
        // setIsRemoving(true);
        removeSelectedItem([key]);
    };

    const removeSelectedItem = async (params) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const cart = JSON.parse(localStorage.getItem("cart"));
        const newCart = [];
        const removeItem = [];
        let isDeleted = false;
        let deleted = false;
        for (let item of cart) {
            deleted = false;
            for (let key of params) {
                if (item["product"]["id"] === key) {
                    isDeleted = true;
                    removeItem.push(item);
                    deleted = true;
                }
            }
            if (!deleted) {
                newCart.push(item);
            }
        }

        if (!user || !user.token) {
            localStorage.removeItem("user");
            if (isDeleted) {
                alert("Remove successfully.");
                localStorage.setItem("cart", JSON.stringify(newCart));
                setCart(newCart);
                setIsSending(false);
            }
        } else {
            try {
                const removeItemPromise = removeItem.map((item) => {
                    return CartAPI.deleteProduct(user.token, item.product.id);
                });
                const response = await Promise.all(removeItemPromise);
                let countNotExist = 0;
                for (let item of response) {
                    if (item.status === 200) {
                        console.log("success");
                    } else if (item.status === 404) {
                        if (item.message === "This user does not exist") {
                            localStorage.removeItem("user");
                        } else {
                            console.log(item.message);
                            countNotExist += 1;
                        }
                    } else if (item.status === 401 || item.status === 403) {
                        localStorage.removeItem("user");
                    }
                }
                if (isDeleted) {
                    alert("Remove successfully.");
                    if (countNotExist !== 0) {
                        alert(`${countNotExist} item(s) does not exist in your cart.`);
                    }
                    localStorage.setItem("cart", JSON.stringify(newCart));
                    setCart(newCart);
                    setIsSending(false);
                }
            } catch (error) {
                console.log(error);
                alert("Something went wrong.");
            }
        }
    };

    const handleRemoveSelected = () => {
        if (selectedItem.length === 0) {
            alert("No item is being selected.\nPlease select item(s) and try again.");
        } else {
            setIsSending(true);
            // setIsRemoving(true);
            removeSelectedItem(selectedItem);
            setSelectedItem([]);
        }
    };

    const handleAction = (key) => {
        //ProductItem.handleAddToWishlist();
        alert("ADDED TO WISHLIST (FAKE)");
    };

    // const handleRemoveSelected = () => {
    //     if (selectedItem.length === 0) {
    //         alert("No item is being selected.\nPlease select item(s) and try again.");
    //     } else {
    //         setIsSending(true);
    //         setIsRemoving(true);
    //         setIsSending(false);
    //     }
    // };

    useEffect(() => {
        const fetchCart = async () => {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user || !user.token) {
                localStorage.removeItem("user");
                setIsLoading(false);
            } else {
                try {
                    const response = await CartAPI.getCart(user.token);
                    if (response.status === 200) {
                        const resCart = response.data;
                        setCart(resCart);
                        localStorage.setItem("cart", JSON.stringify(resCart));
                    } else {
                        localStorage.removeItem("user");
                        const cartLocal = localStorage.getItem("cart");
                        setCart(cartLocal ? cartLocal : []);
                    }
                } catch (error) {
                    alert("Something went wrong.");
                }
            }
        };

        fetchCart();
        handleSelected();
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            const imagePromises = cart.map((item) => {
                const image = item.product.image ? item.product.image : "latte.jpg";
                return Storage.ref(`products/${image}`).getDownloadURL();
            });

            const images = await Promise.all(imagePromises);
            setImages(images);
            setIsLoading(false);
        };

        fetchImages();
    }, [cart]);

    useEffect(() => {
        if (isRemoving) {
            setIsLoading(true);
            removeSelectedItem();
            setIsRemoving(false);
            setSelectedItem([]);
            setIsLoading(false);
        }
    }, [isRemoving]);

    // useEffect(() => {
    //     handleToBuyItem();
    // }, [cart]);

    const cartTable = cart.map((item, index) => {
        const price = {
            discount: item.discount ? item.discount.percent : 0,
            price: item.product.price,
        };
        const total = item.quantity * (price.price * (1 - price.discount));

        return {
            key: item.product.id,
            product: item.product.name,
            image: {
                src: images[index],
                width: "100px",
                height: "100px",
            },
            price,
            quantity: item.quantity,
            total,
            action: "wishlist",
        };
    });

    return (
        <Content>
            <Hero title="MY CART" image={CartImage} />
            <div className="wrapper wishlist">
                <div className="command_bar_cart">
                    <div className="cmd_item_cart">
                        {isSending ? <LoadingOutlined spin /> : <span></span>}
                    </div>
                    <div className="cmd_item_cart">
                        <span>{selectedItem.length} item(s) selected</span>
                    </div>
                    <div className="cmd_item_cart" title="Remove selected item(s) from cart">
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
                            records={cartTable}
                            pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                            handleSelected={handleSelected}
                            handleDeleted={handleRemoveItem}
                            handleQuantity={handleQuantity}
                            handleAction={handleAction}
                        />
                    </>
                )}
                <div>
                    <button className="btn_go_menu" onClick={handleGoMenu}>
                        VISIT MENU
                    </button>
                </div>
                <div className="bottomRight__totalCheckout__cart ">
                    <div className="totalMoney">TOTAL MONEY: {totalMoney} </div>
                    <div className="cmd_item_checkout" title="Go to checkout">
                        <button className="btn_checkout_cart" onClick={handleCheckout}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default CartLayout;
