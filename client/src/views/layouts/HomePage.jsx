import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "../../assets/css/layouts/HomePage.css";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import Loading from "../../components/Loading";
import LoginAPI from "../../services/Login/LoginAPI";
import PageNotFound from "../errors/PageNotFound";
import LandingPage from "./LandingPage/LandingPage";

function HomePage() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [userStatus, setUserStatus] = useState({ isLogin: false, role: 3 });

    const [headerState, setHeaderState] = useState({ isScroll: false, isVisible: false });

    const toggleHeaderBar = () => {
        const prevVisible = { ...headerState };
        prevVisible.isVisible = !prevVisible.isVisible;
        setHeaderState(prevVisible);
    };

    const clearLocal = () => {
        localStorage.removeItem("user");
    };

    const handleLogout = () => {
        const check = window.confirm("Are you sure to logout?");
        if (!check) return;
        clearLocal();
        setUserStatus({ isLogin: false, role: 3 });
    };

    useEffect(() => {
        const checkLogin = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            let isOk = true;
            if (!user) {
                isOk = false;
            } else {
                const { token, expriredIn, role } = user;
                if (!token) {
                    isOk = false;
                } else {
                    if (!expriredIn || new Date().valueOf() > expriredIn) {
                        isOk = false;
                    } else {
                        try {
                            const response = await LoginAPI.verifyAccessToken(token);
                            if (response.status === 200)
                                setUserStatus({ isLogin: true, role: role });
                            else {
                                isOk = false;
                            }
                        } catch (e) {
                            console.log(e);
                            isOk = false;
                        }
                    }
                }
            }

            if (!isOk) {
                setUserStatus({ isLogin: false, role: 3 });
                alert("Your session has expired.");
                history.push("/login");
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 800);
        };

        checkLogin();
    }, [history]);

    useEffect(() => {
        const scrollHeader = () => {
            const scrollY = window.scrollY;
            if (scrollY > 0) {
                setHeaderState({ ...headerState, isScroll: true });
            } else setHeaderState({ ...headerState, isScroll: false });
        };
        window.addEventListener("scroll", scrollHeader);
        return () => window.removeEventListener("scroll", scrollHeader);
    });

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
            <div
                onClick={() =>
                    headerState.isVisible && setHeaderState({ ...headerState, isVisible: false })
                }
            >
                <Header
                    userStatus={userStatus}
                    state={headerState}
                    toggleHeaderBar={toggleHeaderBar}
                    handleLogout={handleLogout}
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
