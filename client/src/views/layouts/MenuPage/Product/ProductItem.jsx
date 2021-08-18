import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "../../../../assets/css/layouts/menu/ProductItem.css";
import WishlistAPI from "../../../../services/Wishlist/WishlistAPI.js";
import { Storage } from "../../../../utilities/firebase/FirebaseConfig";
import ProductModal from "./ProductModal";
import CartAPI from "../../../../services/Cart/CartAPI.js";
import NotificationBox from "../../../../components/NotificationBox";
import Format from "../../../../utilities/Format/Format.js"

ProductItem.propTypes = {
    details: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
        categoryName: PropTypes.string,
        rate: PropTypes.number,
        discount: PropTypes.number || null,
        oldPrice: PropTypes.number,
        newPrice: PropTypes.number,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
    }),
};

function ProductItem(props) {
    const { details } = props;
    const [isModalVisible, setIsModelVisible] = useState(false);

    //Initialize card before rendering
    const [card, setCard] = useState(details);

    const handleAddToCart = async (qtt) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

        const item = {
            product: {
                id: card.id,
                name: card.name,
                image: card.image.match(/img_.+((\.jpg)|(\.png)|(\.jpeg)|(\.jfif))/g)[0],
                price: card.discount ? card.newPrice : card.oldPrice,
            },
            discount: card.discount
                ? {
                      percent: card.discount / 100,
                      startDate: card.startDate,
                      endDate: card.endDate,
                  }
                : null,
            quantity: qtt,
        };

        let flag = false;
        if (user && user.token) {
            try {
                const response = await CartAPI.addToCart(user.token, {
                    productId: item.product.id,
                    quantity: item.quantity,
                });

                if (response.status === 200) {
                    localStorage.setItem("cart", JSON.stringify([...cart, item]));
                    NotificationBox.triggerSuccess("ADD TO CART", `${card.name} is added to your cart.`);
                } else if (response.status === 409) {
                    NotificationBox.triggerWarning("EXISTED", `${card.name} has already existed in your cart.`);
                } else {
                    if (
                        response.status === 401 ||
                        response.status === 403 ||
                        response.message === "This user does not exist"
                    )
                        flag = true;
                    else NotificationBox.triggerSuccess("ADD TO CART", `${card.name} is added to your cart.`);
                }
            } catch (error) {
                console.log(error);
                alert("Something went wrong");
            }
        } else flag = true;

        if (flag) {
            for (let element of cart) {
                if (element.product.id === item.product.id) {
                    NotificationBox.triggerWarning("EXISTED", `${card.name} has already existed in your cart.`);
                    return;
                }
            }
            localStorage.removeItem("user");
            localStorage.setItem("cart", JSON.stringify([...cart, item]));
            NotificationBox.triggerSuccess("ADD TO CART", `${card.name} is added to your cart.`);
        }
    };

    const handleAddToWishlist = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const wishlist = localStorage.getItem("wishlist")
            ? JSON.parse(localStorage.getItem("wishlist"))
            : [];

        const item = {
            product: {
                id: card.id,
                name: card.name,
                image: card.image.match(/img_.+((\.jpg)|(\.png)|(\.jpeg)|(\.jfif))/g)[0],
                price: card.discount ? card.newPrice : card.oldPrice,
            },
            discount: card.discount
                ? {
                      percent: card.discount / 100,
                      startDate: card.startDate,
                      endDate: card.endDate,
                  }
                : null,
        };

        if (!user || !user.token) {
            for (let i of wishlist) {
                if (i["product"]["id"] === item["product"]["id"]) {
                    NotificationBox.triggerWarning("EXISTED", `${card.name} has already existed in your wishlist.`);
                    return;
                }
            }
            localStorage.removeItem("user");
            localStorage.setItem("wishlist", JSON.stringify([...wishlist, item]));
            NotificationBox.triggerSuccess("ADD TO WISHLIST", `${card.name} is added to your wishlist.`);
        } else {
            try {
                const response = await WishlistAPI.addToWishlist(user.token, card.id);
                if (response.status === 200) NotificationBox.triggerSuccess("ADD TO WISHLIST", `${card.name} is added to your wishlist.`);
                else if (response.status === 404) {
                    if (response.message === "This user does not exist") {
                        for (let i of wishlist) {
                            if (i["product"]["id"] === item["product"]["id"]) {
                                NotificationBox.triggerWarning("EXISTED", `${card.name} has already existed in your wishlist.`);
                                return;
                            }
                        }
                        localStorage.removeItem("user");
                        localStorage.setItem("wishlist", JSON.stringify([...wishlist, item]));
                        NotificationBox.triggerSuccess("ADD TO WISHLIST", `${card.name} is added to your wishlist.`);
                    } else alert(response.message);
                } else if (response.status === 401 || response.status === 403) {
                    for (let i of wishlist) {
                        if (i["product"]["id"] === item["product"]["id"]) {
                            NotificationBox.triggerWarning("EXISTED", `${card.name} has already existed in your wishlist.`);
                            return;
                        }
                    }
                    localStorage.removeItem("user");
                    localStorage.setItem("wishlist", JSON.stringify([...wishlist, item]));
                    NotificationBox.triggerSuccess("ADD TO WISHLIST", `${card.name} is added to your wishlist.`);
                } else if (response.status === 409)
                    NotificationBox.triggerWarning("EXISTED", `${card.name} has already existed in your wishlist.`);
            } catch (error) {
                console.log(error);
                //alert("Something went wrong.");
                NotificationBox.triggerError("ERROR", `${card.name} something went wrong.`);
            }
        }
    };

    const handleModalVisible = () => {
        setIsModelVisible(false);
    };

    useEffect(() => {
        const getProductImage = async () => {
            const ref = Storage.ref(`products/${card.image}`);
            let image = null;
            try {
                const url = await ref.getDownloadURL();
                image = url;
            } catch (e) {
                console.log(e);
                image = require("../../../../assets/images/default_image.png").default;
            }
            setCard({ ...card, image });
        };

        getProductImage();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Card
                hoverable
                cover={
                    <div className="custom-cover">
                        <div className="opacity" onClick={() => setIsModelVisible(true)}></div>
                        {card.discount ? <span className="sale">{`${card.discount}%`}</span> : null}
                        <img src={card.image} alt="product" />
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="favourite"
                            onClick={handleAddToWishlist}
                        />
                        <button onClick={() => handleAddToCart(1)}>ADD TO CART</button>
                    </div>
                }
                className="custom-card"
            >
                <div className="custom-body" onClick={() => setIsModelVisible(true)}>
                    <h2>{card.name}</h2>
                    <span>
                        <FontAwesomeIcon icon={faStar} />
                        &nbsp; {card.rate !== 0 ? card.rate : "N/A"}
                    </span>
                    <ul>
                        {card.discount ? (
                            <>
                                <li style={{ textDecoration: "line-through" }}>
                                    {Format.formatPriceWithVND(card.oldPrice)}&nbsp;VND
                                </li>
                                <li style={{ color: "#f72f2f", fontWeight: "650" }}>
                                    {Format.formatPriceWithVND(card.newPrice)}&nbsp;VND
                                </li>
                            </>
                        ) : (
                            <li>{Format.formatPriceWithVND(card.oldPrice)}&nbsp;VND</li>
                        )}
                    </ul>
                </div>
            </Card>
            {isModalVisible ? (
                <ProductModal
                    handleVisible={handleModalVisible}
                    addToCart={handleAddToCart}
                    addToWishlist={handleAddToWishlist}
                    details={card}
                />
            ) : null}
        </>
    );
}

export default ProductItem;
