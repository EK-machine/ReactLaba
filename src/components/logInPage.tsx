import React, { useEffect } from "react";
import "./loginpage.css";
import { useLocation, Redirect, useHistory } from "react-router-dom";
import Modal from "./elements/modal";
import SignInModalBody from "./elements/signInModalBody";
import { LogInPageProps, LocationState } from "../types/types";
import routesData from "./routesData";

const LogInPage: React.FC<LogInPageProps> = ({
  logInFunc,
  closeModalFunc,
  showSignInModalFunc,
  showSignInModal,
  logInState,
}) => {
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
      {logInState ? (
        <Redirect to={state?.from || routesData[0].path} />
      ) : (
        <div>
          {showSignInModal ? (
            <Modal>
              <SignInModalBody logInFunc={logInFunc} closeModalFunc={closeModalHandler} />
            </Modal>
          ) : null}
        </div>
      )}
    </div>
  );
};
export default LogInPage;
