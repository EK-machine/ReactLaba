import React from "react";
import "./gameCard.css";

interface GameCardProps {
  title: string;
  developer: string;
  date: string;
}

const GameCard = ({ title, developer, date }: GameCardProps): JSX.Element => (
  <div className="gameCard__container" onClick={() => alert("got product")}>
    <p className="gameCard__paragraph">{title}</p>
    <p className="gameCard__paragraph">{developer}</p>
    <p className="gameCard__paragraph">{date}</p>
  </div>
);

export default GameCard;
