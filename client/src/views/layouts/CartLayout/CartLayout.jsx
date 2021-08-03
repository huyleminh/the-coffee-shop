import { LoadingOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../../assets/css/layouts/cart/CartLayout.css";
import CartImage from "../../../assets/images/landing-hero.jpg";
import Hero from "../../../components/layouts/Hero";
import Loading from "../../../components/Loading";
import NotificationBox from "../../../components/NotificationBox";
import ProductTable from "../../../components/Product/ProductTable";
import CartAPI from "../../../services/Cart/CartAPI.js";
import { Storage } from "../../../utilities/firebase/FirebaseConfig.js";
import WishlistAPI from "../../../services/Wishlist/WishlistAPI";

const { Content } = Layout;

function CartLayout() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [totalMoney, setTotalMoney] = useState(0);
    const [images, setImages] = useState([]);
    const [isDisable, setIsDisable] = useState(false);

    const tappingQuantity = useRef(null);

    const [cart, setCart] = useState(() => {
        const cartLocal = JSON.parse(localStorage.getItem("cart"));
        return cartLocal ? cartLocal : [];
    });

    const cartTable = cart.map((item, index) => {
        let discount = 0;
        if (item.discount) {
            discount = item.discount.percent;
            const endDate = new Date(item.discount.endDate);
            if (Date.now() > endDate.valueOf()) discount = 0;
        }

        const price = { discount, price: item.product.price };
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

    const handleGoMenu = () => history.push("/menu");

    const handleCheckout = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.removeItem("user");
        }
        localStorage.setItem("checkout", JSON.stringify(cart));

        history.push("/checkout");
    };

    const handleSelected = (keys) => {
        setSelectedItem(keys);
    };

    const handleQuantity = (item, value) => {
        if (tappingQuantity.current) clearTimeout(tappingQuantity.current);

        const index = cartTable.findIndex((element) => element.key === item.key);
        cart[index].quantity = value;
        cartTable[index].quantity = value;
        cartTable[index].total =
            value * (cartTable[index].price.price * (1 - cartTable[index].price.discount));
        const totalMoneyTemp = cartTable.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.total;
        }, 0);

        setTotalMoney(totalMoneyTemp);
        setCart(cart);

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.removeItem("user");
        } else {
            tappingQuantity.current = setTimeout(async () => {
                try {
                    // notification: wait 3s
                    setIsDisable(true);

                    const response = await CartAPI.editCart(user.token, {
                        productId: item.key,
                        quantity: value,
                    });

                    setIsDisable(false);
                    if (response.status === 200) {
                        localStorage.setItem("cart", JSON.stringify(cart));
                        NotificationBox.triggerSuccess("SUCCESS", "Change quantity successfully");
                    } else {
                        if (
                            response.message !==
                            "There is at least one product that does not exist in your cart"
                        )
                            localStorage.removeItem("user");

                        NotificationBox.triggerError(
                            "CHANGE QUANTITY ERROR",
                            "Change quantity failed"
                        );
                    }
                } catch (error) {
                    NotificationBox.triggerError("ERROR", "Something went wrong");
                }
            }, 1000);
        }
    };

    const handleAddToWishlist = async (item) => {
        const itemID = item.key;
        const user = JSON.parse(localStorage.getItem("user"));
        const tempWishlistLocal = localStorage.getItem("wishlist")
            ? JSON.parse(localStorage.getItem("wishlist"))
            : [];
        console.log("ITEM: ", item);
        console.log("ITEM ID: ", itemID);
        console.log("WISHLIST LOCAL: ", tempWishlistLocal);
        console.log("USER: ", user);

        if (user && user.token) {
            const tempCart = CartAPI.getCart(user.token);
            console.log("CART: ", tempCart);
        }

        if (!user || !user.token) {
            const tempCartLocal = JSON.parse(localStorage.getItem("cart"))
                ? JSON.parse(localStorage.getItem("cart"))
                : [];
            console.log("CART LOCAL: ", tempCartLocal);
            for (let i of tempCartLocal) {
                if (i.product.id === itemID) {
                    for (let j of tempWishlistLocal) {
                        if (j.product.id === itemID) {
                            NotificationBox.triggerError(
                                "ITEM EXISTED IN WISHLIST",
                                `${i.product.name} added to your wishlist.`
                            );
                            return;
                        }
                    }
                    tempWishlistLocal.push(i);
                    localStorage.removeItem("user");
                    localStorage.setItem("wishlist", JSON.stringify([...tempWishlistLocal]));
                    //alert(`${card.name} added.`);
                    NotificationBox.triggerSuccess(
                        "ADDED ITEM TO WISHLIST",
                        `${i.product.name} added to your wishlist.`
                    );
                    return;
                }
            }
        } else {
            try {
                const response = await WishlistAPI.addToWishlist(user.token, itemID);
                if (response.status === 200)
                    NotificationBox.triggerError(
                        "ITEM EXISTED",
                        `${item.name} already existed in your wishlist.`
                    );
                else if (response.status === 404) {
                    if (response.message === "This user does not exist") {
                        for (let i of tempWishlistLocal) {
                            if (i["product"]["id"] === item["id"]) {
                                NotificationBox.triggerError(
                                    "ITEM EXISTED",
                                    `${item.name} already existed in your wishlist.`
                                );
                                return;
                            }
                        }
                        localStorage.removeItem("user");
                        localStorage.setItem(
                            "wishlist",
                            JSON.stringify([...tempWishlistLocal, item])
                        );
                    } else NotificationBox.triggerError("ERROR", response.message);
                } else if (response.status === 401 || response.status === 403) {
                    for (let i of tempWishlistLocal) {
                        if (i["product"]["id"] === item["product"]["id"]) {
                            NotificationBox.triggerError(
                                "ITEM EXISTED",
                                `${item.name} already existed in your Wishlist.`
                            );
                            return;
                        }
                    }
                    localStorage.removeItem("user");
                    localStorage.setItem("wishlist", JSON.stringify([...tempWishlistLocal, item]));
                    NotificationBox.triggerSuccess(
                        "ADDED ITEM TO WISHLIST",
                        `${item.name} added to your wishlist.`
                    );
                } else if (response.status === 409) {
                    //alert(`${card.name} already existed in your wishlist.`);
                    console.log("LOCAL ITEM: ", item);
                    NotificationBox.triggerError(
                        "ITEM EXISTED",
                        `${item.product} already existed in your wishlist.`
                    );
                }
            } catch (error) {
                console.log(error);
                NotificationBox.triggerError("ERROR", `${item.name} something went wrong.`);
            }
        }
    };

    const handleAction = (record) => {
        //addItemToWishlist(record);
        handleAddToWishlist(record);
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
                NotificationBox.triggerSuccess("SUCCESS", "Remove selected item(s) successfully");
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
                    NotificationBox.triggerSuccess(
                        "SUCCESS",
                        "Remove selected item(s) successfully"
                    );
                    if (countNotExist !== 0) {
                        const errorString =
                            countNotExist.toString() + "item(s) does not exist in your cart";
                        NotificationBox.triggerError("ITEM DOES NOT EXIST", errorString);
                    }
                    localStorage.setItem("cart", JSON.stringify(newCart));
                    setCart(newCart);
                    setIsSending(false);
                }
            } catch (error) {
                console.log(error);
                NotificationBox.triggerError("ERROR", "Something went wrong");
            }
        }
    };

    const handleRemoveItem = (key) => {
        setIsSending(true);
        removeSelectedItem([key]);
    };
    const handleRemoveSelected = () => {
        if (selectedItem.length === 0) {
            NotificationBox.triggerError(
                "NO SELECTED ITEM",
                "No item is being selected.\nPlease select item(s) and try again."
            );
        } else {
            setIsSending(true);
            removeSelectedItem(selectedItem);
            setSelectedItem([]);
            setIsSending(false);
        }
    };

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
                    NotificationBox.triggerError("ERROR", "Something went wrong");
                }
            }
        };
        const totalMoneyTemp = cartTable.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.total;
        }, 0);

        setTotalMoney(totalMoneyTemp);

        fetchCart();
    }, [cartTable, cart]);

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
        const totalMoneyTemp = cartTable.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.total;
        }, 0);

        setTotalMoney(totalMoneyTemp);
        fetchImages();
    }, [cartTable, cart]); //, [cart]);

    return (
        <Content>
            <Hero title="MY CART" image={CartImage} />
            <div className="wrapper cart">
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
                            disabled={isDisable}
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
                <div className="totalMoney">
                    <span className="total_text">TOTAL MONEY:</span>
                    <span>{totalMoney} VND</span>
                </div>
                <div className="bottomRight__totalCheckout__cart ">
                    <button
                        className="btn_checkout_cart"
                        onClick={handleCheckout}
                        title="Go to checkout"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </Content>
    );
}

export default CartLayout;
