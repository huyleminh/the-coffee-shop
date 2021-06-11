import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LayoutAdmin from "../Admin/LayoutAdmin";
import LayoutEmployee from "../Employee/LayoutEmployee";
import PageNotFound from "../errors/PageNotFound";
import HomePage from "./HomePage";

function LayoutHomePage(props) {
    return (
        <Switch>
            <Route path={`/dashboard/admin`} component={LayoutAdmin} />
            <Route path={`/dashboard/employee`} component={LayoutEmployee} />
            <Route exact path="/" component={HomePage} />
            <Route>
                <Redirect to="/404">
                    <PageNotFound />
                </Redirect>
            </Route>
        </Switch>
    );
}

export default LayoutHomePage;
