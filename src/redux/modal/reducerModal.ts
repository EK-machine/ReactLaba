import initialModalState from "./initalStateModal";
import { showSignInModal, showSignUpModal, showChangePassModal, showBuyModal, closeModal } from "./actionTypesModal";
import { ModalState } from "../../types/types";

const modalReducer = (state = initialModalState, action: { type: string }): ModalState => {
  switch (action.type) {
    case showSignInModal:
      return {
        ...state,
        signInModalVisible: true,
        signUpModalVisible: false,
        changePassModalVisible: false,
        buyModalVisible: false,
      };
    case showSignUpModal:
      return {
        ...state,
        signInModalVisible: false,
        signUpModalVisible: true,
        changePassModalVisible: false,
        buyModalVisible: false,
      };
    case showChangePassModal:
      return {
        ...state,
        signInModalVisible: false,
        signUpModalVisible: false,
        changePassModalVisible: true,
        buyModalVisible: false,
      };
    case showBuyModal:
      return {
        ...state,
        signInModalVisible: false,
        signUpModalVisible: false,
        changePassModalVisible: false,
        buyModalVisible: true,
      };
    case closeModal:
      return {
        ...state,
        signInModalVisible: false,
        signUpModalVisible: false,
        changePassModalVisible: false,
        buyModalVisible: false,
      };
    default:
      return state;
  }
};

export default modalReducer;
