import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "../../../../assets/css/layouts/menu/ProductItem.css";
import { Storage } from "../../../../utilities/firebase/FirebaseConfig";
import ProductModal from "./ProductModal";
import WishlistAPI from "../../../../services/Wishlist/WishlistAPI.js";
import ColumnGroup from "antd/lib/table/ColumnGroup";

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

    const handleAddToCart = () => {
        alert("Item added.");
    };

    const handleAddToWishlist = () => {
        const addWishlist = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const wishlist = JSON.parse(localStorage.getItem("wishlist"));
            const imageRegex = /(img_).*(.jpg)|(.png)|(.jpeg)|(.jfif)/g;
            console.log(wishlist);
            const item = {
                product: {
                    id: card.id,
                    name: card.name,
                    image: card.image.match(imageRegex),
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
            var existed = false;
            if (!user || !user.token) {
                console.log(item);
                localStorage.removeItem("user");
                existed = false;
                for (let i of wishlist) {
                    if (i["product"]["id"] === item["product"]["id"]) {
                        i = item;
                        localStorage.setItem("wishlist", JSON.stringify(wishlist));
                        existed = true;
                        alert("Product already existed in your wishlist.");
                        break;
                    }
                }
                if (!existed) {
                    wishlist.push(item);
                    localStorage.setItem("wishlist", JSON.stringify(wishlist));
                    alert("Item added.");
                }
            } else {
                try {
                    const response = await WishlistAPI.addToWishlist(user.token, card.id);
                    if (response.status === 200) {
                        console.log("success");
                        alert("Item added.");
                    } else if (response.status === 404) {
                        if (response.message === "This user does not exist") {
                            localStorage.removeItem("user");
                            existed = false;
                            for (let i of wishlist) {
                                if (i["product"]["id"] === item["product"]["id"]) {
                                    i = item;
                                    localStorage.setItem("wishlist", JSON.stringify(wishlist));
                                    existed = true;
                                    alert("Product already existed in your wishlist.");
                                    break;
                                }
                            }
                            if (!existed) {
                                wishlist.push(item);
                                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                                alert("Item added.");
                            }
                        } else {
                            console.log(response.message);
                            alert(response.message);
                        }
                    } else if (response.status === 401 || response.status === 403) {
                        localStorage.removeItem("user");
                        existed = false;
                        for (let i of wishlist) {
                            if (i["product"]["id"] === item["product"]["id"]) {
                                i = item;
                                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                                existed = true;
                                alert("Product already existed in your wishlist.");
                                break;
                            }
                        }
                        if (!existed) {
                            wishlist.push(item);
                            localStorage.setItem("wishlist", JSON.stringify(wishlist));
                            alert("Item added.");
                        }
                    } else if (response.status === 409) {
                        console.log(response.message);
                        alert("Product already existed in your wishlist.");
                    }
                } catch (error) {
                    console.log(error);
                    alert("Something went wrong.");
                }
            }
        };
        addWishlist();
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
                image = require("../../../../assets/images/latte.jpg").default;
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
                        <button onClick={handleAddToCart}>Add to cart</button>
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
                                    {card.oldPrice}&nbsp;VND
                                </li>
                                <li style={{ color: "#f72f2f" }}>{card.newPrice}&nbsp;VND</li>
                            </>
                        ) : (
                            <li>{card.oldPrice}&nbsp;VND</li>
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
