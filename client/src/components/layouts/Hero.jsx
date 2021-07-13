import React from "react";
import PropTypes from "prop-types";
import "../../assets/css/layouts/Hero.css";

Hero.propTypes = {
    title: PropTypes.string,
    sologan: PropTypes.string,
    image: PropTypes.any,
};

function Hero(props) {
    const { title, sologan, image } = props;
    return (
        <div>
            <div className="custom-overlay"></div>
            <div className="custom-hero" >
                <h1>{title}</h1>
                <span>{sologan}</span>
                <img src={image} alt="Hero" />
            </div>
        </div>
    );
}

export default Hero;
