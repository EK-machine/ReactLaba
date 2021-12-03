import { logInType, logOutType } from "./actionTypes";

export const logInAction = (): { type: string } => ({
  type: logInType,
});

export const logOutAction = (): { type: string } => ({
  type: logOutType,
});
