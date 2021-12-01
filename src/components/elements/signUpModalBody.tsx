import React, { useState } from "react";
import "./signupmodalbody.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import InputText from "./inputText";
import { SignUpModalBodyProps } from "../../types/types";
import routesData from "../routesData";

const SignUpModalBody: React.FC<SignUpModalBodyProps> = ({ logInFunc, closeModalFunc }) => {
  const [logup, setLogup] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [message, setMessage] = useState("Please enter password");

  const history = useHistory();

  const signUpUrl = "http://localhost:3000/users/1";

  const logupGetter = (logupData: string) => {
    setLogup(logupData);
  };

  const passwordGetter = (passwordData: string) => {
    setPassword(passwordData);
  };

  const repeatPasswordGetter = (passwordData: string) => {
    setRepeatPassword(passwordData);
  };

  const signUpObj = { login: logup, password };

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

  async function putFunc(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }

    if (!(repeatPassword === password)) {
      setMessage("Password is not correct");
    } else if (!verifyPassword(password).isValid) {
      setMessage(verifyPassword(password).validMessage);
    } else {
      setMessage(verifyPassword(password).validMessage);
      const putResponse = await fetch(signUpUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpObj),
      });

      if (putResponse.status === 200) {
        logInFunc(true, logup);
      } else {
        throw new Error(`HTTP status: ${putResponse.status}`);
      }

      const response = await putResponse.json();
      history.push(routesData[3].path);
      return response;
    }
    return null;
  }

  return (
    <div className="signUp__modal_container">
      <div className="signUp__modal_upper-container">
        <h1 className="signUp__modal_title">Registration</h1>
        <button className="signUp__modal_close-btn" type="button" onClick={closeModalFunc}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <form action="#" className="signUp__modal_content-container" onSubmit={putFunc}>
        <p>{message}</p>
        <br />
        <InputText name="Login" id="SignUplogin" type="text" onChange={logupGetter} value={logup} />
        <br />
        <InputText name="Password" id="SignUpPassword" type="password" onChange={passwordGetter} value={password} />
        <br />
        <InputText
          name="RepeatPassword"
          id="SignUpRepeatPassword"
          type="password"
          onChange={repeatPasswordGetter}
          value={repeatPassword}
        />
        <br />
        <div className="signUp__modal_submit-btn-container">
          <input className="signUp__modal_submit-btn" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default SignUpModalBody;
