import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./changepassmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { closeModalAction } from "../../redux/actions";
import InputText from "./inputText";
import { ReducerState } from "../../redux/reducer";

const ChangePassModalBody: React.FC = () => {
  const userName = useSelector((state: ReducerState) => state.signIn.userName);
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");
  const [message, setMessage] = useState("Please enter new password");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentId, setCurrentId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const currenUserFetch = async () => {
      const currentUserResp = await fetch(`http://localhost:3000/users?login_like=${userName}`, { method: "GET" });
      const currentUserRespJson = await currentUserResp.json();
      const [{ password, id }] = currentUserRespJson;
      setCurrentPassword(password);
      setCurrentId(id);
    };
    currenUserFetch();
  }, []);

  const passwordGetter = (passwordData: string) => {
    setNewPassword(passwordData);
  };

  const repeatPasswordGetter = (passwordData: string) => {
    setRepeatNewPassword(passwordData);
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

  async function changeFunc(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }

    if (!(repeatNewPassword === newPassword)) {
      setMessage("Password is not correct");
    } else if (!verifyPassword(newPassword).isValid) {
      setMessage(verifyPassword(newPassword).validMessage);
    } else {
      setMessage(verifyPassword(newPassword).validMessage);

      const password = repeatNewPassword || currentPassword;

      const patchResponse = await fetch(`http://localhost:3000/users/${currentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (patchResponse.status === 404) {
        throw new Error(`HTTP status: ${patchResponse.status}`);
      }
      dispatch(closeModalAction());
    }
    return null;
  }

  return (
    <div className="changePass__modal_container">
      <div className="changePass__modal_upper-container">
        <h1 className="changePass__modal_title">Change password</h1>
        <button className="changePass__modal_close-btn" type="button" onClick={() => dispatch(closeModalAction())}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <form action="#" className="changePass__modal_content-container" onSubmit={changeFunc}>
        <p>{message}</p>
        <br />
        <InputText name="Password" id="SignUpPassword" type="password" onChange={passwordGetter} value={newPassword} />
        <br />
        <InputText
          name="Repeat password"
          id="SignUpRepeatPassword"
          type="password"
          onChange={repeatPasswordGetter}
          value={repeatNewPassword}
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
