import { showSignInModal, showSignUpModal, showChangePassModal, closeModal } from "./actionTypesModal";

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
