import { Redirect, Route, Switch } from "react-router-dom";
import Forbidden from "./views/errors/Forbidden";
import PageNotFound from "./views/errors/PageNotFound";
import LayoutHomePage from "./views/layouts/LayoutHomePage";
import Login from "./views/layouts/Login";
import Signup from "./views/layouts/Signup";

function App() {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/403" component={Forbidden} />
            <Route exact path="/404" component={PageNotFound} />
            <Route path="/" component={LayoutHomePage} />
            <Route>
                <Redirect to="/404">
                    <PageNotFound />
                </Redirect>
            </Route>
        </Switch>
    );
}

export default App;
