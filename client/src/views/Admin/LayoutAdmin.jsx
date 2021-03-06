import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
    faArrowLeft,
    faChartBar,
    faCube,
    faHome,
    faIdBadge,
    faListAlt,
    faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link, Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import LogoStore from "../../assets/images/store-logo.png";
import PageNotFound from "../errors/PageNotFound";
import EmployeeManagement from "./employees/EmployeeManagement";
import IngredientManagement from "./ingredients/IngredientManagement";
import ProductManagement from "./products/ProductManagement";
import StatisticManagement from "./statistics/StatisticManagement";

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

function LayoutAdmin() {
    const history = useHistory();
    const match = useRouteMatch();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const toggleSiderbar = () => {
        setCollapsed(!collapsed);
    };

    const selectedKeys = location.pathname.split("/")[3];

    return (
        <Layout className="custom-site-dashboard">
            <Sider trigger={null} collapsible collapsed={collapsed} width="300px" breakpoint="md">
                <div className="custom-menu__logo">
                    <img src={LogoStore} alt="Logo" />
                    <h1>The coffee shop</h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultOpenKeys={["management"]}
                    selectedKeys={[selectedKeys]}
                >
                    <Menu.Item key="home" icon={<FontAwesomeIcon icon={faHome} />}>
                        <Link to={`${match.path}/manage/products`}>Home</Link>
                    </Menu.Item>
                    <SubMenu
                        key="management"
                        title="Management"
                        icon={<FontAwesomeIcon icon={faListAlt} />}>
                            <Menu.Item key="products" icon={<FontAwesomeIcon icon={faCube}/>}>
                                <Link to={`${match.path}/manage/products`}>Products</Link>
                            </Menu.Item>
                            <Menu.Item key="ingredients" icon={<FontAwesomeIcon icon={faCube}/>}>
                                <Link to={`${match.path}/manage/ingredients`}>Ingredients</Link>
                            </Menu.Item>
                            <Menu.Item key="employees" icon={<FontAwesomeIcon icon={faUserCircle} />}>
                                <Link to={`${match.path}/manage/employees`}>Employees</Link>
                            </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="statistics" icon={<FontAwesomeIcon icon={faChartBar} />}>
                        <Link to={`${match.path}/manage/statistics`}>Statistics</Link>
                    </Menu.Item>

                    <Menu.Item key="profile" icon={<FontAwesomeIcon icon={faIdBadge} />}>
                        <Link to={`/profile`}>Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="back" icon={<FontAwesomeIcon icon={faArrowLeft} />}>
                        <Link to="/menu">Back to shop</Link>
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
                            <span
                                onClick={() => {
                                    localStorage.removeItem("user");
                                    history.push("/");
                                }}
                            >
                                Logout
                            </span>
                        </div>
                    </div>
                </Header>

                <Content className="custom-site-main">
                    <Switch>
                        <Route
                            exact
                            path={`${match.path}/manage/products`}
                            component={ProductManagement}
                        />
                        <Route
                            exact
                            path={`${match.path}/manage/ingredients`}
                            component={IngredientManagement}
                        />
                        <Route
                            exact
                            path={`${match.path}/manage/employees`}
                            component={EmployeeManagement}
                        />
                        <Route
                            exact
                            path={`${match.path}/manage/statistics`}
                            component={StatisticManagement}
                        />
                        <Route exact path={`${match.path}`}>
                            <Redirect to={`${match.path}/manage/products`} />
                        </Route>
                        <Route exact path={`/profile`} />
                        <Route>
                            <Redirect to="/404">
                                <PageNotFound />
                            </Redirect>
                        </Route>
                    </Switch>
                </Content>

                <Footer style={{ textAlign: "center", color: "#503a24" }}>
                    The Coffee Shop ??2021 Created by Ga Chien Pro Max
                </Footer>
            </Layout>
        </Layout>
    );
}

export default LayoutAdmin;
