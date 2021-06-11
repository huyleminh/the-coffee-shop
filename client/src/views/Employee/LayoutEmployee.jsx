import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PageNotFound from "../errors/PageNotFound";

function LayoutEmployee(props) {
    return (
        <div>
            <Switch>
                <Route>
                    <Redirect to="/404">
                        <PageNotFound />
                    </Redirect>
                </Route>
            </Switch>
        </div>
    );
}

export default LayoutEmployee;
