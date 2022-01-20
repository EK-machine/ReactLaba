import React, { useMemo } from "react";
import "./gameCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons/faDesktop";
import { faPlaystation } from "@fortawesome/free-brands-svg-icons/faPlaystation";
import { faXbox } from "@fortawesome/free-brands-svg-icons/faXbox";
import { useDispatch, useSelector } from "react-redux";
import { ProductItemProps, GameCart, EditGame } from "../../types/types";
import StarRate from "./starRate";
import { addGameToCartAction } from "../../redux/cart/actionsCart";
import { wantDelGameAction, wantToEditGameAction } from "../../redux/games/actionsGames";
import { ReducerState } from "../../redux/reducerRoot";
import { showDelConfModalAction, showEditModalAction } from "../../redux/modal/actionsModal";
import Btn from "./btn";

const GameCard: React.FC<ProductItemProps> = ({
  title,
  category,
  description,
  rating,
  price,
  imgUrl,
  genre,
  age,
  id,
}) => {
  const gamesList = useSelector((state: ReducerState) => state.cart.gamesList);
  const currentUserRole = useSelector((state: ReducerState) => state.signIn.userRole);
  const loggedIn = useSelector((state: ReducerState) => state.signIn.loggedIn);
  const dispatch = useDispatch();
  const categoriesArr = [
    { categ: "pc", icon: faDesktop },
    { categ: "ps", icon: faPlaystation },
    { categ: "xbx", icon: faXbox },
  ];

  const gameCategories = useMemo(
    () =>
      categoriesArr.map((item) => {
        if (category?.includes(item.categ)) {
          return (
            <div className="gameCard__category_icon" key={item.categ}>
              <FontAwesomeIcon icon={item.icon} />
            </div>
          );
        }
        return null;
      }),
    [categoriesArr]
  );

  const gameBase = {
    title,
    category,
    price,
  };

  const game: GameCart = {
    ...gameBase,
    check: false,
    amount: 1,
  };

  const gameToDelEdit: EditGame = {
    ...gameBase,
    imgUrl,
    description,
    genre,
    age,
    id,
  };

  const clickHandler = () => {
    if (gamesList.some((stateGame) => stateGame.title === game.title)) {
      alert("Game is already in the cart");
      return;
    }
    dispatch(addGameToCartAction(game));
  };

  const removeHandler = () => {
    dispatch(showDelConfModalAction());
    dispatch(wantDelGameAction(gameToDelEdit));
  };

  const editHandler = () => {
    dispatch(showEditModalAction());
    dispatch(wantToEditGameAction(gameToDelEdit));
  };

  return (
    <div className="gameCard__container" tabIndex={0} role="menuitem">
      <div className="gameCard__inner">
        <div className="gameCard__front">
          <div className="gameCard__img-container">
            <div className="gameCard__category-container">{gameCategories}</div>
            <img className="gameCard__category_img-container" src={imgUrl} alt={title} />
          </div>
          <div className="gameCard__content-container">
            <div className="gameCard__content_left">
              <p>{title}</p>
              <StarRate rating={rating} />
            </div>
            <div className="gameCard__content_right">
              <p>{price?.toString()}</p>
            </div>
          </div>
        </div>
        <div className="gameCard__back">
          <p className="gameCard__back_description">{description}</p>
          {currentUserRole === "admin" && loggedIn ? (
            <div className="gameCard__back_btnsContainer">
              <Btn title="Add to cart" onClick={clickHandler} />
              {/* <button type="button" className="gameCard__back_btn" onClick={clickHandler}>
                Add to cart
              </button> */}
              <Btn title="Edit" onClick={editHandler} />
              {/* <button type="button" className="gameCard__back_btn" onClick={editHandler}>
                Edit
              </button> */}
              <Btn title="Remove" onClick={removeHandler} />
              {/* <button type="button" className="gameCard__back_btn" onClick={removeHandler}>
                Remove
              </button> */}
            </div>
          ) : null}
          {currentUserRole === "user" && loggedIn ? (
            <div className="gameCard__back_btnsContainer">
              <Btn title="Add to cart" onClick={clickHandler} />
              {/* <button type="button" className="gameCard__back_btn" onClick={clickHandler}>
                Add to cart
              </button> */}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default React.memo(GameCard);
