import { Dispatch } from "react";
import { LogInUserDataType, LogInActionType, LogOutActionType } from "../../types/types";
import { logInType, logOutType } from "./actionTypesLogin";

export const logInAction = (userData: LogInUserDataType): LogInActionType => ({
  type: logInType,
  payload: userData,
});

export const logOutAction = (): LogOutActionType => ({
  type: logOutType,
});

export const fetchLogInAction =
  (login: string, password: string) =>
  async (dispatch: Dispatch<LogInActionType>): Promise<void> => {
    const getResponse = await fetch("http://localhost:3000/users", { method: "GET" });
    const allUsersArr = await getResponse.json();
    const userMatch = allUsersArr.find(
      (user: { login: string; password: string }) => user.login === login && user.password === password
    );

    const { role, imgUrl } = userMatch;
    const obj = {
      userName: login,
      userRole: role,
      userPic: imgUrl,
    };
    if (getResponse.status === 200) {
      dispatch(logInAction(obj));
    } else {
      throw new Error(`HTTP status: ${getResponse.status}`);
    }
  };

export const fetchLogUpAction =
  (logup: string, password: string) =>
  async (dispatch: Dispatch<LogInActionType>): Promise<void> => {
    const getResponse = await fetch("http://localhost:3000/users", { method: "GET" });
    const allUsersArr = await getResponse.json();
    const userMatch = allUsersArr.find((user: { login: string; password: string }) => user.login === logup);
    if (userMatch) {
      return;
    }
    const signUpObj = { login: logup, password, role: "user" };
    const postResponse = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpObj),
    });

    const obj = {
      userName: logup,
      userRole: "user",
      userPic: "",
    };
    if (postResponse.status === 201) {
      dispatch(logInAction(obj));
    } else {
      throw new Error(`HTTP status: ${postResponse.status}`);
    }
  };
