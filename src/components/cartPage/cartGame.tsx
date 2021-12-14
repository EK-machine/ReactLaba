import React from "react";
import "./cartgame.css";

const CartGame: React.FC = ({ title, category, price }) => (
  <div className="cartGame__container">
    <div className="cartGame__data_name">{title}</div>
    <div className="cartGame__data_platform">{category}</div>
    <div className="cartGame__data_date">date</div>
    <div className="cartGame__data_amount">1</div>
    <div className="cartGame__data_price">{price}</div>
    <div className="cartGame__data_check">check</div>
  </div>
);

export default CartGame;
