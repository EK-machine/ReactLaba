import { logInType, logOutType } from "./actionTypes";

export const logInAction = (userName: string): { type: string; payload: string } => ({
  type: logInType,
  payload: userName,
});

export const logOutAction = (): { type: string } => ({
  type: logOutType,
});
