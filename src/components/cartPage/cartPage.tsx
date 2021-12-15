import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartGame from "./cartGame";
import "./cartpage.css";
import { ReducerState } from "../../redux/reducerRoot";
import { removeGameFromCartAction } from "../../redux/cart/actionsCart";

const CartPage: React.FC = () => {
  const games = useSelector((state: ReducerState) => state.cart.gamesList);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(removeGameFromCartAction());
  };

  const userBalance = 1000;

  useEffect(() => {
    const total = games.map((game) => game.amount * game.price).reduce((sum, current) => sum + current, 0);
    if (total <= userBalance) {
      setTotalAmount(total);
    } else {
      alert("YOu do not have enough money");
    }
  }, [games]);

  return (
    <div className="cartPage__container">
      <section className="cartPage__title_section">
        <div className="cartPage__title_container">
          <h1 className="cartPage__title">Cart page</h1>
        </div>
      </section>
      <section className="cartPage__content_section">
        <div className="cartPage__content_titlesContainer">
          <div className="cartPage__content_titleContainer cartPage__content_containerName">
            <p className="cartPage__content_title">Name</p>
          </div>
          <div className="cartPage__content_titleContainer  cartPage__content_containerPlatform">
            <p className="cartPage__content_title">Platform</p>
          </div>
          <div className="cartPage__content_titleContainer  cartPage__content_containerDate">
            <p className="cartPage__content_title">Order date</p>
          </div>
          <div className="cartPage__content_titleContainer  cartPage__content_containerAmount">
            <p className="cartPage__content_title">Amount</p>
          </div>
          <div className="cartPage__content_titleContainer  cartPage__content_containerPrice">
            <p className="cartPage__content_title">Price($)</p>
          </div>
          <div className="cartPage__content_titleContainer  cartPage__content_containerEmpty" />
        </div>
        <form className="cartPage__content_gamesContainer">
          {games.map(({ title, category, price }) => (
            <CartGame key={title} title={title} category={category} price={price} />
          ))}
          {games.length > 0 ? (
            <div className="cartPage__formRemove_container">
              <button className="cartPage__formRemove_btn" type="button" onClick={clickHandler}>
                Remove
              </button>
            </div>
          ) : null}
          <div className="cartPage__formSubmit_container">
            <div className="cartPage__formSubmit_gamesCost">
              {games.length > 0 ? <p className="cartPage__gamesCost">Games cost {totalAmount} $</p> : null}
            </div>
            <div className="cartPage__formSubmit_yourBalance">
              <p className="cartPage__yourBalance">Your balance: {userBalance} $</p>
            </div>
            <div className="cartPage__formSubmit_submitBtn">
              {games.length > 0 ? (
                <button className="cartPage__formSubmit_btn" type="button">
                  Buy
                </button>
              ) : null}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CartPage;
