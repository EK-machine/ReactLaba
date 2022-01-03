import { logInType, logOutType } from "./actionTypesLogin";

export const logInAction = (userData: {
  userName: string;
  userRole: string;
  userPic: string;
}): { type: string; payload: { userName: string; userRole: string; userPic: string } } => ({
  type: logInType,
  payload: userData,
});

export const logOutAction = (): { type: string } => ({
  type: logOutType,
});

export const fetchLogInAction = (login: string, password: string) => async (dispatch) => {
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
  dispatch(logInAction(obj));
};
