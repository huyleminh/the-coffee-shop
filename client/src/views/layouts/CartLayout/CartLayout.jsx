import { LoadingOutlined } from "@ant-design/icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import FirebaseAPI from "../../../services/FirsebaseAPI";
import WishlistAPI from "../../../services/Wishlist/WishlistAPI";
import Format from "../../../utilities/Format/Format.js";

const { Content } = Layout;

function CartLayout() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [images, setImages] = useState([]);

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
            localStorage.removeItem("user");
            localStorage.removeItem("checkout");
            const confirm = window.confirm(
                "You are not logged in. Click Ok to go to the login page before you make your checkout."
            );
            if (confirm) history.push("/login");
        } else {
            if (selectedItem.length !== 0) {
                let checkoutItems = [];
                for (let key of selectedItem) {
                    for (let item of cart) {
                        if (key === item.product.id) {
                            checkoutItems.push(item);
                        }
                    }
                }
                localStorage.setItem("checkout", JSON.stringify(checkoutItems));
                history.push("/checkout");
            } else {
                localStorage.setItem("checkout", JSON.stringify(cart));
                history.push("/checkout");
            }
        }
    };

    const handleSelected = (keys) => setSelectedItem(keys);

    const handleQuantity = (item, value) => {
        if (value === 0) return;
        const index = cartTable.findIndex((element) => element.key === item.key);
        const newCart = [...cart];
        newCart[index].quantity = value;
        setCart(newCart);

        if (tappingQuantity.current) clearTimeout(tappingQuantity.current);

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.removeItem("user");
        } else {
            tappingQuantity.current = setTimeout(async () => {
                try {
                    setIsSending(true);
                    const response = await CartAPI.editCart(user.token, {
                        productId: item.key,
                        quantity: value,
                    });
                    setIsSending(false);

                    if (response.status === 200) {
                        localStorage.setItem("cart", JSON.stringify(cart));
                        NotificationBox.triggerSuccess("SUCCESS", "Change quantity successfully.");
                    } else {
                        if (
                            response.message !==
                            "There is at least one product that does not exist in your cart"
                        )
                            localStorage.removeItem("user");

                        NotificationBox.triggerError("ERROR", "Fail to change quantity.");
                    }
                } catch (error) {
                    console.log(error);
                    alert("Something went wrong");
                }
            }, 1000);
        }
    };

    const handleAddToWishlist = async (item) => {
        setIsSending(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const wishListLocal = localStorage.getItem("wishlist")
            ? JSON.parse(localStorage.getItem("wishlist"))
            : [];

        const cartLocal = JSON.parse(localStorage.getItem("cart"))
            ? JSON.parse(localStorage.getItem("cart"))
            : [];

        for (let i of cartLocal) {
            if (i.product.id === item.key) {
                for (let j of wishListLocal) {
                    if (j.product.id === item.key) {
                        if (!user || !user.token) {
                            NotificationBox.triggerError(
                                "ITEM EXISTED IN WISHLIST",
                                `${i.product.name} added to your wishlist.`
                            );
                        }
                        setIsSending(false);
                        return;
                    }
                }
                localStorage.removeItem("user");
                localStorage.setItem("wishlist", JSON.stringify([...wishListLocal, i]));
                if (!user || !user.token) {
                    NotificationBox.triggerSuccess(
                        "ADDED ITEM TO WISHLIST",
                        `${i.product.name} added to your wishlist.`
                    );
                }
                setIsSending(false);
                return;
            }
        }

        if (user && user.token) {
            try {
                const response = await WishlistAPI.addToWishlist(user.token, item.key);
                if (response.status === 200) {
                    NotificationBox.triggerSuccess(
                        "ADDED",
                        `${item.product} added to your wishlist successfully.`
                    );
                    setIsSending(false);
                    return;
                } else if (response.status === 404) {
                    if (response.message === "This user does not exist") {
                        for (let i of wishListLocal) {
                            if (i.product.id === item.id) {
                                NotificationBox.triggerError(
                                    "EXISTED",
                                    `${item.product.name} has already existed in your wishlist.`
                                );
                                setIsSending(false);
                                return;
                            }
                        }
                        localStorage.removeItem("user");
                        localStorage.setItem(
                            "wishlist",
                            JSON.stringify([...wishListLocal, item])
                        );
                        setIsSending(false);
                        return;
                    } else {
                        NotificationBox.triggerError("ERROR", response.message);
                        setIsSending(false);
                        return;
                    }
                } else if (response.status === 401 || response.status === 403) {
                    for (let i of wishListLocal) {
                        if (i.product.id === item.product.id) {
                            NotificationBox.triggerError(
                                "EXISTED",
                                `${item.product} has already existed in your Wishlist.`
                            );
                            setIsSending(false);
                            return;
                        }
                    }
                    localStorage.removeItem("user");
                    localStorage.setItem("wishlist", JSON.stringify([...wishListLocal, item]));
                    NotificationBox.triggerSuccess(
                        "ADDED ITEM TO WISHLIST",
                        `${item.product} added to your wishlist.`
                    );
                    setIsSending(false);
                    return;
                } else if (response.status === 409) {
                    NotificationBox.triggerError(
                        "ITEM EXISTED",
                        `${item.product} already existed in your wishlist.`
                    );
                    setIsSending(false);
                    return;
                }
            } catch (error) {
                console.log(error);
                NotificationBox.triggerError("ERROR", `${item.product} something went wrong.`);
                setIsSending(false);
            }
        }
    };

    const handleAction = (record) => handleAddToWishlist(record);

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
                if (item.product.id === key) {
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
                    } else if (item.status === 404) {
                        if (item.message === "This user does not exist") {
                            localStorage.removeItem("user");
                        } else {
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
        const tempSelected = [];
        for (let i of selectedItem) {
            if (i !== key) {
                tempSelected.push(i);
            }
        }
        setSelectedItem(tempSelected);
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

    const handleWishlistSelected = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const cartLocal = JSON.parse(localStorage.getItem("cart"));
        const wishListLocal = JSON.parse(localStorage.getItem("wishlist"));
        const selectedData = [];

        if (selectedItem.length === 0) {
            NotificationBox.triggerError(
                "NO SELECTED ITEM",
                "No item is being selected.\nPlease select item(s) and try again."
            );
            return;
        }
        let isExisted = false;
        for (let id of selectedItem) {
            for (let cartItem of cartLocal) {
                isExisted = false;
                for (let wishlistItem of wishListLocal) {
                    if (id === wishlistItem.product.id) {
                        if (!user || !user.token) {
                            NotificationBox.triggerError(
                                "ITEM EXISTED",
                                `${wishlistItem.product.name} already existed in your wishlist.`
                            );
                        }
                        isExisted = true;
                    }
                }
                if (isExisted) {
                    break;
                }
                if (id === cartItem.product.id) {
                    selectedData.push(cartItem);
                    wishListLocal.push(cartItem);
                    if (!user || !user.token) {
                        NotificationBox.triggerSuccess(
                            "ITEM ADDED",
                            `${cartItem.product.name} added to your wishlist successfully.`
                        );
                    }
                    break;
                }
            }
        }

        localStorage.setItem("wishlist", JSON.stringify(wishListLocal));

        if (user && user.token) {
            try {
                for (let item of selectedData) {
                    const response = await WishlistAPI.addToWishlist(user.token, item.product.id);
                    if (response.status === 200)
                        NotificationBox.triggerSuccess(
                            "ITEM ADDED",
                            `${item.product.name} added to your wishlist successfully.`
                        );
                    else if (response.status === 404) {
                        if (response.message === "This user does not exist") {
                            for (let i of wishListLocal) {
                                if (i.product.id === item.product.id) {
                                    NotificationBox.triggerError(
                                        "EXISTED",
                                        `${item.product} has already existed in your wishlist.`
                                    );
                                    return;
                                }
                            }
                            localStorage.removeItem("user");
                            localStorage.setItem(
                                "wishlist",
                                JSON.stringify([...wishListLocal, item])
                            );
                        } else NotificationBox.triggerError("ERROR", response.message);
                    } else if (response.status === 401 || response.status === 403) {
                        for (let i of wishListLocal) {
                            if (i.product.id === item.product.id) {
                                NotificationBox.triggerError(
                                    "EXISTED",
                                    `${item.product} has already existed in your Wishlist.`
                                );
                                return;
                            }
                        }
                        localStorage.removeItem("user");
                        localStorage.setItem(
                            "wishlist",
                            JSON.stringify([...wishListLocal, item])
                        );
                        NotificationBox.triggerSuccess(
                            "ADDED ITEM TO WISHLIST",
                            `${item.product.name} added to your wishlist.`
                        );
                    } else if (response.status === 409) {
                        NotificationBox.triggerError(
                            "ITEM EXISTED",
                            `${item.product.name} already existed in your wishlist.`
                        );
                    }
                }
            } catch (error) {
                console.log(error);
                NotificationBox.triggerError("ERROR", `Something went wrong.`);
            }
        }
    };

    useEffect(() => {
        localStorage.removeItem("checkout");
        const fetchCart = async () => {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user || !user.token) {
                localStorage.removeItem("user");
                setIsLoading(false);
            } else {
                try {
                    const response = await CartAPI.getCart(user.token);
                    if (response.status === 200) {
                        setCart(response.data);
                        setIsLoading(false);
                        localStorage.setItem("cart", JSON.stringify(response.data));
                    } else {
                        localStorage.removeItem("user");
                        const cartLocal = JSON.parse(localStorage.getItem("cart"));
                        setCart(cartLocal ? cartLocal : []);
                    }
                } catch (error) {
                    console.log(error);
                    NotificationBox.triggerError("ERROR", "Something went wrong");
                }
            }
        };
        fetchCart();
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            const imagePromises = cart.map((item) => {
                return FirebaseAPI.getImageURL(item.product.image);
            });

            try {
                const images = await Promise.allSettled(imagePromises);
                const postImages = images.map((item) =>
                    item.status === "fulfilled" && item.value.status === 200
                        ? item.value.data
                        : require("../../../assets/images/latte.jpg").default
                );
                setImages(postImages);
            } catch (err) {
                console.log(err);
            }
        };
        fetchImages();
    }, [cart]);

    let totalMoneyTemp = 0;

    if (selectedItem.length !== 0) {
        for (let key of selectedItem) {
            for (let item of cart) {
                if (key === item.product.id) {
                    if (item.discount !== null) {
                        const price =
                            Math.floor(item.product.price * (1 - item.discount.percent)) *
                            item.quantity;
                        totalMoneyTemp += price;
                    } else {
                        const price = Math.floor(item.product.price * item.quantity);
                        totalMoneyTemp += price;
                    }
                }
            }
        }
    } else {
        totalMoneyTemp = cartTable.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.total;
        }, 0);
    }

    return (
        <Content>
            <Hero title="MY CART" image={CartImage} />
            <div className="wrapper cart">
                <div className="command_bar_cart">
                    <div className="cmd_item_cart">
                        {isSending ? <LoadingOutlined spin /> : <></>}
                    </div>
                    <div className="cmd_item_cart">
                        <span>{selectedItem.length} item(s) selected</span>
                    </div>
                    <div className="cmd_item" title="Add selected item(s) to cart">
                        <button className="btn_cart_selected" onClick={handleWishlistSelected}>
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
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
                            disabled={isSending}
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
                    <span>{Format.formatPriceWithVND(totalMoneyTemp)} VND</span>
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
