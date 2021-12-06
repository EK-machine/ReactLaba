import {
  logInType,
  logOutType,
  showSignInModal,
  showSignUpModal,
  showChangePassModal,
  closeModal,
} from "./actionTypes";

export const logInAction = (userName: string): { type: string; payload: string } => ({
  type: logInType,
  payload: userName,
});

export const logOutAction = (): { type: string } => ({
  type: logOutType,
});

export const showSignInModalAction = (): { type: string } => ({
  type: showSignInModal,
});

export const showSignUpModalAction = (): { type: string } => ({
  type: showSignUpModal,
});

export const showChangePassModalAction = (): { type: string } => ({
  type: showChangePassModal,
});

export const closeModalAction = (): { type: string } => ({
  type: closeModal,
});
