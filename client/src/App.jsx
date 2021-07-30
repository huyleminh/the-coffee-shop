import { Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import LayoutAdmin from "./views/Admin/LayoutAdmin";
import LayoutEmployee from "./views/Employee/LayoutEmployee";
import Forbidden from "./views/errors/Forbidden";
import PageNotFound from "./views/errors/PageNotFound";
import HomePage from "./views/layouts/HomePage";
import Login from "./views/layouts/Login";
import Signup from "./views/layouts/Signup";

function App() {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/403" component={Forbidden} />
            <Route exact path="/404" component={PageNotFound} />
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

export default App;
