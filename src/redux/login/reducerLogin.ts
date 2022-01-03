import initialLogInState from "./initalStateLogin";
import { LogInActionType, InitialLogInState } from "../../types/types";
import { logInType, logOutType } from "./actionTypesLogin";

const logInReducer = (state = initialLogInState, action: LogInActionType): InitialLogInState => {
  switch (action.type) {
    case logInType:
      return {
        ...state,
        loggedIn: true,
        userName: action.payload.userName,
        userRole: action.payload.userRole,
        userPic: action.payload.userPic,
      };
    case logOutType:
      return {
        ...state,
        loggedIn: false,
        userName: initialLogInState.userName,
        userRole: initialLogInState.userRole,
        userPic: initialLogInState.userPic,
      };
    default:
      return state;
  }
};

export default logInReducer;
