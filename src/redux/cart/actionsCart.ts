import {
  addGameToCart,
  changeGameCheck,
  removeGameFromCart,
  changeGameAmount,
  wantToBuyGames,
  notWantToBuyGames,
  buyGames,
} from "./actionTypesCart";
import { GameCart, CartAction } from "../../types/types";

export const addGameToCartAction = (game: GameCart): CartAction => ({
  type: addGameToCart,
  payload: game,
});

export const changeGameCheckAction = (game: Array<GameCart>): { type: string; payload: GameCart[] } => ({
  type: changeGameCheck,
  payload: game,
});

export const changeGameAmountAction = (game: Array<GameCart>): { type: string; payload: GameCart[] } => ({
  type: changeGameAmount,
  payload: game,
});

export const removeGameFromCartAction = (): { type: string } => ({
  type: removeGameFromCart,
});

export const wantToBuyGamesAction = (totalAmount: number): { type: string; payload: number } => ({
  type: wantToBuyGames,
  payload: totalAmount,
});
export const notWantToBuyGamesAction = (totalAmount: number): { type: string; payload: number } => ({
  type: notWantToBuyGames,
  payload: totalAmount,
});
export const buyGamesAction = (totalAmount: number): { type: string; payload: number } => ({
  type: buyGames,
  payload: totalAmount,
});
