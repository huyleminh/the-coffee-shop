import { LoadingOutlined } from "@ant-design/icons";
import { Layout, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../../assets/css/layouts/cart/CartLayout.css";
import CartImage from "../../../assets/images/landing-hero.jpg";
import Hero from "../../../components/layouts/Hero";
import Loading from "../../../components/Loading";
import ProductTable from "../../../components/Product/ProductTable";
import CartAPI from "../../../services/Cart/CartAPI.js";
import { Storage } from "../../../utilities/firebase/FirebaseConfig.js";
import NotificationBox from "../../../components/NotificationBox";

const { Content } = Layout;

const openNotification = (placement) => {
    notification.info({
        message: `Notification ${placement}`,
        description:
            "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        placement,
    });
};
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
    const [isDisable, setIsDisable] = useState(false);

    const tappingQuantity = useRef(null);

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

    const handleRemoveItem = (key) => {
        setIsSending(true);
        setSelectedItem([key]);
        setIsRemoving(true);
        setIsSending(false);
    };

    const handleSelected = (keys) => {
        NotificationBox.triggerWarning("Test", "Demo");
        setSelectedItem(keys);
        const totalMoney = cartTable.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.total;
        }, 0);
        setTotalMoney(totalMoney);
    };

    const handleToBuyItem = () => {
        const itemsToBuy = [];
        let totalMoney = 0;

        cartTable.forEach((item) => {
            if (item.quantity > 0) {
                itemsToBuy.push(item);
                totalMoney += item.total;
            }
        });

        setTotalMoney(totalMoney);
        setItemToBuy(itemsToBuy);
    };

    const handleQuantity = (item, value) => {
        if (tappingQuantity.current) clearTimeout(tappingQuantity.current);

        const index = cartTable.findIndex((element) => element.key === item.key);
        cart[index].quantity = value;
        cartTable[index].quantity = value;
        cartTable[index].total =
            value * (cartTable[index].price.price * (1 - cartTable[index].price.discount));
        const totalMoney = cartTable.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.total;
        }, 0);

        setTotalMoney(totalMoney);
        setCart(cart);

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.removeItem("user");
            // notification: change successfully
        } else {
            tappingQuantity.current = setTimeout(async () => {
                try {
                    // notification: wait 3s
                    setIsDisable(true);
                    openNotification("bottomRight");

                    const response = await CartAPI.editCart(user.token, {
                        productId: item.key,
                        quantity: value,
                    });

                    setIsDisable(false);
                    if (response.status === 200) {
                        localStorage.setItem("cart", JSON.stringify(cart));
                        // notification: change successfully
                        openNotification("bottomRight");
                    } else {
                        if (
                            response.message !==
                            "There is at least one product that does not exist in your cart"
                        )
                            localStorage.removeItem("user");

                        alert("Change quantity failed");
                    }
                } catch (error) {
                    alert("Something went wrong");
                }
            }, 2000);
        }
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
            for (let key of selectedItem[0]) {
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

    const handleAction = (key) => {
        //ProductItem.handleAddToWishlist();
        alert("ADDED TO WISHLIST (FAKE)");
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

    useEffect(() => {
        handleToBuyItem();
    }, [cart]);

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
                <div className="bottomRight__totalCheckout__cart ">
                    <div className="totalMoney">TOTAL MONEY: {totalMoney} VND </div>
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
