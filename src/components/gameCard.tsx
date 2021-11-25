import React from "react";
import "./gameCard.css";
import { Game } from "../types/types";

const GameCard: React.FC<Array<Game>> = ({ title, date, category }) => (
  <div className="gameCard__container">
    <div className="gameCard__inner">
      <div className="gameCard__front">
        <div className="gameCard__img-container">
          <p>Here will be pic of {title}</p>
        </div>
        <div className="gameCard__content-container">
          <p>{title}</p>
          <p>{date}</p>
          <p>{category}</p>
        </div>
      </div>
      <div className="gameCard__back">
        <p>description</p>
      </div>
    </div>
  </div>
);

export default GameCard;
