import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./signinmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import InputText from "../elements/inputText";
import routesData from "../routesData";
import { closeModalAction } from "../../redux/modal/actionsModal";
import { logInAction } from "../../redux/login/actionsLogin";
import { ReducerState } from "../../redux/reducerRoot";

const SignInModalBody: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState("Please enter login");
  const [passMessage, setPassMessage] = useState("Please enter password");
  const [formValid, setFormValid] = useState(false);
  const loggedIn = useSelector((state: ReducerState) => state.signIn.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn) {
      dispatch(closeModalAction());
    }
  }, [loggedIn]);

  const closeLogIn = () => dispatch(closeModalAction());
  const dispatchedLogInAction = (obj: { userName: string; userRole: string }) => dispatch(logInAction(obj));
  const history = useHistory();
  const closeModalHandler = () => {
    closeLogIn();
    history.push(routesData[0].path);
  };

  const signInUrl = "http://localhost:3000/users";

  const loginGetter = (loginData: string) => {
    setLogin(loginData);
  };

  const passwordGetter = (passwordData: string) => {
    setPassword(passwordData);
  };

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

  useEffect(() => {
    verifyName(login);
    verifyPassword(password);
  }, [login, password]);

  useEffect(() => {
    if (loginMessage === "Login is OK" && passMessage === "Password is OK") {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [loginMessage, passMessage]);

  async function getFunc(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }
    const getResponse = await fetch(signInUrl, { method: "GET" });
    const allUsersArr = await getResponse.json();
    const userMatch = allUsersArr.find(
      (user: { login: string; password: string }) => user.login === login && user.password === password
    );

    if (typeof userMatch === "undefined") {
      setLoginMessage("Login or password is not correct. Please try again.");
      setPassMessage("Login or password is not correct. Please try again.");
      return;
    }
    const { role } = userMatch;
    const obj = {
      userName: login,
      userRole: role,
    };
    dispatchedLogInAction(obj);
  }

  return (
    <div className="signIn__modal_container">
      <div className="signIn__modal_upper-container">
        <h1 className="signIn__modal_title">Authorization</h1>
        <button className="signIn__modal_close-btn" type="button" onClick={closeModalHandler}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <form action="#" className="signIn__modal_content-container" onSubmit={getFunc}>
        <InputText name="Login" id="SignInLogin" type="text" onChange={loginGetter} value={login} />
        <span className="signIn__message">{loginMessage}</span>
        <InputText name="Password" id="SignInPassword" type="password" onChange={passwordGetter} value={password} />
        <span className="signIn__message">{passMessage}</span>
        <br />
        <div className="signIn__modal_submit-btn-container">
          <input className="signIn__modal_submit-btn" type="submit" disabled={!formValid} />
        </div>
      </form>
    </div>
  );
};

export default SignInModalBody;
