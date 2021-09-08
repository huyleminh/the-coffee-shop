import { faBars, faHeart, faShoppingCart, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
            <Link to="/">
                <div className={`${logoClassname}`}></div>
            </Link>

            <div className={`header__navbar ${visibleClassname}`}>
                <div className="header__navigation">
                    <ul>
                        <li>
                            <Link to="/">HOME</Link>
                        </li>
                        <li>
                            <Link to="/menu">MENU</Link>
                        </li>
                        <li>
                            <Link to={{ pathname: "/", hash: "#about" }}>ABOUT</Link>
                        </li>
                        <li>
                            <Link to={{ pathname: "/", hash: "#contact" }}>CONTACT</Link>
                        </li>
                        {userStatus.role === 1 ? (
                            <li>
                                <Link to="/admin">ADMIN</Link>
                            </li>
                        ) : null}
                        {userStatus.role === 2 ? (
                            <li>
                                <Link to="/employee">EMPLOYEE</Link>
                            </li>
                        ) : null}
                    </ul>
                </div>

                <div className="header__right">
                    {userStatus.isLogin ? (
                        <ul>
                            <li className="shopping">
                                <Link to="/wishlist" style={{ fontSize: "1.75rem" }} id="wishlist">
                                    <FontAwesomeIcon icon={faHeart} />
                                </Link>
                            </li>
                            <li className="shopping">
                                <Link to="/cart" style={{ fontSize: "1.75rem" }} id="cart">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </Link>
                            </li>

                            <li className="shopping" id="user">
                                <Link to="/profile" style={{ fontSize: "1.75rem" }}>
                                    <FontAwesomeIcon icon={faUserCircle} />
                                </Link>
                                <div className="dropdown-content">
                                    <Link to="/profile">Manage profle</Link>
                                    <Link to="/profile/orders/history">Orders history</Link>
                                    <Link to="" onClick={handleLogoutClick}>
                                        Logout
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    ) : (
                        <ul>
                            <li className="shopping">
                                <Link to="/wishlist" style={{ fontSize: "1.75rem" }} id="wishlist">
                                    <FontAwesomeIcon icon={faHeart} />
                                </Link>
                            </li>
                            <li className="shopping">
                                <Link to="/cart" style={{ fontSize: "1.75rem" }} id="cart">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </Link>
                            </li>

                            <li id="login">
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup">Signup</Link>
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
