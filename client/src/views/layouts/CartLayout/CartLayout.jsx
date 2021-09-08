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
    const [changedItem, setChangedItem] = useState([]);

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
            localStorage.removeItem("profile");
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

    // const handleQuantity = (item, value) => {
    //     if (value === 0) return;
    //     let changedItem = [];
    //     const index = cartTable.findIndex((element) => element.key === item.key);
    //     const newCart = [...cart];
    //     newCart[index].quantity = value;
    //     setCart(newCart);

    //     if (tappingQuantity.current) clearTimeout(tappingQuantity.current);

    //     const user = JSON.parse(localStorage.getItem("user"));
    //     if (!user || !user.token) {
    //         localStorage.setItem("cart", JSON.stringify(cart));
    //         localStorage.removeItem("user");
    //     } else {
    //         tappingQuantity.current = setTimeout(async () => {
    //             try {
    //                 setIsSending(true);
    //                 const response = await CartAPI.editCart(user.token, {
    //                     productId: item.key,
    //                     quantity: value,
    //                 });
    //                 setIsSending(false);

    //                 if (response.status === 200) {
    //                     localStorage.setItem("cart", JSON.stringify(cart));
    //                     NotificationBox.triggerSuccess("SUCCESS", "Change quantity successfully.");
    //                 } else {
    //                     if (
    //                         response.message !==
    //                         "There is at least one product that does not exist in your cart"
    //                     )
    //                         localStorage.removeItem("user");

    //                     NotificationBox.triggerError("ERROR", "Fail to change quantity.");
    //                 }
    //             } catch (error) {
    //                 console.log(error);
    //                 alert("Something went wrong");
    //             }
    //         }, 1000);
    //     }
    // };

    const handleQuantity = (item, value) => {
        if (value === 0) return;
        const index = cartTable.findIndex((element) => element.key === item.key);
        const newCart = [...cart];
        const tempChangedItem = changedItem;
        let existFlag = 0;
        let hasChanged = 0;
        newCart[index].quantity = value;
        setCart(newCart);

        if (tappingQuantity.current) clearTimeout(tappingQuantity.current);

        for (let tempItem of tempChangedItem) {
            if (item.key === tempItem.key) {
                tempItem.quantity = value;
                existFlag = 1;
                hasChanged = 1;
                break;
            }
        }
        if (existFlag === 0) {
            tempChangedItem.push(item);
        }

        setChangedItem(tempChangedItem);

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.removeItem("user");
        } else {
            tappingQuantity.current = setTimeout(async () => {
                if (hasChanged === 1) {
                    try {
                        setIsSending(true);
                        for (let tempItem of changedItem) {
                            const response = await CartAPI.editCart(user.token, {
                                productId: tempItem.key,
                                quantity: tempItem.quantity,
                            });
                            if (response.status === 200) {
                                localStorage.setItem("cart", JSON.stringify(cart));
                                NotificationBox.triggerSuccess(
                                    "SUCCESS",
                                    "Change quantity successfully."
                                );
                            } else {
                                if (
                                    response.message !==
                                    "There is at least one product that does not exist in your cart"
                                )
                                    //localStorage.removeItem("user");

                                    NotificationBox.triggerError(
                                        "ERROR",
                                        "Failed to change quantity."
                                    );
                            }
                        }
                        setIsSending(false);
                    } catch (error) {
                        console.log(error);
                        NotificationBox.triggerError("ERROR", "Something went wrong.");
                    }
                }
            }, 1000);
        }

        // try {
        //     setIsSending(true);
        //     const response = await CartAPI.editCart(user.token, {
        //         productId: item.key,
        //         quantity: value,
        //     });
        //     setIsSending(false);

        //     if (response.status === 200) {
        //         localStorage.setItem("cart", JSON.stringify(cart));
        //         NotificationBox.triggerSuccess("SUCCESS", "Change quantity successfully.");
        //     } else {
        //         if (
        //             response.message !==
        //             "There is at least one product that does not exist in your cart"
        //         )
        //             localStorage.removeItem("user");

        //         NotificationBox.triggerError("ERROR", "Fail to change quantity.");
        //     }
        // } catch (error) {
        //     console.log(error);
        //     alert("Something went wrong");
        // }
    };

    const handleAddToWishlist = async (item) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const wishListLocal = localStorage.getItem("wishlist")
            ? JSON.parse(localStorage.getItem("wishlist"))
            : [];

        const cartLocal = JSON.parse(localStorage.getItem("cart"))
            ? JSON.parse(localStorage.getItem("cart"))
            : [];

        for (let cartItem of cartLocal) {
            if (cartItem.product.id === item.key) {
                for (let wishlistItem of wishListLocal) {
                    if (wishlistItem.product.id === item.key) {
                        if (!user || !user.token) {
                            NotificationBox.triggerError(
                                "EXISTED",
                                `${cartItem.product.name} added to your wishlist.`
                            );
                        }
                        return;
                    }
                }
                //localStorage.removeItem("user");
                localStorage.setItem("wishlist", JSON.stringify([...wishListLocal, cartItem]));
                if (!user || !user.token) {
                    NotificationBox.triggerSuccess(
                        "ADDED TO WISHLIST",
                        `${cartItem.product.name} added to your wishlist.`
                    );
                }
                return;
            }
        }

        if (user && user.token) {
            try {
                setIsSending(true);
                const response = await WishlistAPI.addToWishlist(user.token, item.key);
                if (response.status === 200) {
                    NotificationBox.triggerSuccess(
                        "ADDED TO WISHLIST",
                        `${item.product} added to your wishlist successfully.`
                    );
                    setIsSending(false);
                } else if (response.status === 404) {
                    if (response.message === "This user does not exist") {
                        for (let wishlistItem of wishListLocal) {
                            if (wishlistItem.product.id === item.id) {
                                NotificationBox.triggerError(
                                    "EXISTED",
                                    `${item.product.name} has already existed in your wishlist.`
                                );
                                setIsSending(false);
                                return;
                            }
                        }
                        localStorage.removeItem("user");
                        localStorage.removeItem("profile");
                        localStorage.setItem("wishlist", JSON.stringify([...wishListLocal, item]));
                        setIsSending(false);
                        return;
                    } else {
                        NotificationBox.triggerError("ERROR", response.message);
                        setIsSending(false);
                        return;
                    }
                } else if (response.status === 401 || response.status === 403) {
                    for (let wishlistItem of wishListLocal) {
                        if (wishlistItem.product.id === item.product.id) {
                            NotificationBox.triggerError(
                                "EXISTED",
                                `${item.product} has already existed in your Wishlist.`
                            );
                            setIsSending(false);
                            return;
                        }
                    }
                    //localStorage.removeItem("user");
                    localStorage.removeItem("profile");
                    localStorage.setItem("wishlist", JSON.stringify([...wishListLocal, item]));
                    NotificationBox.triggerSuccess(
                        "ADDED TO WISHLIST",
                        `${item.product} added to your wishlist.`
                    );
                    setIsSending(false);
                    return;
                } else if (response.status === 409) {
                    NotificationBox.triggerError(
                        "EXISTED",
                        `${item.product} already existed in your wishlist.`
                    );
                    setIsSending(false);
                    return;
                }
            } catch (error) {
                console.log(error);
                alert("Something went wrong");
                setIsSending(false);
            }
        }
    };

    const handleAction = (record) => handleAddToWishlist(record);

    const removeSelectedItem = async (selectedItems) => {
        const user = JSON.parse(localStorage.getItem("user"));
        let cartLocal = JSON.parse(localStorage.getItem("cart"));
        const newCart = [];
        const removeItems = [];
        let countItems = 0;

        if (cartLocal === null) cartLocal = [];

        cartLocal.forEach((item) => {
            if (selectedItems.indexOf(item.product.id) > -1) {
                removeItems.push(item);
                countItems++;
            } else newCart.push(item);
        });

        if (!user || !user.token) {
            localStorage.removeItem("user");
            if (removeItems.length > 0) {
                NotificationBox.triggerSuccess(
                    "REMOVED",
                    `Successfully remove ${countItems} item(s).`
                );
                localStorage.setItem("cart", JSON.stringify(newCart));
                setCart(newCart);
            }
        } else {
            setIsSending(true);
            try {
                const removeItemPromises = removeItems.map((item) => {
                    return CartAPI.deleteProduct(user.token, item.product.id);
                });

                const response = await Promise.all(removeItemPromises);
                let countNotExist = 0,
                    countSuccess = 0;

                for (let item of response) {
                    if (item.status === 200) {
                        countSuccess++;
                    } else if (item.status === 404) {
                        if (item.message === "This user does not exist") {
                            localStorage.removeItem("user");
                            localStorage.removeItem("profile");
                        } else {
                            countNotExist++;
                        }
                    } else if (item.status === 401 || item.status === 403) {
                        localStorage.removeItem("user");
                        localStorage.removeItem("profile");
                    }
                }

                if (removeItems.length > 0) {
                    NotificationBox.triggerSuccess(
                        "REMOVED",
                        `Successfully remove ${countSuccess} item(s).`
                    );
                    if (countNotExist !== 0) {
                        NotificationBox.triggerError(
                            "NOT EXISTED",
                            `${countNotExist} item(s) do(es) not exist in your wishlist.`
                        );
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

    const handleRemoveItem = (key) => removeSelectedItem([key]);

    const handleRemoveSelected = () => {
        if (selectedItem.length === 0) {
            NotificationBox.triggerError(
                "NO SELECTED ITEM",
                "No item is being selected.\nPlease select item(s) and try again."
            );
        } else {
            removeSelectedItem(selectedItem);
            setSelectedItem([]);
        }
    };

    const handleWishlistSelected = async () => {
        if (selectedItem.length === 0) {
            NotificationBox.triggerError(
                "NO SELECTED ITEM",
                "No item is being selected.\nPlease select item(s) and try again."
            );
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        let cartLocal = JSON.parse(localStorage.getItem("cart"));
        let wishListLocal = JSON.parse(localStorage.getItem("wishlist"));
        const selectedData = [];

        if (wishListLocal === null) wishListLocal = [];
        if (cartLocal === null) cartLocal = [];

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
                            "ADD TO WISHLIST",
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
                            "ADD TO WISHLIST",
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
                            localStorage.removeItem("profile");
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
                        localStorage.removeItem("profile");
                        localStorage.setItem("wishlist", JSON.stringify([...wishListLocal, item]));
                        NotificationBox.triggerSuccess(
                            "ADDED TO WISHLIST",
                            `${item.product.name} added to your wishlist.`
                        );
                    } else if (response.status === 409) {
                        NotificationBox.triggerError(
                            "EXISTED",
                            `${item.product.name} already existed in your wishlist.`
                        );
                    }
                }
            } catch (error) {
                console.log(error);
                alert("{Something went wrong.");
            }
        }
    };

    useEffect(() => {
        localStorage.removeItem("checkout");
        const fetchCart = async () => {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user || !user.token) {
                localStorage.removeItem("user");
                localStorage.removeItem("profile");
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
                        localStorage.removeItem("profile");
                        const cartLocal = JSON.parse(localStorage.getItem("cart"));
                        setCart(cartLocal ? cartLocal : []);
                    }
                } catch (error) {
                    console.log(error);
                    alert("Something went wrong");
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
                        : require("../../../assets/images/default_image.png").default
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
        cart.forEach((cartItem) => {
            if (selectedItem.includes(cartItem.product.id)) {
                const discount = cartItem.discount === null ? 0 : cartItem.discount.percent;
                totalMoneyTemp += Math.floor(
                    cartItem.product.price * (1 - discount) * cartItem.quantity
                );
            }
        });
        // for (let key of selectedItem) {
        //     for (let item of cart) {
        //         if (key === item.product.id) {
        //             if (item.discount !== null) {
        //                 const price =
        //                     Math.floor(item.product.price * (1 - item.discount.percent)) *
        //                     item.quantity;
        //                 totalMoneyTemp += price;
        //             } else {
        //                 const price = Math.floor(item.product.price * item.quantity);
        //                 totalMoneyTemp += price;
        //             }
        //         }
        //     }
        // }
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
