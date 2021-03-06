import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./delconfmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { closeModalAction } from "../../redux/modal/actionsModal";
import { doNotWantDelEditGameAction, deleteGameAction } from "../../redux/games/actionsGames";
import { ReducerState } from "../../redux/reducerRoot";
import useFocusTrap from "../../helpers/useFocusTrap";
import Btn from "../elements/btn";

const DelConfModalBody: React.FC = () => {
  const gameTitle = useSelector((state: ReducerState) => state.games.gameWantToDelete.title);
  const dispatch = useDispatch();

  const outerTabRef = useRef<HTMLDivElement | null>(null);
  const topTabRef = useRef<HTMLElement | null>(null);
  const bottomTabRef = useRef<HTMLElement | null>(null);

  const closeHandler = () => {
    dispatch(doNotWantDelEditGameAction());
    dispatch(closeModalAction());
  };

  const focusTrap = useFocusTrap(outerTabRef, topTabRef, bottomTabRef, closeHandler);

  const location = useLocation();
  let partOfUrl = "/";
  if (location.pathname.includes("pc")) {
    partOfUrl = "?category_like=pc";
  }
  if (location.pathname.includes("ps")) {
    partOfUrl = "?category_like=ps";
  }
  if (location.pathname.includes("xbx")) {
    partOfUrl = "?category_like=xbx";
  }

  const yesHandler = () => {
    dispatch(deleteGameAction(partOfUrl));
    dispatch(closeModalAction());
  };

  const noHandler = () => {
    dispatch(doNotWantDelEditGameAction());
    dispatch(closeModalAction());
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className="delconf__modal_container" ref={outerTabRef} onKeyDown={focusTrap} role="note">
      <div className="delconf__modal_upper-container">
        <h1 className="delconf__modal_title">Confirm delete</h1>
        <button className="delconf__modal_closeBtn" type="button" onClick={closeHandler}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="delconf__modal_contentContainer">
        <div className="delconf__modal_paragraphContainer">
          <p className="delconf__modal_contentParagraph">Are you sure you want to delete the product {gameTitle}?</p>
        </div>
        <div className="delconf__modal_btnsContainer">
          <Btn title="Yes" onClick={yesHandler} />
          <Btn title="No" onClick={noHandler} />
        </div>
      </div>
    </div>
  );
};

export default DelConfModalBody;
