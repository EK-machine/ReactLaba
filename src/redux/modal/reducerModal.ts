import initialModalState from "./initalStateModal";
import {
  showSignInModal,
  showSignUpModal,
  showChangePassModal,
  showChangeUserPicModal,
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
        changeUserPicModalVisible: false,
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
        changeUserPicModalVisible: false,
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
        changeUserPicModalVisible: false,
        buyModalVisible: false,
        editModalVisible: false,
        delConfModalVisible: false,
      };
    case showChangeUserPicModal:
      return {
        ...state,
        signInModalVisible: false,
        signUpModalVisible: false,
        changePassModalVisible: false,
        changeUserPicModalVisible: true,
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
        changeUserPicModalVisible: false,
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
        changeUserPicModalVisible: false,
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
        changeUserPicModalVisible: false,
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
        changeUserPicModalVisible: false,
        buyModalVisible: false,
        editModalVisible: false,
        delConfModalVisible: false,
      };
    default:
      return state;
  }
};

export default modalReducer;
