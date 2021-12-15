import { addGameToCart, changeGameCheck, removeGameFromCart, changeGameAmount } from "./actionTypesCart";
import { GameCart, CartAction } from "../../types/types";

export const addGameToCartAction = (game: GameCart): CartAction => ({
  type: addGameToCart,
  payload: game,
});

export const changeGameCheckAction = (game: Array<GameCart>): CartAction => ({
  type: changeGameCheck,
  payload: game,
});

export const changeGameAmountAction = (game: Array<GameCart>): CartAction => ({
  type: changeGameAmount,
  payload: game,
});

export const removeGameFromCartAction = (): { type: string } => ({
  type: removeGameFromCart,
});
