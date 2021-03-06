import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "../../../../assets/css/layouts/menu/ProductModal.css";
import { MenuPageEventsHandler } from "../../../../Events";
import Format from "../../../../utilities/Format/Format"

ProductModal.propTypes = {
    handleVisible: PropTypes.func,
    addToCart: PropTypes.func,
    addToWishlist: PropTypes.func,
    details: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string || null,
        categoryName: PropTypes.string,
        rate: PropTypes.number,
        discount: PropTypes.number || null,
        oldPrice: PropTypes.number,
        newPrice: PropTypes.number,
    }),
};

ProductModal.defaultProps = {
    handleVisible: null,
    addToCart: null,
    addToWishlist: null,
};

function ProductModal(props) {
    const [quantity, setQuantity] = useState("1");
    const { handleVisible, addToCart, addToWishlist, details } = props;

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
            quantity > 1 && setQuantity(quantity - 1);
        }
    };

    const addToCartModal = () => {
        if (!addToCart) return;
        addToCart(quantity);
    };

    const addToWishlistModal = () => {
        if (!addToWishlist) return;
        addToWishlist();
    };

    useEffect(() => {
        const modalContent = document.querySelector("#modal-content");
        const id = setTimeout(() => {
            modalContent.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 50);
        return () => clearTimeout(id);
    }, []);

    return (
        <div className="product__modal">
            <div className="modal-overlay" onClick={handleVisible}></div>
            <div className="product__content" id="modal-content">
                <img src={details.image} alt="Product" />

                <div className="product__right">
                    <div className="product__top">
                        <div className="upper">
                            <h1>{details.name}</h1>
                            <FontAwesomeIcon
                                icon={faHeart}
                                id="favourite"
                                title="Add to wishlist"
                                onClick={addToWishlistModal}
                            />
                            {details.discount ? (
                                <span
                                    style={{
                                        textDecoration: "line-through",
                                        marginLeft: "auto",
                                    }}
                                >
                                    {Format.formatPriceWithVND(details.oldPrice)}&nbsp;VND
                                </span>
                            ) : (
                                <span style={{ marginLeft: "auto" }}>
                                    {Format.formatPriceWithVND(details.oldPrice)}&nbsp;VND
                                </span>
                            )}
                        </div>

                        <div className="lower">
                            <span>
                                <FontAwesomeIcon icon={faStar} id="star" /> &nbsp;{" "}
                                {details.rate !== 0 ? details.rate : "N/A"}
                            </span>
                            {details.discount ? (
                                <>
                                    <span id="discount">{details.discount}%</span>
                                    <span style={{ color: "#f72f2f"}}>
                                        {Format.formatPriceWithVND(details.newPrice)}&nbsp;VND
                                    </span>
                                </>
                            ) : null}
                        </div>
                    </div>

                    <span id="content">
                        {details.description ? details.description : "Default product description."}
                    </span>

                    <div className="product__control top">
                        <span style={{fontWeight: "bold"}}>Category:&nbsp;</span>
                        <ul>
                            <li>{details.categoryName}&nbsp;</li>
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
                        <button
                            onClick={() =>
                                MenuPageEventsHandler.trigger("filter", details.categoryName)
                            }
                        >
                            Related product
                        </button>
                        <button onClick={addToCartModal}>ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;
