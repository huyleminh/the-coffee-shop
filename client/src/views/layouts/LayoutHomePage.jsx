import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LayoutAdmin from "../Admin/LayoutAdmin";
import LayoutEmployee from "../Employee/LayoutEmployee";
import PageNotFound from "../errors/PageNotFound";
import HomePage from "./HomePage";
import PrivateRoute from "../../components/routes/PrivateRoute";

function LayoutHomePage(props) {
    return (
        <Switch>
            <PrivateRoute path={`/admin`} component={LayoutAdmin} />
            <PrivateRoute path={`/employee`} component={LayoutEmployee} />
            <Route path="/" component={HomePage} />
            <Route>
                <Redirect to="/404">
                    <PageNotFound />
                </Redirect>
            </Route>
        </Switch>
    );
}

export default LayoutHomePage;
