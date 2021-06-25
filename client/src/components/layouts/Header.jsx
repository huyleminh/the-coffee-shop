import { faBars, faHeart, faShoppingCart, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import "../../assets/css/layouts/Header.css";

Header.propsType = {
    login: PropTypes.bool,
    scroll: PropTypes.bool,
    visible: PropTypes.bool,
    toggleHeaderBar: PropTypes.func,
};

function Header(props) {
    const { login, scroll, visible, toggleHeaderBar } = props;
    const headerClassname = scroll ? "header-scroll" : "header-static";
    const visibleClassname = visible ? "visible" : "";

    const handleBarClick = () => {
        if (!toggleHeaderBar) return;
        toggleHeaderBar();
    };

    return (
        <div className={`header wrapper ${headerClassname}`}>
            <a href="/">
                <div className="header__logo"></div>
            </a>

            <div className={`header__navbar ${visibleClassname}`}>
                <div className="header__navigation">
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/menu">Menu</a>
                        </li>
                        <li>
                            <a href="/#about">About</a>
                        </li>
                        <li>
                            <a href="/#contact">Contact</a>
                        </li>
                    </ul>
                </div>

                <div className="header__right">
                    {login ? (
                        <ul>
                            <li className="shopping" >
                                <a href="/wishlist" style={{ fontSize: "1.75rem" }} id="wishlist">
                                    <FontAwesomeIcon icon={faHeart} />
                                </a>
                            </li>
                            <li className="shopping" >
                                <a href="/cart" style={{ fontSize: "1.75rem" }} id="cart">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </a>
                            </li>

                            <li className="shopping" id="user">
                                <a style={{ fontSize: "1.75rem" }}>
                                    <FontAwesomeIcon icon={faUserCircle} />
                                </a>
                                <div class="dropdown-content">
                                    <a href="/profile">Manage profle</a>
                                    <a>Logout</a>
                                </div>
                            </li>
                        </ul>
                    ) : (
                        <ul>
                            <li className="shopping">
                                <a href="/wishlist" style={{ fontSize: "1.75rem" }}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </a>
                            </li>
                            <li className="shopping">
                                <a href="/cart" style={{ fontSize: "1.75rem" }}>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </a>
                            </li>

                            <li id="login">
                                <a href="/login">Login</a>
                            </li>
                            <li>
                                <a href="/signup">Signup</a>
                            </li>
                        </ul>
                    )}
                </div>
            </div>

            <div className="bars">
                <FontAwesomeIcon icon={faBars} onClick={handleBarClick} />
            </div>
        </div>
    );
}

export default Header;
