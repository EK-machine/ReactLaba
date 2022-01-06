import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./changeuserpicmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { closeModalAction } from "../../redux/modal/actionsModal";
import { fetchLogInAction } from "../../redux/login/actionsLogin";
import InputText from "../elements/inputText";
import { ReducerState } from "../../redux/reducerRoot";

const ChangeUserPicModalBody: React.FC = () => {
  const userName = useSelector((state: ReducerState) => state.signIn.userName);
  const [userPic, setUserPic] = useState<string>("");
  const [newUserPic, setNewUserPic] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const [currentPass, setCurrentPass] = useState<string>("");
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
      const [{ id, imgUrl, password }] = currentUserRespJson;
      setCurrentId(id);
      setUserPic(imgUrl);
      setCurrentPass(password);
    };
    currenUserFetch();
  }, []);

  const picUrlGetter = (picUrl: string) => {
    setNewUserPic(picUrl);
  };

  useEffect(() => {
    if (newUserPic.length > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [newUserPic]);

  async function changePicFunc(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }

    const imgUrl = newUserPic || userPic;

    const patchResponse = await fetch(`http://localhost:3000/users/${currentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imgUrl }),
    });

    if (patchResponse.status === 404) {
      throw new Error(`HTTP status: ${patchResponse.status}`);
    }
    dispatch(closeModalAction());
    dispatch(fetchLogInAction(userName, currentPass));
    return null;
  }

  const userAvatar = newUserPic || userPic;

  const closeChangeUserPic = () => {
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
      closeChangeUserPic();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className="changePic__modal_container" ref={outerTabRef} onKeyDown={onKeyDownFunk} role="note">
      <div className="changePic__modal_upper-container">
        <h1 className="changePic__modal_title">Change avatar</h1>
        <button className="changePic__modal_close-btn" type="button" onClick={closeChangeUserPic}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="changePic__modal_picContainer">
        <img src={userAvatar} alt={`Avatar of ${userName}`} />
      </div>
      <form action="#" className="changePic__modal_content-container" onSubmit={changePicFunc}>
        <InputText name="Change avatar" id="changeUserPic" type="text" onChange={picUrlGetter} value={newUserPic} />
        <div className="changePic__modal_submit-btn-container">
          <input className="changePic__modal_submit-btn" type="submit" disabled={!formValid} />
        </div>
      </form>
    </div>
  );
};

export default ChangeUserPicModalBody;
