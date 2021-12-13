import initialModalState from "./initalStateModal";
import { showSignInModal, showSignUpModal, showChangePassModal, closeModal } from "./actionTypesModal";

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

export default modalReducer;
