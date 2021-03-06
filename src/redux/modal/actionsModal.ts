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

export const showSignInModalAction = (): { type: string } => ({
  type: showSignInModal,
});

export const showSignUpModalAction = (): { type: string } => ({
  type: showSignUpModal,
});

export const showChangePassModalAction = (): { type: string } => ({
  type: showChangePassModal,
});

export const showChangeUserPicModalAction = (): { type: string } => ({
  type: showChangeUserPicModal,
});

export const showBuyModalAction = (): { type: string } => ({
  type: showBuyModal,
});

export const showEditModalAction = (): { type: string } => ({
  type: showEditModal,
});

export const showDelConfModalAction = (): { type: string } => ({
  type: showDelConfModal,
});

export const closeModalAction = (): { type: string } => ({
  type: closeModal,
});
