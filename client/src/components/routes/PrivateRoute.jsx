import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import LoginAPI from "../../services/Login/LoginAPI";
import Loading from "../Loading";

const matchRole = (pathRole, userRole) => {
    if (pathRole === 1) return userRole === 1;
    if (pathRole === 2) return userRole === 2;
    if (pathRole === 3) return true;
};

function PrivateRoute(props) {
    const { component, ...rest } = props;
    const [isAuth, setIsAuth] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const path = props.path;

    useEffect(() => {
        const fetchToken = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                setIsAuth(false);
                setIsAuthenticating(false);
                return;
            }
            if (user && !user.token) {
                setIsAuth(false);
                setIsAuthenticating(false);
                return;
            }

            // Find valid role of current path name
            const currRole = path.match(/^\/admin/g) ? 1 : path.match(/^\/employee/g) ? 2 : 3;
            try {
                const res = await LoginAPI.verifyAccessToken(user.token);

                if (res.status === 200 && matchRole(currRole, res.data.role)) {
                    setIsAuth(true);
                    setIsAuthenticating(false);
                } else {
                    setIsAuth(false);
                    setIsAuthenticating(false);
                }
            } catch (error) {
                console.log(error);
                setIsAuth(false);
                setIsAuthenticating(false);
            }
        };

        fetchToken();
    }, [path]);

    if (isAuthenticating)
        return (
            <Loading
                style={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            />
        );

    if (isAuth) {
        const AuthenticatedLayout = component;
        return <Route {...rest} render={<AuthenticatedLayout />} />;
    } else {
        alert("You are not allowed to access this page!");
        return <Redirect to="/403" />;
    }
}

export default PrivateRoute;
