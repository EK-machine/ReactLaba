import React from "react";
import { useSelector } from "react-redux";
import CartGame from "./cartGame";
import "./cartpage.css";
import { ReducerState } from "../../redux/reducerRoot";

const CartPage: React.FC = () => {
  const games = useSelector((state: ReducerState) => state.cart);
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
        </div>
        <div className="cartPage__content_gamesContainer">
          {games.gamesList.map(({ title, category, price }) => (
            <CartGame key={title} title={title} category={category} price={price} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CartPage;
