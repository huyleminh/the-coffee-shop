import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "../../../../assets/css/layouts/menu/ProductItem.css";
import { Storage } from "../../../../utilities/firebase/FirebaseConfig";
import ProductModal from "./ProductModal";

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
        alert("Item added.");
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
