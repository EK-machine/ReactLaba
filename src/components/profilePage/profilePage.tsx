import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInAction } from "../../redux/login/actionsLogin";
import { showChangePassModalAction, showChangeUserPicModalAction } from "../../redux/modal/actionsModal";
import "./profilepage.css";
import { ReducerState } from "../../redux/reducerRoot";
import ProfileInputText from "../elements/profileInputText";
import ProfileTextArea from "../elements/profileTextArea";

const ProfilePage: React.FC = () => {
  const userName = useSelector((state: ReducerState) => state.signIn.userName);
  const userAvatar = useSelector((state: ReducerState) => state.signIn.userPic);
  const [currentName, setCurrentName] = useState<string>("");
  const [currentRole, setCurrentRole] = useState<string>("");
  const [currentId, setCurrentId] = useState<string>("");
  const [currentPic, setCurrentPic] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(false);
  const dispatch = useDispatch();
  const dispatchedLogInAction = (obj: { userName: string; userRole: string; userPic: string }) =>
    dispatch(logInAction(obj));

  useEffect(() => {
    const currenUserFetch = async () => {
      const currentUserResp = await fetch(`http://localhost:3000/users?login_like=${userName}`, { method: "GET" });
      const currentUserRespJson = await currentUserResp.json();
      const [{ login, role, id, imgUrl }] = currentUserRespJson;
      setCurrentName(login);
      setCurrentRole(role);
      setCurrentId(id);
      setCurrentPic(imgUrl);
    };
    currenUserFetch();
  }, []);

  const userNameGetter = (inputName: string) => {
    setName(inputName);
  };
  const descriptionGetter = (inputName: string) => {
    setDescription(inputName);
  };

  const updatedName = name || currentName;

  const userObj = { id: currentId, login: updatedName, description };

  const verifyNewName = (log: string) => {
    if (!log) {
      setFormValid(false);
      setMessage("Please enter new login");
    } else if (log.length < 3 || log.length > 12) {
      setFormValid(false);
      setMessage("New login must be between 3 and 12 characters");
    } else {
      setFormValid(true);
      setMessage("New login is OK");
    }
  };

  useEffect(() => {
    verifyNewName(name);
  }, [name]);

  async function saveHandler(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }
    const patchResponse = await fetch(`http://localhost:3000/users/${currentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    if (patchResponse.status === 404) {
      throw new Error(`HTTP status: ${patchResponse.status}`);
    }
    const userObjToUpdate = { userName: updatedName, userRole: currentRole, userPic: currentPic };
    dispatchedLogInAction(userObjToUpdate);
  }

  return (
    <div className="profilePage__container">
      <div className="profilePage__inner-container">
        <section className="profilePage__upperSection">
          <h1 className="profilePage__userName_title">{userName}</h1>
        </section>
        <form className="profilePage__lowerSection" onSubmit={saveHandler}>
          <div className="profilePage__picSection">
            <div className="profilePage__picSection_picWrapper">
              <img src={userAvatar} alt={userName} className="profilePage__picSection_pic" />
            </div>
            <button
              type="button"
              className="profilePage__picSection_changePicBtn"
              onClick={() => dispatch(showChangeUserPicModalAction())}
            >
              <p>Change profile image</p>
            </button>
          </div>
          <div className="profilePage__editSection">
            <ProfileInputText name="Username" id="UserName" type="text" onChange={userNameGetter} value={name} />
            <span className="profilePage__edit_message">{message}</span>
            <ProfileTextArea
              name="Profile description"
              id="Description"
              onChange={descriptionGetter}
              value={description}
            />
          </div>
          <div className="profilePage__btnsSection">
            <input
              type="submit"
              className="profilePage__btnsSection_saveBtn"
              value="Save profile"
              disabled={!formValid}
            />
            <button
              type="button"
              className="profilePage__btnsSection_changePassBtn"
              onClick={() => dispatch(showChangePassModalAction())}
            >
              <p>Change password</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
