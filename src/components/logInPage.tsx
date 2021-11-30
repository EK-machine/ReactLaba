import React, { useEffect } from "react";
import "./loginpage.css";
import { useLocation, Redirect } from "react-router-dom";

import Modal from "./elements/modal";
import SignInModalBody from "./elements/signInModalBody";
import { LogInPageProps } from "../types/types";

const LogInPage: React.FC<LogInPageProps> = ({ logInFunc, closeModalFunc, showModal, showModalFunc, logInState }) => {
  const { state } = useLocation();

  const closeModalHandler = () => {
    closeModalFunc();
  };

  useEffect(() => {
    showModalFunc();
    console.log(state);
  }, []);

  return (
    <div className="logInPage__container">
      {logInState ? (
        <Redirect to={state?.from || "/"} />
      ) : (
        <div>
          {showModal ? (
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
