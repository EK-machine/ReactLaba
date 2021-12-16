import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./signupmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import InputText from "../elements/inputText";
import routesData from "../routesData";
import { logInAction } from "../../redux/login/actionsLogin";
import { closeModalAction } from "../../redux/modal/actionsModal";
import { ReducerState } from "../../redux/reducerRoot";

const SignUpModalBody: React.FC = () => {
  const [logup, setLogup] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState("Please enter login");
  const [passMessage, setPassMessage] = useState("Please enter password");
  const [repeatPassMessage, setRepeatPassMessage] = useState("Please repeat password");
  const [formValid, setFormValid] = useState(false);
  const loggedIn = useSelector((state: ReducerState) => state.signIn.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn) {
      dispatch(closeModalAction());
    }
  }, [loggedIn]);

  const closeLogIn = () => dispatch(closeModalAction());
  const dispatchedLogInAction = (userName: string) => dispatch(logInAction(userName));
  const history = useHistory();
  const closeModalHandler = () => {
    closeLogIn();
    history.push(routesData[0].path);
  };

  const signUpUrl = "http://localhost:3000/users";

  const logupGetter = (logupData: string) => {
    setLogup(logupData);
  };

  const passwordGetter = (passwordData: string) => {
    setPassword(passwordData);
  };

  const repeatPasswordGetter = (passwordData: string) => {
    setRepeatPassword(passwordData);
  };

  const signUpObj = { login: logup, password, role: "user" };

  const verifyName = (log: string) => {
    if (!log) {
      setLoginMessage("Please enter login");
    } else if (log.length < 3 || log.length > 12) {
      setLoginMessage("Login must be between 3 and 12 characters");
    } else {
      setLoginMessage("Login is OK");
    }
  };

  const verifyPassword = (pass: string) => {
    const alphNumPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!pass) {
      setPassMessage("Please enter password");
    } else if (pass.length < 8 || pass.length > 15) {
      setPassMessage("Password must be between 8 and 15 characters");
    } else if (pass[0].toUpperCase() !== pass[0]) {
      setPassMessage("First character of password must be capital");
    } else if (!alphNumPass.test(pass)) {
      setPassMessage("At least 1 character of password must be numeric or alphabetic");
    } else {
      setPassMessage("Password is OK");
    }
  };

  const comparePass = (pass: string) => {
    if (password !== repeatPassword || !repeatPassword) {
      setRepeatPassMessage("Repeated password is not correct");
    } else {
      setRepeatPassMessage("Repeated password is OK");
    }
  };

  useEffect(() => {
    verifyName(logup);
    verifyPassword(password);
    comparePass(repeatPassword);
  }, [logup, password, repeatPassword]);

  useEffect(() => {
    if (
      loginMessage === "Login is OK" &&
      passMessage === "Password is OK" &&
      repeatPassMessage === "Repeated password is OK"
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [loginMessage, passMessage, repeatPassMessage]);

  async function postFunc(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }

    const postResponse = await fetch(signUpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpObj),
    });

    if (postResponse.status === 201) {
      dispatchedLogInAction(logup);
    } else {
      throw new Error(`HTTP status: ${postResponse.status}`);
    }

    const response = await postResponse.json();
    return response;
  }

  // old realization with put
  // async function putFunc(e: React.SyntheticEvent) {
  //   if (e) {
  //     e.preventDefault();
  //   }

  //   const putResponse = await fetch(signUpUrl, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(signUpObj),
  //   });

  //   if (putResponse.status === 200) {
  //     dispatchedLogInAction(logup);
  //   } else {
  //     throw new Error(`HTTP status: ${putResponse.status}`);
  //   }

  //   const response = await putResponse.json();
  //   history.push(routesData[3].path);
  //   return response;
  // }
  // old realization with put

  return (
    <div className="signUp__modal_container">
      <div className="signUp__modal_upper-container">
        <h1 className="signUp__modal_title">Registration</h1>
        <button className="signUp__modal_close-btn" type="button" onClick={closeModalHandler}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <form action="#" className="signUp__modal_content-container" onSubmit={postFunc}>
        <InputText name="Login" id="SignUplogin" type="text" onChange={logupGetter} value={logup} />
        <p>{loginMessage}</p>
        <InputText name="Password" id="SignUpPassword" type="password" onChange={passwordGetter} value={password} />
        <p>{passMessage}</p>
        <InputText
          name="Repeat password"
          id="SignUpRepeatPassword"
          type="password"
          onChange={repeatPasswordGetter}
          value={repeatPassword}
        />
        <p>{repeatPassMessage}</p>
        <br />
        <div className="signUp__modal_submit-btn-container">
          <input className="signUp__modal_submit-btn" type="submit" disabled={!formValid} />
        </div>
      </form>
    </div>
  );
};

export default SignUpModalBody;
