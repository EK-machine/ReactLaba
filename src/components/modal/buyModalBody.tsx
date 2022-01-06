import React, { useEffect, useRef } from "react";
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

  const outerTabRef = useRef<HTMLDivElement | null>(null);
  const topTabRef = useRef<HTMLElement | null>(null);
  const bottomTabRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const focusableElements = Array.from<HTMLElement>(outerTabRef.current?.querySelectorAll("[type]") ?? []);
    const topTab = focusableElements[0];
    topTabRef.current = topTab;
    setTimeout(() => topTabRef.current?.focus(), 0);
    const bottomTab = focusableElements[focusableElements.length - 1];
    bottomTabRef.current = bottomTab;
  }, []);

  const closeHandler = () => {
    dispatch(notWantToBuyGamesAction(amount));
    dispatch(closeModalAction());
  };

  const confirmHandler = () => {
    dispatch(buyGamesAction(amount));
    dispatch(closeModalAction());
  };

  const onKeyDownFunk = (e: React.KeyboardEvent) => {
    if (document.activeElement === bottomTabRef.current && e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      topTabRef.current?.focus();
    }
    if (document.activeElement === topTabRef.current && e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      bottomTabRef.current?.focus();
    }
    if (e.key === "Escape") {
      closeHandler();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className="buy__modal_container" ref={outerTabRef} onKeyDown={onKeyDownFunk} role="note">
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
