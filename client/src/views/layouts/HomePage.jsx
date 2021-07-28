import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "../../assets/css/layouts/HomePage.css";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import PrivateRoute from "../../components/routes/PrivateRoute";
import ScrollTopButton from "../../components/ScrollTopButton";
import { HomePageEventsHandler } from "../../Events";
import PageNotFound from "../errors/PageNotFound";
import CartLayout from "./CartLayout/CartLayout";
import CheckoutPage from "./Checkout/CheckoutPage";
import LandingPage from "./LandingPage/LandingPage";
import MenuPage from "./MenuPage/MenuPage";
import ProfilePage from "./UserProfile/ProfilePage";
import Wishlist from "./wishlist/Wishlist";

function HomePage() {
    const history = useHistory();
    const [userStatus, setUserStatus] = useState({ isLogin: false, role: 3 });

    const clearLocal = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("profile");
    };

    const handleLogout = () => {
        const check = window.confirm("Are you sure to logout?");
        if (!check) return;
        clearLocal();
        setUserStatus({ isLogin: false, role: 3 });
        history.push("/");
    };

    useEffect(() => {
        HomePageEventsHandler.subcribe("logout", handleLogout);

        return () => {
            HomePageEventsHandler.unSubcribe("logout", handleLogout);
        };
    });

    useEffect(() => {
        const checkLogin = () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                const { token, expiredIn, role } = user;
                if (!token || !expiredIn) {
                    clearLocal();
                    setUserStatus({ isLogin: false, role: 3 });
                } else {
                    if (new Date().valueOf() > expiredIn) {
                        alert("Your session has expired.");
                        clearLocal();
                        setUserStatus({ isLogin: false, role: 3 });
                    } else {
                        setUserStatus({ isLogin: true, role: role });
                    }
                }
            } else {
                clearLocal();
                setUserStatus({ isLogin: false, role: 3 });
            }
        };

        checkLogin();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <Header userStatus={userStatus} />

                <Layout className="container">
                    <Switch>
                        <PrivateRoute path="/profile" component={ProfilePage} />
                        <Route exact path="/menu" component={MenuPage} />
                        <Route exact path="/cart" component={CartLayout} />
                        <Route exact path="/wishlist" component={Wishlist} />
                        <PrivateRoute exact path="/checkout" component={CheckoutPage} />
                        <Route exact path="/" component={LandingPage} />
                        <Route>
                            <Redirect to="/404">
                                <PageNotFound />
                            </Redirect>
                        </Route>
                    </Switch>
                </Layout>

            <ScrollTopButton />

            <Footer />
        </div>
    );
}

export default HomePage;
