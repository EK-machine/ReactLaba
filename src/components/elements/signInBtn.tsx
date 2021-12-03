import React from "react";
import "./signinbtn.css";
import { useHistory } from "react-router-dom";
import Modal from "./modal";
import SignInModalBody from "./signInModalBody";
import { SignInBtnProps } from "../../types/types";
import routesData from "../routesData";

const SignInBtn: React.FC<SignInBtnProps> = ({
  dispatchedLogInAction,
  showSignInModalFunc,
  closeModalFunc,
  showSignInModal,
}) => {
  const history = useHistory();
  const showModalHandler = () => {
    showSignInModalFunc();
  };

  const closeModalHandler = () => {
    closeModalFunc();
    history.push(routesData[0].path);
  };

  return (
    <div className="signIn__container">
      <button type="button" className="signIn__btn" onClick={showModalHandler}>
        <p className="signIn__title">Sign In</p>
      </button>
      {showSignInModal ? (
        <Modal>
          <SignInModalBody dispatchedLogInAction={dispatchedLogInAction} closeModalFunc={closeModalHandler} />
        </Modal>
      ) : null}
    </div>
  );
};

export default SignInBtn;
