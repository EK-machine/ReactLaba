import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute: React.FC = ({ children, location, ...routeProps }) => {
  const loggedIn = useSelector((state) => state.loggedIn);
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
