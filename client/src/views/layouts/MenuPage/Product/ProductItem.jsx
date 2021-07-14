import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "antd";
import React, { useState } from "react";
import "../../../../assets/css/layouts/menu/ProductItem.css";
import Latte from "../../../../assets/images/latte.jpg";
import ProductModal from "./ProductModal";
import PropTypes from "prop-types";

ProductItem.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        image: PropTypes.string || null,
        price: PropTypes.number,
        description: PropTypes.string || null,
    }),
    rating: PropTypes.shape({
        totalStar: PropTypes.number,
        totalRating: PropTypes.number,
    }),
    discount: PropTypes.shape({
        percent: PropTypes.number,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
    }) || null,
};

function ProductItem(props) {
    const { product, rating, discount } = props;

    const [id, setId] = useState(product.id);
    const [isModalVisible, setIsModelVisible] = useState(false);

    const handleAddToCart = () => {
        alert("Item added.");
    };

    const handleAddToWishlist = () => {
        alert("Item added.");
    };

    const handleModalVisible = () => {
        setIsModelVisible(false);
    };

    const productModal = isModalVisible ? (
        <ProductModal
            handleVisible={handleModalVisible}
            addToCart={handleAddToCart}
            addToWishlist={handleAddToWishlist}
        />
    ) : null;

    return (
        <>
            <Card
                hoverable
                cover={
                    <div className="custom-cover">
                        <div className="opacity" onClick={() => setIsModelVisible(true)}></div>
                        <span className="sale">25%</span>
                        <img src={Latte} alt="product" />
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
                    <h2>Latte</h2>
                    <span>
                        <FontAwesomeIcon icon={faStar} />
                        &nbsp; 4.5
                    </span>
                    <ul>
                        <li style={{ textDecoration: "line-through" }}>100000 đ</li>
                        <li style={{ color: "#f72f2f" }}>75000 đ</li>
                    </ul>
                </div>
            </Card>
            {productModal}
        </>
    );
}

export default ProductItem;
