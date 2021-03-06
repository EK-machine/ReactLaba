import React from "react";
import { useSelector } from "react-redux";
import Modal from "./modal";
import SignInModalBody from "./signInModalBody";
import SignUpModalBody from "./signUpModalBody";
import ChangePassModalBody from "./changePassModalBody";
import ChangeUserPicModalBody from "./changeUserPicModalBody";
import BuyModalBody from "./buyModalBody";
import EditModalBodyFunc from "./editModalBodyFunc";
import DelConfModalBody from "./delConfModalBody";
import { ReducerState } from "../../redux/reducerRoot";

const ModalContainer: React.FC = () => {
  const signInModalVisible = useSelector((state: ReducerState) => state.modal.signInModalVisible);
  const signUpModalVisible = useSelector((state: ReducerState) => state.modal.signUpModalVisible);
  const changePassModalVisible = useSelector((state: ReducerState) => state.modal.changePassModalVisible);
  const changeUserPicModalVisible = useSelector((state: ReducerState) => state.modal.changeUserPicModalVisible);
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
      {changeUserPicModalVisible ? (
        <Modal>
          <ChangeUserPicModalBody />
        </Modal>
      ) : null}
      {buyModalVisible ? (
        <Modal>
          <BuyModalBody />
        </Modal>
      ) : null}
      {editModalVisible ? (
        <Modal>
          <EditModalBodyFunc />
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
