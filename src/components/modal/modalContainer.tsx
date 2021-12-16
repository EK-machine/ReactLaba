import React from "react";
import { useSelector } from "react-redux";
import Modal from "./modal";
import SignInModalBody from "./signInModalBody";
import SignUpModalBody from "./signUpModalBody";
import ChangePassModalBody from "./changePassModalBody";
import BuyModalBody from "./buyModalBody";
import EditModalBody from "./editModalBody";
import DelConfModalBody from "./delConfModalBody";
import { ReducerState } from "../../redux/reducerRoot";

const ModalContainer: React.FC = () => {
  const signInModalVisible = useSelector((state: ReducerState) => state.modal.signInModalVisible);
  const signUpModalVisible = useSelector((state: ReducerState) => state.modal.signUpModalVisible);
  const changePassModalVisible = useSelector((state: ReducerState) => state.modal.changePassModalVisible);
  const buyModalVisible = useSelector((state: ReducerState) => state.modal.buyModalVisible);
  const editModalVisible = useSelector((state: ReducerState) => state.modal.editModalVisible);
  const delConfModalVisible = useSelector((state: ReducerState) => state.modal.delConfModalVisible);
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
      {buyModalVisible ? (
        <Modal>
          <BuyModalBody />
        </Modal>
      ) : null}
      {editModalVisible ? (
        <Modal>
          <EditModalBody />
        </Modal>
      ) : null}
      {delConfModalVisible ? (
        <Modal>
          <DelConfModalBody />
        </Modal>
      ) : null}
    </>
  );
};

export default ModalContainer;
