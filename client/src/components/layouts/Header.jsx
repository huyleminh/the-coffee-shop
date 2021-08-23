import { faBars, faHeart, faShoppingCart, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "../../assets/css/layouts/Header.css";
import { HomePageEventsHandler } from "../../Events";

Header.propsType = {
    userStatus: PropTypes.object,
};

function Header(props) {
    const { userStatus } = props;
    const [isScroll, setIsScroll] = useState(false);
    const [isBar, setIsBar] = useState(false);

    const handleBarClick = () => {
        const prev = isBar;
        setIsBar(!prev);
    };

    const handleLogoutClick = () => HomePageEventsHandler.trigger("logout");

    useEffect(() => {
        const scrollHeader = () => {
            const scrollY = window.scrollY;
            if (scrollY > 0) setIsScroll(true);
            else setIsScroll(false);
        };

        window.addEventListener("scroll", scrollHeader);
        return () => {
            window.removeEventListener("scroll", scrollHeader);
        };
    }, []);

    const headerClassname = isScroll ? "header-scroll" : "header-static";
    const logoClassname = isScroll ? "logo-scroll" : "logo-static";
    const visibleClassname = isBar ? "visible" : "";

    return (
        <div className={`header wrapper ${headerClassname}`}>
            <a href="/">
                <div className={`${logoClassname}`}></div>
            </a>

            <div className={`header__navbar ${visibleClassname}`}>
                <div className="header__navigation">
                    <ul>
                        <li>
                            <a href="/">HOME</a>
                        </li>
                        <li>
                            <a href="/menu">MENU</a>
                        </li>
                        <li>
                            <a href="/#about">ABOUT</a>
                        </li>
                        <li>
                            <a href="/#contact">CONTACT</a>
                        </li>
                        {userStatus.role === 1 ? (
                            <li>
                                <a href="/admin">ADMIN</a>
                            </li>
                        ) : null}
                        {userStatus.role === 2 ? (
                            <li>
                                <a href="/employee">EMPLOYEE</a>
                            </li>
                        ) : null}
                    </ul>
                </div>

                <div className="header__right">
                    {userStatus.isLogin ? (
                        <ul>
                            <li className="shopping">
                                <a
                                    href="/wishlist"
                                    style={{ fontSize: "1.75rem" }}
                                    id="wishlist"
                                >
                                    <FontAwesomeIcon icon={faHeart} />
                                </a>
                            </li>
                            <li className="shopping">
                                <a
                                    href="/cart"
                                    style={{ fontSize: "1.75rem" }}
                                    id="cart"
                                >
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </a>
                            </li>

                            <li className="shopping" id="user">
                                <a href="/profile" style={{ fontSize: "1.75rem" }}>
                                    <FontAwesomeIcon icon={faUserCircle} />
                                </a>
                                <div className="dropdown-content">
                                    <a href="/profile">Manage profle</a>
                                    <a href="/profile/orders/history">Orders history</a>
                                    {/* eslint-disable-next-line */}
                                    <a onClick={handleLogoutClick}>Logout</a>
                                </div>
                            </li>
                        </ul>
                    ) : (
                        <ul>
                            <li className="shopping">
                                <a href="/wishlist" style={{ fontSize: "1.75rem" }} id="wishlist">
                                    <FontAwesomeIcon icon={faHeart} />
                                </a>
                            </li>
                            <li className="shopping">
                                <a href="/cart" style={{ fontSize: "1.75rem" }} id="cart">
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
