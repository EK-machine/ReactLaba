import initialLogInState from "./initalStateLogin";
import { logInType, logOutType } from "./actionTypesLogin";

const logInReducer = (
  state = initialLogInState,
  action: { type: string; payload: { userName: string; userRole: string } }
): { loggedIn: boolean; userName: string; userRole: string } => {
  switch (action.type) {
    case logInType:
      return {
        ...state,
        loggedIn: true,
        userName: action.payload.userName,
        userRole: action.payload.userRole,
      };
    case logOutType:
      return {
        ...state,
        loggedIn: false,
        userName: initialLogInState.userName,
        userRole: initialLogInState.userRole,
      };
    default:
      return state;
  }
};

export default logInReducer;
