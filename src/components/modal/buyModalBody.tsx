import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./buymodalbody.css";
import { closeModalAction } from "../../redux/modal/actionsModal";
import { buyGamesAction, notWantToBuyGamesAction } from "../../redux/cart/actionsCart";
import { ReducerState } from "../../redux/reducerRoot";
import CloseBtn from "../elements/closeBtn";
import useFocusTrap from "../../helpers/useFocusTrap";

// const useFocusTrap = (
//   outerTabRef: React.MutableRefObject<HTMLDivElement | null>,
//   topTabRef: React.MutableRefObject<HTMLElement | null>,
//   bottomTabRef: React.MutableRefObject<HTMLElement | null>
// ) => {
//   useEffect(() => {
//     const focusableElements = Array.from<HTMLElement>(outerTabRef.current?.querySelectorAll("[type]") ?? []);
//     const topTab = focusableElements[0];
//     // eslint-disable-next-line no-param-reassign
//     topTabRef.current = topTab;
//     setTimeout(() => focusableElements[1]?.focus());
//     const bottomTab = focusableElements[focusableElements.length - 1];
//     // eslint-disable-next-line no-param-reassign
//     bottomTabRef.current = bottomTab;
//   }, []);
//   const onKeyDownFunk = (e: React.KeyboardEvent) => {
//     if (document.activeElement === bottomTabRef.current && e.key === "Tab" && !e.shiftKey) {
//       e.preventDefault();
//       topTabRef.current?.focus();
//     }
//     if (document.activeElement === topTabRef.current && e.key === "Tab" && e.shiftKey) {
//       e.preventDefault();
//       bottomTabRef.current?.focus();
//     }
//   };

//   return onKeyDownFunk;
// };

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

  // useEffect(() => {
  //   const focusableElements = Array.from<HTMLElement>(outerTabRef.current?.querySelectorAll("[type]") ?? []);
  //   const topTab = focusableElements[0];
  //   topTabRef.current = topTab;
  //   setTimeout(() => focusableElements[1]?.focus());
  //   const bottomTab = focusableElements[focusableElements.length - 1];
  //   bottomTabRef.current = bottomTab;
  // }, []);

  // const onKeyDownFunk = (e: React.KeyboardEvent) => {
  //   if (document.activeElement === bottomTabRef.current && e.key === "Tab" && !e.shiftKey) {
  //     e.preventDefault();
  //     topTabRef.current?.focus();
  //   }
  //   if (document.activeElement === topTabRef.current && e.key === "Tab" && e.shiftKey) {
  //     e.preventDefault();
  //     bottomTabRef.current?.focus();
  //   }
  //   if (e.key === "Escape") {
  //     closeHandler();
  //   }
  // };

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
        <button className="buy__modal_contentButton" type="button" onClick={confirmHandler}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default BuyModalBody;
