import initialModalState from "./initalStateModal";
import {
  showSignInModal,
  showSignUpModal,
  showChangePassModal,
  showBuyModal,
  showEditModal,
  showDelConfModal,
  closeModal,
} from "./actionTypesModal";
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
        editModalVisible: false,
        delConfModalVisible: false,
      };
    case showSignUpModal:
      return {
        ...state,
        signInModalVisible: false,
        signUpModalVisible: true,
        changePassModalVisible: false,
        buyModalVisible: false,
        editModalVisible: false,
        delConfModalVisible: false,
      };
    case showChangePassModal:
      return {
        ...state,
        signInModalVisible: false,
        signUpModalVisible: false,
        changePassModalVisible: true,
        buyModalVisible: false,
        editModalVisible: false,
        delConfModalVisible: false,
      };
    case showBuyModal:
      return {
        ...state,
        signInModalVisible: false,
        signUpModalVisible: false,
        changePassModalVisible: false,
        buyModalVisible: true,
        editModalVisible: false,
        delConfModalVisible: false,
      };
    case showEditModal:
      return {
        ...state,
        signInModalVisible: false,
        signUpModalVisible: false,
        changePassModalVisible: false,
        buyModalVisible: false,
        editModalVisible: true,
        delConfModalVisible: false,
      };

    case showDelConfModal:
      return {
        ...state,
        signInModalVisible: false,
        signUpModalVisible: false,
        changePassModalVisible: false,
        buyModalVisible: false,
        editModalVisible: false,
        delConfModalVisible: true,
      };

    case closeModal:
      return {
        ...state,
        signInModalVisible: false,
        signUpModalVisible: false,
        changePassModalVisible: false,
        buyModalVisible: false,
        editModalVisible: false,
        delConfModalVisible: false,
      };
    default:
      return state;
  }
};

export default modalReducer;
