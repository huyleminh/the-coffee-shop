import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "../../assets/css/layouts/HomePage.css";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import Loading from "../../components/Loading";
import PrivateRoute from "../../components/routes/PrivateRoute";
import ScrollTopButton from "../../components/ScrollTopButton";
import { HomePageEventsHandler } from "../../Events";
import PageNotFound from "../errors/PageNotFound";
import CheckoutPage from "./Checkout/CheckoutPage";
import LandingPage from "./LandingPage/LandingPage";
import MenuPage from "./MenuPage/MenuPage";
import UserProfile from "./UserProfile/UserProfile";
import Wishlist from "./wishlist/Wishlist"

function HomePage() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
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
    }, []);

    useEffect(() => {
        const checkLogin = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                const { token, expiredIn, role } = user;
                if (!token || !expiredIn) {
                    clearLocal();
                    setUserStatus({ isLogin: false, role: 3 });
                } else {
                    if (new Date().valueOf() > expiredIn) {
                        alert("Your session has expired.");
                        history.push("/login");
                        return;
                    } else {
                        setUserStatus({ isLogin: true, role: role });
                    }
                }
            } else {
                clearLocal();
                setUserStatus({ isLogin: false, role: 3 });
            }

            setTimeout(() => {
                setIsLoading(false);
            }, 800);
        };

        if (isLoading) checkLogin();
        // eslint-disable-next-line
    }, []);

    if (isLoading)
        return (
            <Loading
                style={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            />
        );
    else
        return (
            <div>
                <Header userStatus={userStatus} />

                <Layout className="container">
                    <Switch>
                        <PrivateRoute exact path="/profile" component={UserProfile} />
                        <Route exact path="/menu" component={MenuPage} />
                        <Route exact path="/cart" />
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
