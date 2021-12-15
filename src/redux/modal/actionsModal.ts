import { showSignInModal, showSignUpModal, showChangePassModal, showBuyModal, closeModal } from "./actionTypesModal";

export const showSignInModalAction = (): { type: string } => ({
  type: showSignInModal,
});

export const showSignUpModalAction = (): { type: string } => ({
  type: showSignUpModal,
});

export const showChangePassModalAction = (): { type: string } => ({
  type: showChangePassModal,
});

export const showBuyModalAction = (): { type: string } => ({
  type: showBuyModal,
});

export const closeModalAction = (): { type: string } => ({
  type: closeModal,
});
