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
