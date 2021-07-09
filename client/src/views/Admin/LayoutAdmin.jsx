import { Layout } from "antd";
import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import MenuLeft from "../../components/navigation/MenuLeft";
import PageNotFound from "../errors/PageNotFound";
import EmployeeManagement from "./employees/EmployeeManagement";
import IngredientManagement from "./ingredients/IngredientManagement";
import ProductManagement from "./products/ProductManagement";
import StatisticManagement from "./statistics/StatisticManagement";

LayoutAdmin.propTypes = {};

const { Header, Content, Sider } = Layout;

function LayoutAdmin(props) {
    const match = useRouteMatch();
    const menulist = [];

    return (
        <Layout>
            <MenuLeft></MenuLeft>
            <Layout>
                <DashboardHeader></DashboardHeader>

                <Content>
                    <Switch>
                        <Route
                            exact
                            path={`${match.path}/manage/statistics`}
                            component={StatisticManagement}
                        />
                        <Route
                            exact
                            path={`${match.path}/manage/employees`}
                            component={EmployeeManagement}
                        />
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
                        <Route exact path={`${match.path}/profile`} />
                        <Route exact path={`${match.path}`}>
                            <Redirect to={`${match.path}/manage/statistics`} />
                        </Route>
                        <Route>
                            <Redirect to="/404">
                                <PageNotFound />
                            </Redirect>
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

export default LayoutAdmin;
