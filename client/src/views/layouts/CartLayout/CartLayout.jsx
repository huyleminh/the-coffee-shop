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
import CartAPI from "../../../services/Cart/CartAPI.js"
import { Storage } from "../../../utilities/firebase/FirebaseConfig.js"
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
        const cartLocal = JSON.parse(localStorage.getItem("cart"))
        return cartLocal ? cartLocal : []
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
        //console.log("keys: ", keys);
        setSelectedItem([keys]);

        //let totalTemp = 0;
        for (let key of keys) {
            //console.log("SELECTED: ", key);
            for (let item of cart) {
                //console.log(referralItem);
                //console.log(item["key"]);
                if (key === item["key"]) {
                    //console.log("REFERRAL: ", item);
                    //totalTemp += item["total"];
                }
            }
        }

        //setTotalMoney(totalTemp);
        //console.log("TOTAL: ", totalTemp);
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
        //console.log(item);
        // const cloneData = [...cart];
        // handleToBuyItem();
        // for (let clone of cloneData) {
        //     if (clone["key"] === item["key"]) {
        //         console.log(clone["key"]);
        //         const base =
        //             clone["price"]["price"] - clone["price"]["price"] * clone["price"]["discount"];
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
            const user = JSON.parse(localStorage.getItem("user"))

            if (!user || !user.token) {
                localStorage.removeItem("user")
                setIsLoading(false)
            } else {
                try {
                    const response = await CartAPI.getCart(user.token)
                    if (response.status === 200) {
                        const resCart = response.data
                        setCart(resCart)
                        localStorage.setItem("cart", JSON.stringify(resCart))
                    } else {
                        localStorage.removeItem("user")
                        const cartLocal = localStorage.getItem("cart")
                        setCart(cartLocal ? cartLocal : [])
                    }
                } catch (error) {
                    alert("Something went wrong.")
                }
            }
        }

        fetchCart()
    }, [])

    useEffect(() => {
        const fetchImages = async () => {
            const imagePromises = cart.map(item => {
                const image = item.product.image ? item.product.image : "latte.jpg"
                return Storage.ref(`products/${image}`).getDownloadURL()
            })

            const images = await Promise.all(imagePromises)
            setImages(images)
            setIsLoading(false)
        }

        fetchImages()
    }, [cart])

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
        const price = {
            discount: item.discount ? item.discount.percent : 0,
            price: item.product.price
        }
        const total = item.quantity * (price.price * (1 - price.discount))

        return {
            key: item.product.id,
            product: item.product.name,
            image: {
                src: images[index],
                width: "100px",
                height: "100px"
            },
            price,
            quantity: item.quantity,
            total,
            action: "wishlist",
        }
    })

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
