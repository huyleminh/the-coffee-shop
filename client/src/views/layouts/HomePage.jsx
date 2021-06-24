import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "../../assets/css/layouts/HomePage.css";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import PageNotFound from "../errors/PageNotFound";
import LandingPage from "./LandingPage/LandingPage";

function HomePage() {
    const [isScroll, setIsScroll] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isLogin, setLogin] = useState(() => {
        const token = localStorage.getItem("access_token");
        if (token) return true;
        else return false;
    });

    useEffect(() => {
        const scrollHeader = () => {
            const scrollY = window.scrollY;
            if (scrollY > 0) {
                setIsScroll(true);
            } else setIsScroll(false);
        };
        window.addEventListener("scroll", scrollHeader);
        return () => window.removeEventListener("scroll", scrollHeader);
    }, []);

    const toggleHeaderBar = () => {
        const prevVisible = isVisible;
        setIsVisible(!prevVisible);
    };

    return (
        <div onClick={() => { if (isVisible) setIsVisible(false)}}>
            <Header
                login={isLogin}
                scroll={isScroll}
                visible={isVisible}
                toggleHeaderBar={toggleHeaderBar}
            />

            <div className="overlay"></div>

            <Layout className="container">
                <Switch>
                    <Route exact path="/profile" />
                    <Route exact path="/menu" />
                    <Route exact path="/cart" />
                    <Route exact path="/wishlist" />
                    <Route exact path="/" component={LandingPage} />
                    <Route>
                        <Redirect to="/404">
                            <PageNotFound />
                        </Redirect>
                    </Route>
                </Switch>
            </Layout>

            <Footer />
        </div>
    );
}

export default HomePage;
