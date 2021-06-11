import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PageNotFound from "../errors/PageNotFound";

LayoutAdmin.propTypes = {};

function LayoutAdmin(props) {
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

export default LayoutAdmin;
