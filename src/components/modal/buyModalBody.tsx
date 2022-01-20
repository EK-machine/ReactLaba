import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./buymodalbody.scss";
import { closeModalAction } from "../../redux/modal/actionsModal";
import { buyGamesAction, notWantToBuyGamesAction } from "../../redux/cart/actionsCart";
import { ReducerState } from "../../redux/reducerRoot";
import CloseBtn from "../elements/closeBtn";
import useFocusTrap from "../../helpers/useFocusTrap";
import Btn from "../elements/btn";

const BuyModalBody: React.FC = () => {
  const userName = useSelector((state: ReducerState) => state.signIn.userName);
  const cartGames = useSelector((state: ReducerState) => state.cart.gamesList);
  const amount = useSelector((state: ReducerState) => state.cart.totalPurchase);
  const dispatch = useDispatch();

  const outerTabRef = useRef<HTMLDivElement | null>(null);
  const topTabRef = useRef<HTMLElement | null>(null);
  const bottomTabRef = useRef<HTMLElement | null>(null);

  const closeHandler = () => {
    dispatch(notWantToBuyGamesAction(amount));
    dispatch(closeModalAction());
  };

  const confirmHandler = () => {
    dispatch(buyGamesAction(amount));
    dispatch(closeModalAction());
  };

  const focusTrap = useFocusTrap(outerTabRef, topTabRef, bottomTabRef, closeHandler);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className="buy__modal_container" ref={outerTabRef} onKeyDown={focusTrap} role="note">
      <CloseBtn title="Confirm purchase" closeHandler={closeHandler} />
      <div className="buy__modal_content-container">
        <div className="buy__modal_contentParagraphs">
          <p className="buy__modal_contentParagraph-user">
            Dear {userName}, are you sure you want to buy following games for amount {amount}$
          </p>
          {cartGames.map(({ title }) => (
            <p className="buy__modal_contentParagraph" key={title}>
              - {title}
            </p>
          ))}
        </div>
        <Btn title="Confirm" onClick={confirmHandler} />
      </div>
    </div>
  );
};

export default BuyModalBody;
