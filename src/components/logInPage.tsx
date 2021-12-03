import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { useSelector, connect } from "react-redux";
import "./loginpage.css";
import { useLocation, Redirect, useHistory } from "react-router-dom";
import { logInAction } from "@/redux/actions";
import Modal from "./elements/modal";
import SignInModalBody from "./elements/signInModalBody";
import { LogInPageProps, LocationState } from "../types/types";
import routesData from "./routesData";
import { ReducerState } from "../redux/reducer";

const LogInPage: React.FC<LogInPageProps> = ({
  closeModalFunc,
  showSignInModalFunc,
  dispatchedLogInAction,
  showSignInModal,
}) => {
  const loggedIn = useSelector((state: ReducerState) => state.loggedIn);
  const { state } = useLocation<LocationState>();
  const history = useHistory();

  const closeModalHandler = () => {
    closeModalFunc();
    history.push(routesData[0].path);
  };

  useEffect(() => {
    showSignInModalFunc();
  }, []);

  return (
    <div className="logInPage__container">
      {loggedIn ? (
        <Redirect to={state?.from || routesData[0].path} />
      ) : (
        <div>
          {showSignInModal ? (
            <Modal>
              <SignInModalBody dispatchedLogInAction={dispatchedLogInAction} closeModalFunc={closeModalHandler} />
            </Modal>
          ) : null}
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchedLogInAction: (userName: string) => dispatch(logInAction(userName)),
});

export default connect(null, mapDispatchToProps)(LogInPage);
