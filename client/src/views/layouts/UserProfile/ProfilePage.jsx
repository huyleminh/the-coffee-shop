import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout } from "antd";
import React, { useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import MenuImage from "../../../assets/images/menu.jpg";
import defaultAvatar from "../../../assets/images/store-logo.png";
import Hero from "../../../components/layouts/Hero";
import OrderHistory from "./Orders/OrderHistory";
import UserProfile from "./Profile/UserProfile";

const { Content } = Layout;

ProfilePage.propTypes = {};

function ProfilePage(props) {
    const match = useRouteMatch();
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        if (isSidebarVisible) setIsSidebarVisible(false);
        else setIsSidebarVisible(true);
    };

    const activeClassname = isSidebarVisible ? "active" : null;

    return (
        <Content>
            <Hero title="Profile" sologan="" image={MenuImage} />
            <div className="wrapper profile">
                <div className={`profile__sidebar ${activeClassname}`}>
                    <FontAwesomeIcon icon={faTimes} id="exit" onClick={toggleSidebar} />
                    <img src={defaultAvatar} alt="defaultAvatar" className="avatar"></img>
                    <ul className="nav__sidebar">
                        <li>
                            <a href="/profile">Profile</a>
                        </li>
                        <li>
                            <a href="/profile/orders/history">Order History</a>
                        </li>
                        <li>
                            <a href="/profile">Voucher</a>
                        </li>
                    </ul>
                </div>

                {isSidebarVisible ? (
                    <div
                        className="sidebar-overlay"
                        onClick={() => {
                            isSidebarVisible && setIsSidebarVisible(false);
                        }}
                    ></div>
                ) : null}

                <div className="profile__manipulation">
                    <div className={`profile__bar ${activeClassname}`} onClick={toggleSidebar}>
                        <span>Profile sidebar</span>
                    </div>
                    <Content>
                        <Switch>
                            <Route exact path={`${match.path}`} component={UserProfile} />
                            <Route
                                exact
                                path={`${match.path}/orders/history`}
                                component={OrderHistory}
                            />
                            <Route exact path={`${match.path}/vouchers`} />
                            <Route>
                                <Redirect to="/404" />
                            </Route>
                        </Switch>
                    </Content>
                </div>
            </div>
        </Content>
    );
}

export default ProfilePage;
