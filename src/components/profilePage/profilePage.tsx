import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInAction } from "../../redux/actionsLogin";
import { showChangePassModalAction } from "../../redux/actionsModal";
import "./profilepage.css";
import { ReducerState } from "../../redux/reducerRoot";
import ProfileInputText from "../elements/profileInputText";
import ProfileTextArea from "../elements/ProfileTextArea";

const ProfilePage: React.FC = () => {
  const userName = useSelector((state: ReducerState) => state.signIn.userName);
  const [currentName, setCurrentName] = useState("");
  const [currentId, setCurrentId] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [formValid, setFormValid] = useState(false);
  const dispatch = useDispatch();
  const dispatchedLogInAction = (newUserName: string) => dispatch(logInAction(newUserName));

  useEffect(() => {
    const currenUserFetch = async () => {
      const currentUserResp = await fetch(`http://localhost:3000/users?login_like=${userName}`, { method: "GET" });
      const currentUserRespJson = await currentUserResp.json();
      const [{ login, id }] = currentUserRespJson;
      setCurrentName(login);
      setCurrentId(id);
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
    dispatchedLogInAction(updatedName);
  }

  return (
    <div className="profilePage__container">
      <div className="profilePage__inner-container">
        <section className="profilePage__upperSectiopn">
          <h1 className="profilePage__userName_title">{userName}</h1>
        </section>
        <form className="profilePage__lowerSectiopn" onSubmit={saveHandler}>
          <div className="profilePage__picSection">
            <div className="profilePage__picSection_pic">
              <div>no picture</div>
            </div>
            <button type="button" className="profilePage__picSection_changePicBtn">
              <p>Change profile image</p>
            </button>
          </div>
          <div className="profilePage__editSection">
            <ProfileInputText name="Username" id="UserName" type="text" onChange={userNameGetter} value={name} />
            <span>{message}</span>
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
