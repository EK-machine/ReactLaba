import React from "react";
import "./starrate.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StarProps } from "../../types/types";

const STARS = [1, 2, 3, 4, 5];

const StarRate: React.FC<StarProps> = ({ rating }) => (
  <div className="star__container">
    {STARS.map((star, index) => (
      <FontAwesomeIcon
        className={rating > index ? "star__item star__item-gold" : "star__item star__item-grey"}
        key={star}
        icon={faStar}
      />
    ))}
  </div>
);

export default StarRate;
