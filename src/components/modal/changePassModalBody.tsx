import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./changepassmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { closeModalAction } from "../../redux/modal/actionsModal";
import InputText from "../elements/inputText";
import { ReducerState } from "../../redux/reducerRoot";

const ChangePassModalBody: React.FC = () => {
  const userName = useSelector((state: ReducerState) => state.signIn.userName);
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");
  const [passMessage, setPassMessage] = useState<string>("Please enter new password");
  const [repeatPassMessage, setRepeatPassMessage] = useState<string>("Please repeat new password");
  const [formValid, setFormValid] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [currentId, setCurrentId] = useState();
  const dispatch = useDispatch();

  const outerTabRef = useRef<HTMLDivElement | null>(null);
  const topTabRef = useRef<HTMLElement | null>(null);
  const bottomTabRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const focusableElements = Array.from<HTMLElement>(outerTabRef.current?.querySelectorAll("[type]") ?? []);
    const topTab = focusableElements[0];
    topTabRef.current = topTab;
    setTimeout(() => topTabRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    const focusableElements = Array.from<HTMLElement>(outerTabRef.current?.querySelectorAll("[type]") ?? []);
    if (formValid) {
      const bottomTab = focusableElements[focusableElements.length - 1];
      bottomTabRef.current = bottomTab;
    } else {
      const bottomTab = focusableElements[focusableElements.length - 2];
      bottomTabRef.current = bottomTab;
    }
    bottomTabRef.current.focus();
  }, [formValid]);

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
      setPassMessage("Please enter new password");
    } else if (pass.length < 8 || pass.length > 15) {
      setPassMessage("Password must be between 8 and 15 characters");
    } else if (pass[0].toUpperCase() !== pass[0]) {
      setPassMessage("First character of password must be capital");
    } else if (!alphNumPass.test(pass)) {
      setPassMessage("At least 1 character of password must be numeric or alphabetic");
    } else {
      setPassMessage("New password is OK");
    }
  };

  const comparePass = (pass: string) => {
    if (repeatNewPassword.length <= 0) {
      setRepeatPassMessage("Please repeat new password");
    } else if (newPassword !== pass || !pass) {
      setRepeatPassMessage("Repeated password is not correct");
    } else {
      setRepeatPassMessage("Repeated password is OK");
    }
  };

  useEffect(() => {
    verifyPassword(newPassword);
    comparePass(repeatNewPassword);
  }, [newPassword, repeatNewPassword]);

  useEffect(() => {
    if (passMessage === "New password is OK" && repeatPassMessage === "Repeated password is OK") {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [passMessage, repeatPassMessage]);

  async function changeFunc(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }

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
    return null;
  }

  const closeChangePass = () => {
    dispatch(closeModalAction());
  };

  const onKeyDownFunk = (e: React.KeyboardEvent) => {
    if (document.activeElement === bottomTabRef.current && e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      topTabRef.current?.focus();
    }
    if (document.activeElement === topTabRef.current && e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      bottomTabRef.current?.focus();
    }
    if (e.key === "Escape") {
      closeChangePass();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className="changePass__modal_container" ref={outerTabRef} onKeyDown={onKeyDownFunk} role="note">
      <div className="changePass__modal_upper-container">
        <h1 className="changePass__modal_title">Change password</h1>
        <button className="changePass__modal_close-btn" type="button" onClick={closeChangePass}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <form action="#" className="changePass__modal_content-container" onSubmit={changeFunc}>
        <InputText name="Password" id="SignUpPassword" type="password" onChange={passwordGetter} value={newPassword} />
        <span className="changePass__message">{passMessage}</span>
        <br />
        <InputText
          name="Repeat password"
          id="SignUpRepeatPassword"
          type="password"
          onChange={repeatPasswordGetter}
          value={repeatNewPassword}
        />
        <span className="changePass__message">{repeatPassMessage}</span>
        <br />
        <div className="changePass__modal_submit-btn-container">
          <input className="changePass__modal_submit-btn" type="submit" disabled={!formValid} />
        </div>
      </form>
    </div>
  );
};

export default ChangePassModalBody;
