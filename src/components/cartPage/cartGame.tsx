import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./cartgame.css";
import { CartGameProps } from "../../types/types";
import { changeGameCheckAction, changeGameAmountAction } from "../../redux/cart/actionsCart";
import { ReducerState } from "../../redux/reducerRoot";

const CartGame: React.FC<CartGameProps> = ({ title, category, price }) => {
  const games = useSelector((state: ReducerState) => state.cart.gamesList);
  const [checked, setChecked] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(1);
  const dispatch = useDispatch();
  const platforms = category.split(", ");

  const amountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 0) {
      const num = Math.floor(Number(e.target.value));
      setNumber(num);
      const amountGame = games.filter((game) => game.title === title);
      amountGame[0].amount = num;
      dispatch(changeGameAmountAction(amountGame));
    }
  };

  const checkHandler = () => {
    setChecked(!checked);
    const checkedGame = games.filter((game) => game.title === title);
    checkedGame[0].check = !checked;
    dispatch(changeGameCheckAction(checkedGame));
  };

  const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      checkHandler();
    }
  };

  const totalPerGame = number * price;
  const totalPerGameCut = Math.floor(totalPerGame * 100) / 100;

  const today = new Date();

  return (
    <div className="cartGame__container">
      <div className="cartGame__data_name cartGame__data_container">
        <p className="cartGame__data_paragraphName">{title}</p>
      </div>
      <div className="cartGame__data_platform cartGame__data_container">
        <select className="cartGame__platform_selector">
          {platforms.map((platform) => (
            <option value={platform} key={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>
      <div className="cartGame__data_date cartGame__data_container">
        <p className="cartGame__data_paragraphDate">
          {`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`}
        </p>
      </div>
      <div className="cartGame__data_amount cartGame__data_container">
        <input type="number" value={number} onChange={amountHandler} className="cartGame__amount_input" />
      </div>
      <div className="cartGame__data_price cartGame__data_container">
        <p className="cartGame__data_paragraphPrice">{totalPerGameCut}</p>
      </div>
      <div className="cartGame__data_check cartGame__data_container">
        <input type="checkbox" checked={checked} onChange={checkHandler} onKeyUp={keyHandler} />
      </div>
    </div>
  );
};

export default React.memo(CartGame);
