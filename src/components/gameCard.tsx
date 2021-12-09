import React from "react";
import "./gameCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faPlaystation, faXbox } from "@fortawesome/free-brands-svg-icons";
import { ProductItemProps } from "../types/types";
import StarRate from "./elements/starRate";

const GameCard: React.FC<ProductItemProps> = ({ title, category, description, rating, price }) => {
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
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className="gameCard__container" tabIndex={0}>
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
