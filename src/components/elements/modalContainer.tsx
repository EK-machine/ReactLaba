import React from "react";
import { useSelector } from "react-redux";
import Modal from "./modal";
import SignInModalBody from "./signInModalBody";
import SignUpModalBody from "./signUpModalBody";
import ChangePassModalBody from "./changePassModalBody";
import { ReducerState } from "../../redux/reducer";

const ModalContainer: React.FC = () => {
  const signInModalVisible = useSelector((state: ReducerState) => state.modal.signInModalVisible);
  const signUpModalVisible = useSelector((state: ReducerState) => state.modal.signUpModalVisible);
  const changePassModalVisible = useSelector((state: ReducerState) => state.modal.changePassModalVisible);
  return (
    <>
      {signInModalVisible ? (
        <Modal>
          <SignInModalBody />
        </Modal>
      ) : null}
      {signUpModalVisible ? (
        <Modal>
          <SignUpModalBody />
        </Modal>
      ) : null}
      {changePassModalVisible ? (
        <Modal>
          <ChangePassModalBody />
        </Modal>
      ) : null}
    </>
  );
};

export default ModalContainer;
