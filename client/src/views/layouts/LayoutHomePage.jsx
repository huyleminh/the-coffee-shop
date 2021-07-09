import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LayoutAdmin from "../Admin/LayoutAdmin";
import LayoutEmployee from "../Employee/LayoutEmployee";
import PageNotFound from "../errors/PageNotFound";
import HomePage from "./HomePage";

function LayoutHomePage(props) {
    return (
        <Switch>
            <Route path={`/admin`} component={LayoutAdmin} />
            <Route path={`/employee`} component={LayoutEmployee} />
            <Route exact path="/profile" />
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
