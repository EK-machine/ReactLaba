import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./delconfmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { closeModalAction } from "../../redux/modal/actionsModal";
import { doNotWantDelEditGameAction, deleteGameAction } from "../../redux/games/actionsGames";
import { ReducerState } from "../../redux/reducerRoot";

const DelConfModalBody: React.FC = () => {
  const gameTitle = useSelector((state: ReducerState) => state.games.gameWantToDelete.title);
  const dispatch = useDispatch();
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

  const closeHandler = () => {
    dispatch(doNotWantDelEditGameAction());
    dispatch(closeModalAction());
  };

  const yesHandler = () => {
    dispatch(deleteGameAction(partOfUrl));
    dispatch(closeModalAction());
  };

  const noHandler = () => {
    dispatch(doNotWantDelEditGameAction());
    dispatch(closeModalAction());
  };

  return (
    <div className="delconf__modal_container">
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
          <button className="delconf__modal_contentButton" type="button" onClick={yesHandler}>
            Yes
          </button>
          <button className="delconf__modal_contentButton" type="button" onClick={noHandler}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DelConfModalBody;
