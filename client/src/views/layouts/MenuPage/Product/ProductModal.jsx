import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "../../../../assets/css/layouts/menu/ProductModal.css";
import Latte from "../../../../assets/images/latte.jpg";

ProductModal.propTypes = {
    handleVisible: PropTypes.func,
    addToCart: PropTypes.func,
    addToWishlist: PropTypes.func,
};

function ProductModal(props) {
    const [quantity, setQuantity] = useState("1");
    const { handleVisible, addToCart, addToWishlist } = props;

    const handleOnchangeQuantity = (e) => {
        const target = e.target;
        setQuantity(target.value);
    };

    const handleQuantityButton = (e) => {
        const target = e.target;
        const type = target.id;
        if (type === "asc") {
            if (!quantity) setQuantity("1");
            else setQuantity(parseInt(quantity) + 1);
        } else if (type === "desc") {
            if (!quantity) return;
            else setQuantity(quantity - 1);
        }
    };

    const addToCartModal = () => {
        if (!addToCart) return;
        addToCart();
    };

    const addToWishlistModal = () => {
        if (!addToWishlist) return;
        addToWishlist();
    };

    useEffect(() => {
        const modalContent = document.querySelector("#modal-content");
        const id = setTimeout(() => {
            modalContent.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 15);
        return () => clearTimeout(id);
    }, []);

    return (
        <div className="product__modal">
            <div className="modal-overlay" onClick={handleVisible}></div>
            <div className="product__content" id="modal-content">
                <img src={Latte} alt="detail" />

                <div className="product__right">
                    <div className="product__top">
                        <div className="upper">
                            <h1>Latte</h1>
                            <FontAwesomeIcon
                                icon={faHeart}
                                id="favourite"
                                onClick={addToWishlistModal}
                            />
                            <span
                                style={{
                                    textDecoration: "line-through",
                                    marginLeft: "auto",
                                }}
                            >
                                100000 đ
                            </span>
                        </div>

                        <div className="lower">
                            <span>
                                <FontAwesomeIcon icon={faStar} id="star" />
                                &nbsp; 4.5
                            </span>
                            <span id="discount">25%</span>
                            <span style={{ color: "#f72f2f" }}>75000 đ</span>
                        </div>
                    </div>

                    <span id="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget
                        finibus ipsum. Aenean luctus nisi velit, sed tempus sem consectetur vitae.
                        Phasellus blandit, nulla non congue bibendum, lectus tortor lacinia libero,
                        vestibulum tristique risus ligula a nisl. Nam mi purus, tristique at
                        bibendum vel, elementum scelerisque dolor.
                    </span>

                    <div className="product__control top">
                        <span>Category:&nbsp;</span>
                        <ul>
                            <li>Category 1&#44;&nbsp;</li>
                            <li>Category 1</li>
                        </ul>
                        <div className="amount-control">
                            <button id="desc" onClick={handleQuantityButton}>
                                -
                            </button>
                            <input
                                type="text"
                                name="quantity"
                                value={quantity}
                                onChange={handleOnchangeQuantity}
                            />
                            <button id="asc" onClick={handleQuantityButton}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className="product__control bottom">
                        <button>Related product</button>
                        <button onClick={addToCartModal}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;
