import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "antd";
import React from "react";
import "../../../../assets/css/layouts/menu/ProductItem.css";
import Latte from "../../../../assets/images/latte.jpg";

// ProductItem.propTypes = {};

function ProductItem(props) {
    return (
        <Card
            hoverable
            cover={
                <div className="custom-cover">
                    <div className="opacity"></div>
                    <span className="sale">25%</span>
                    <img src={Latte} alt="product" />
                    <FontAwesomeIcon icon={faHeart} className="favourite" />
                    <button>Add to cart</button>
                </div>
            }
            className="custom-card"
        >
            <div className="custom-body">
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
    );
}

export default ProductItem;
