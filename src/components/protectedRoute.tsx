import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface ProtectedRouteProps extends RouteProps {
  loggedIn: boolean;
  logInFunc: (status: boolean, userName: string) => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ loggedIn, children, location, ...routeProps }) => (
  <Route
    {...routeProps}
    render={() =>
      loggedIn ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location?.pathname },
          }}
        />
      )
    }
  />
);

export default ProtectedRoute;
