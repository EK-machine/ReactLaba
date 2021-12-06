import { initialState } from "./initalState";
import { logInType, logOutType, showSignInModal, showSignUpModal, closeModal } from "./actionTypes";

const reducer = (
  state = initialState,
  action: { type: string; payload: string }
): { loggedIn: boolean; userName: string; signInModalVisible: boolean; signUpModalVisible: boolean } => {
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
        userName: initialState.userName,
      };
    case showSignInModal:
      return {
        ...state,
        signInModalVisible: true,
        signUpModalVisible: false,
      };
    case showSignUpModal:
      return {
        ...state,
        signInModalVisible: false,
        signUpModalVisible: true,
      };
    case closeModal:
      return {
        ...state,
        signInModalVisible: false,
        signUpModalVisible: false,
      };
    default:
      return state;
  }
};

export default reducer;
export type ReducerState = ReturnType<typeof reducer>;
