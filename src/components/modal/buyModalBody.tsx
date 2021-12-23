import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./buymodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { closeModalAction } from "../../redux/modal/actionsModal";
import { buyGamesAction, notWantToBuyGamesAction } from "../../redux/cart/actionsCart";
import { ReducerState } from "../../redux/reducerRoot";

const BuyModalBody: React.FC = () => {
  const userName = useSelector((state: ReducerState) => state.signIn.userName);
  const cartGames = useSelector((state: ReducerState) => state.cart.gamesList);
  const amount = useSelector((state: ReducerState) => state.cart.totalPurchase);
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(notWantToBuyGamesAction(amount));
    dispatch(closeModalAction());
  };

  const confirmHandler = () => {
    dispatch(buyGamesAction(amount));
    dispatch(closeModalAction());
  };

  return (
    <div className="buy__modal_container">
      <div className="buy__modal_upper-container">
        <h1 className="buy__modal_title">Confirm purchase</h1>
        <button className="buy__modal_close-btn" type="button" onClick={closeHandler}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
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
        <button className="buy__modal_contentButton" type="button" onClick={confirmHandler}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default BuyModalBody;
