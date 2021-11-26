import React, { useState } from "react";
import "./signinbtn.css";
import Modal from "./modal";
import InputText from "./inputText";
import { SignInBtnProps } from "../../types/types";

const SignInBtn: React.FC<SignInBtnProps> = ({ logInFunc }): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const showModalFunc = () => {
    setShowModal(true);
  };

  const closeModalFunc = () => {
    setShowModal(false);
  };

  return (
    <div className="signIn__container">
      <button type="button" className="signIn__btn" onClick={showModalFunc}>
        <p className="signIn__title">Sign In</p>
      </button>
      {showModal ? (
        <Modal>
          <div className="signIn__modal_container">
            <div className="signIn__modal_upper-container">
              <h1>Authorization</h1>
              <button type="button" onClick={closeModalFunc}>
                Close
              </button>
            </div>
            <form action="#" className="signIn__modal_content-container">
              <InputText name="login" htmlFor="login" id="login" type="text" />
              <br />
              <InputText name="password" htmlFor="password" id="password" type="password" />
              <br />
              <input type="submit" onClick={logInFunc} />
            </form>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default SignInBtn;
