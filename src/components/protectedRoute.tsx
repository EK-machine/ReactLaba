import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { ReducerState } from "../redux/reducerRoot";

const ProtectedRoute: React.FC<RouteProps> = ({ children, location, ...routeProps }) => {
  const loggedIn = useSelector((state: ReducerState) => state.signIn.loggedIn);
  return (
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
};

export default ProtectedRoute;
