import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface ProtectedRouteProps extends RouteProps {
  loggedIn: boolean;
  logInFunc: (status: boolean, userName: string) => void;
  // path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ loggedIn, children, ...routeProps }) => (
  <Route
    {...routeProps}
    render={({ loacation }) =>
      loggedIn ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: loacation },
          }}
        />
      )
    }
  />
);

// {
//   if (loggedIn) {
//     return <Route {...routeProps} />;
//   }
//   return (
//     <Redirect
//       to={{
//         pathname: "/login",
//         state: { from: path },
//       }}
//     />
//   );
// };

// (
//   <Route
//     path={path}
//     render={({ loacation }) =>
//       loggedIn ? (
//         children
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/",
//             state: { from: loacation },
//           }}
//         />
//       )
//     }
//   />
// );

export default ProtectedRoute;
