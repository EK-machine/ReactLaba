import React, { useState } from "react";
import "./signupbtn.css";
import Modal from "./modal";
import InputText from "./inputText";

const SignUpBtn: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const showModalFunc = () => {
    setShowModal(!showModal);
  };

  const closeModalFunc = () => {
    setShowModal(false);
  };

  return (
    <div className="signUp__container">
      <button type="button" className="signUp__btn" onClick={showModalFunc}>
        <p className="signUp__title">Sign Up</p>
      </button>
      {showModal ? (
        <Modal>
          <div className="signUp__modal_container">
            <div className="signUp__modal_upper-container">
              <h1>Registration</h1>
              <button type="button" onClick={closeModalFunc}>
                Close
              </button>
            </div>
            <form action="#" className="signUp__modal_content-container">
              <InputText name="login" htmlFor="login" id="login" type="text" />
              <br />
              <InputText name="password" htmlFor="password" id="password" type="password" />
              <br />
              <InputText name="repeatpassword" htmlFor="repeatpassword" id="repeatpassword" type="password" />
            </form>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default SignUpBtn;
