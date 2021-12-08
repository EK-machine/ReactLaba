import { combineReducers } from "redux";
import { initialLogInState, initialModalState } from "./initalState";
import {
  logInType,
  logOutType,
  showSignInModal,
  showSignUpModal,
  showChangePassModal,
  closeModal,
} from "./actionTypes";

const logInReducer = (
  state = initialLogInState,
  action: { type: string; payload: string }
): { loggedIn: boolean; userName: string } => {
  switch (action.type) {
    case logInType:
      return {
        ...state,
        loggedIn: true,
        userName: action.payload,
      };
    case logOutType:
      return {
        ...state,
        loggedIn: false,
        userName: initialLogInState.userName,
      };
    default:
      return state;
  }
};

const modalReducer = (
  state = initialModalState,
  action: { type: string }
): { signInModalVisible: boolean; signUpModalVisible: boolean; changePassModalVisible: boolean } => {
  switch (action.type) {
    case showSignInModal:
      return {
        ...state,
        signInModalVisible: true,
        signUpModalVisible: false,
        changePassModalVisible: false,
      };
    case showSignUpModal:
      return {
        ...state,
        signInModalVisible: false,
        signUpModalVisible: true,
        changePassModalVisible: false,
      };
    case showChangePassModal:
      return {
        ...state,
        signInModalVisible: false,
        signUpModalVisible: false,
        changePassModalVisible: true,
      };
    case closeModal:
      return {
        ...state,
        signInModalVisible: false,
        signUpModalVisible: false,
        changePassModalVisible: false,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  signIn: logInReducer,
  modal: modalReducer,
});

export default rootReducer;
export type ReducerState = ReturnType<typeof rootReducer>;
