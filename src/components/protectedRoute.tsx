import React from "react";
import { Route, Redirect } from "react-router-dom";

interface ProtectedRouteProps {
  path: string;
  children: React.ReactNode;
  loggedIn: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, path, loggedIn }) => {
  <Route
    path={path}
    render={({ loacation }) =>
      loggedIn ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: loacation },
          }}
        />
      )
    }
  />;
};

export default ProtectedRoute;
