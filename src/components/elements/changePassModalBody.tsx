import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./changepassmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { closeModalAction } from "../../redux/actions";
import InputText from "./inputText";

const ChangePassModalBody: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [message, setMessage] = useState("Please enter new password");
  const closeModalDispatch = useDispatch();

  const passwordGetter = (passwordData: string) => {
    setPassword(passwordData);
  };

  const repeatPasswordGetter = (passwordData: string) => {
    setRepeatPassword(passwordData);
  };

  const verifyPassword = (pass: string) => {
    const alphNumPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!pass) {
      return { isValid: false, validMessage: "Please enter password" };
    }
    if (pass.length < 8 || pass.length > 15) {
      return { isValid: false, validMessage: "Password must be between 8 and 15 characters" };
    }
    if (pass[0].toUpperCase() !== pass[0]) {
      return { isValid: false, validMessage: "First character of password must be capital" };
    }
    if (!alphNumPass.test(pass)) {
      return { isValid: false, validMessage: "At least 1 character of password must be numeric or alphabetic" };
    }
    return { isValid: true, validMessage: "Success" };
  };

  function changeFunc(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }

    if (!(repeatPassword === password)) {
      setMessage("Password is not correct");
    } else if (!verifyPassword(password).isValid) {
      setMessage(verifyPassword(password).validMessage);
    } else {
      setMessage(verifyPassword(password).validMessage);
    }
    closeModalDispatch(closeModalAction());
    return null;
  }

  return (
    <div className="changePass__modal_container">
      <div className="changePass__modal_upper-container">
        <h1 className="changePass__modal_title">Change password</h1>
        <button
          className="changePass__modal_close-btn"
          type="button"
          onClick={() => closeModalDispatch(closeModalAction())}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <form action="#" className="changePass__modal_content-container" onSubmit={changeFunc}>
        <p>{message}</p>
        <br />
        <br />
        <InputText name="Password" id="SignUpPassword" type="password" onChange={passwordGetter} value={password} />
        <br />
        <InputText
          name="Repeat password"
          id="SignUpRepeatPassword"
          type="password"
          onChange={repeatPasswordGetter}
          value={repeatPassword}
        />
        <br />
        <div className="changePass__modal_submit-btn-container">
          <input className="changePass__modal_submit-btn" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ChangePassModalBody;
