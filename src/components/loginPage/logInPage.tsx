import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./loginpage.css";
import { useLocation, Redirect } from "react-router-dom";
import { LocationState } from "../../types/types";
import routesData from "../routesData";
import { ReducerState } from "../../redux/reducerRoot";
import { showSignInModalAction } from "../../redux/modal/actionsModal";

const LogInPage: React.FC = () => {
  const loggedIn = useSelector((state: ReducerState) => state.signIn.loggedIn);
  const { state } = useLocation<LocationState>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loggedIn) {
      dispatch(showSignInModalAction());
    }
  }, [loggedIn]);

  return (
    <div className="logInPage__container">{loggedIn ? <Redirect to={state?.from || routesData[0].path} /> : null}</div>
  );
};

export default LogInPage;
