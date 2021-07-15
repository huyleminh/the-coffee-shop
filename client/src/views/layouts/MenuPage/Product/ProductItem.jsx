import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "../../../../assets/css/layouts/menu/ProductItem.css";
import { Storage } from "../../../../utilities/firebase/FirebaseConfig";
import ProductModal from "./ProductModal";

ProductItem.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        image: PropTypes.string || null,
        price: PropTypes.number,
        description: PropTypes.string || null,
    }),
    categoryName: PropTypes.string,
    rating: PropTypes.shape({
        totalStar: PropTypes.number,
        totalRating: PropTypes.number,
    }),
    discount:
        PropTypes.shape({
            percent: PropTypes.number,
            startDate: PropTypes.string,
            endDate: PropTypes.string,
        }) || null,
};

function ProductItem(props) {
    const { product, categoryName, rating, discount } = props;
    const [isModalVisible, setIsModelVisible] = useState(false);

    //Initialize card before rendering
    const [card, setCard] = useState(() => {
        const productCard = {
            id: product.id,
            name: product.name,
            image: "",
            description: product.description,
            categoryName: categoryName,
            rate: 0,
            discount: discount ? discount.percent : null,
            oldPrice: product.price,
            newPrice: product.price,
        };

        productCard.rate =
            rating.totalRating !== 0
                ? parseInt((rating.totalStar / rating.totalRating).toFixed(1))
                : 0;
        productCard.newPrice = discount ? product.price * (1 - discount.percent) : product.price;

        return productCard;
    });

    const handleAddToCart = () => {
        alert("Item added.");
    };

    const handleAddToWishlist = () => {
        alert("Item added.");
    };

    const handleModalVisible = () => {
        setIsModelVisible(false);
    };

    useEffect(() => {
        const getProductImage = async () => {
            const ref = Storage.ref(`products/${product.image}`);
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
                                    {card.oldPrice}&nbsp;vnd
                                </li>
                                <li style={{ color: "#f72f2f" }}>{card.newPrice}&nbsp;vnd</li>
                            </>
                        ) : (
                            <li>{card.oldPrice}&nbsp;vnd</li>
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
