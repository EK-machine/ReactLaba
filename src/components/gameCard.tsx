import React from "react";
import "./gameCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faPlaystation, faXbox } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { ProductItemProps } from "../types/types";
import StarRate from "./elements/starRate";
import { addGameToCartAction } from "../redux/cart/actionsCart";
import { ReducerState } from "../redux/reducerRoot";

const GameCard: React.FC<ProductItemProps> = ({ title, category, description, rating, price }) => {
  const gamesList = useSelector((state: ReducerState) => state.cart.gamesList);
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

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const titleCart: string = e.currentTarget.getAttribute("data-title");
    const categoryCart: string = e.currentTarget.getAttribute("data-category");
    const priceCart: number = parseFloat(e.currentTarget.getAttribute("data-price"));
    const game = {
      title: titleCart,
      category: categoryCart,
      price: priceCart,
    };

    console.log();

    if (gamesList.some((stateGame) => stateGame.title === game.title)) {
      alert("Game is already in cart");
    } else {
      dispatch(addGameToCartAction([game]));
    }
  };

  return (
    <div
      className="gameCard__container"
      tabIndex={0}
      onClick={clickHandler}
      data-title={title}
      data-category={category}
      data-price={price}
    >
      <div className="gameCard__inner">
        <div className="gameCard__front">
          <div className="gameCard__img-container">
            <div className="gameCard__category-container">{gameCategories()}</div>
            <p>Here will be pic of {title}</p>
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
        </div>
      </div>
    </div>
  );
};

export default GameCard;
