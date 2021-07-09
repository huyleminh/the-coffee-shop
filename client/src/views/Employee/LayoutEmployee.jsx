import { Layout } from "antd";
import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import MenuLeft from "../../components/navigation/MenuLeft";
import PageNotFound from "../errors/PageNotFound";
import OrderManagement from "./orders/OrderManagement";

const { Header, Content } = Layout;

function LayoutEmployee(props) {
    const match = useRouteMatch();
    const menulist = [];

    return (
        <Layout>
            <MenuLeft></MenuLeft>
            <Layout>
                <DashboardHeader></DashboardHeader>

                <Content>
                    <Switch>
                        <Route exact path={`${match.path}/manage/orders`} component={OrderManagement} />
                        <Route exact path={`${match.path}/profile`} />
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
            </Layout>
        </Layout>
    );
}

export default LayoutEmployee;
