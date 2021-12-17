import React from "react";
import "./gameCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faPlaystation, faXbox } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { ProductItemProps, GameCart } from "../../types/types";
import StarRate from "./starRate";
import { addGameToCartAction } from "../../redux/cart/actionsCart";
import { wantDelGameAction } from "../../redux/games/actionsGames";
import { ReducerState } from "../../redux/reducerRoot";
import { showDelConfModalAction, showEditModalAction } from "../../redux/modal/actionsModal";

const GameCard: React.FC<ProductItemProps> = ({ title, category, description, rating, price, imgUrl }) => {
  const gamesList = useSelector((state: ReducerState) => state.cart.gamesList);
  // const currentUserRole = useSelector((state: ReducerState) => state.signIn.userRole);
  const dispatch = useDispatch();
  const categoriesArr = [
    { categ: "pc", icon: faDesktop },
    { categ: "ps", icon: faPlaystation },
    { categ: "xbx", icon: faXbox },
  ];

  const gameCategories = () =>
    categoriesArr.map((item) => {
      if (category.includes(item.categ)) {
        return (
          <div className="gameCard__category_icon" key={item.categ}>
            <FontAwesomeIcon icon={item.icon} />
          </div>
        );
      }
      return null;
    });

  const clickHandler = (e: React.MouseEvent | React.KeyboardEvent<HTMLDivElement>) => {
    const titleCart: string = e.currentTarget.getAttribute("data-title") as string;
    const categoryCart: string = e.currentTarget.getAttribute("data-category") as string;
    const priceCart: number = parseFloat(e.currentTarget.getAttribute("data-price") as string);
    const game: GameCart = {
      title: titleCart,
      category: categoryCart,
      price: priceCart,
      check: false,
      amount: 1,
    };

    if (!gamesList.some((stateGame) => stateGame.title === game.title)) {
      dispatch(addGameToCartAction(game));
    }
  };

  const removeHandler = () => {
    dispatch(showDelConfModalAction());
    dispatch(wantDelGameAction(title));
  };

  return (
    <div
      className="gameCard__container"
      tabIndex={0}
      onClick={clickHandler}
      onKeyUp={clickHandler}
      data-title={title}
      data-category={category}
      data-price={price}
      role="menuitem"
    >
      <div className="gameCard__inner">
        <div className="gameCard__front">
          <div className="gameCard__img-container">
            <div className="gameCard__category-container">{gameCategories()}</div>
            <img className="gameCard__category_img-container" src={imgUrl} alt={title} />
          </div>
          <div className="gameCard__content-container">
            <div className="gameCard__content_left">
              <p>{title}</p>
              <StarRate rating={rating} />
            </div>
            <div className="gameCard__content_right">
              <p>{price.toString()}</p>
            </div>
          </div>
        </div>
        <div className="gameCard__back">
          <p className="gameCard__back_description">{description}</p>
          {/* {currentUserRole === "admin" ? (
            <div className="gameCard__back_btnsContainer">
              <button type="button" className="gameCard__back_btn" onClick={() => dispatch(showEditModalAction())}>
                Edit
              </button>
              <button type="button" className="gameCard__back_btn" onClick={() => dispatch(showDelConfModalAction())}>
                Remove
              </button>
            </div>
          ) : null} */}
          <div className="gameCard__back_btnsContainer">
            <button type="button" className="gameCard__back_btn" onClick={() => dispatch(showEditModalAction())}>
              Edit
            </button>
            <button type="button" className="gameCard__back_btn" onClick={removeHandler}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
