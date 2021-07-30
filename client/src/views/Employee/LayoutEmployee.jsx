import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
    faArrowLeft,
    faHome,
    faIdBadge,
    faListUl,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import LogoStore from "../../assets/images/store-logo.png";
// import MenuLeft from "../../components/navigation/MenuLeft";
import PageNotFound from "../errors/PageNotFound";
import OrderManagement from "./orders/OrderManagement";

const { Header, Sider, Content, Footer } = Layout;

function LayoutEmployee() {
    const match = useRouteMatch();
    const [collapsed, setCollapsed] = useState(false);

    const toggleSiderbar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className="custom-site-dashboard">
            <Sider trigger={null} collapsible collapsed={collapsed} width="300px" breakpoint="md">
                <div className="custom-menu__logo">
                    <img src={LogoStore} alt="logo" />
                    <h1>The coffee shop</h1>
                </div>
                <Menu theme="dark" mode="vertical">
                    <Menu.Item key="home" icon={<FontAwesomeIcon icon={faHome} />}>
                        <a href={`${match.path}/manage/orders`}>Home</a>
                    </Menu.Item>
                    <Menu.Item key="orders" icon={<FontAwesomeIcon icon={faListUl} />}>
                        <a href={`${match.path}/manage/orders`}>Orders</a>
                    </Menu.Item>
                    <Menu.Item key="profile" icon={<FontAwesomeIcon icon={faIdBadge} />}>
                        <a href={`/profile`}>Manage profile</a>
                    </Menu.Item>
                    <Menu.Item key="back" icon={<FontAwesomeIcon icon={faArrowLeft} />}>
                        <a href="/menu">Back to shop</a>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout className="custom-site-content">
                <Header className="custom-site-content__header">
                    {collapsed ? (
                        <MenuUnfoldOutlined className="trigger" onClick={toggleSiderbar} />
                    ) : (
                        <MenuFoldOutlined className="trigger" onClick={toggleSiderbar} />
                    )}
                    <div className="custom-site-content__user">
                        <FontAwesomeIcon id="dashboard-user" icon={faUserCircle} />
                        <div className="custom-site-content__dropdown">
                            <span>Logout</span>
                        </div>
                    </div>
                </Header>

                <Content className="custom-site-main">
                    <Switch>
                        <Route
                            exact
                            path={`${match.path}/manage/orders`}
                            component={OrderManagement}
                        />
                        <Route exact path={`/profile`} />
                        <Route exact path={`${match.path}`}>
                            <Redirect to={`${match.path}/manage/orders`} />
                        </Route>
                        <Route>
                            <Redirect to="/404">
                                <PageNotFound />
                            </Redirect>
                        </Route>
                    </Switch>
                </Content>

                <Footer style={{ textAlign: "center", color: "#503a24" }}>
                    The Coffe Shop ©2021 Created by Ga Chien Pro Max
                </Footer>
            </Layout>
        </Layout>
    );
}

export default LayoutEmployee;
