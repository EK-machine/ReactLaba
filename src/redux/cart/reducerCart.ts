import InitialCartState from "./initalStateCart";
import {
  addGameToCart,
  changeGameCheck,
  removeGameFromCart,
  changeGameAmount,
  wantToBuyGames,
  notWantToBuyGames,
  buyGames,
} from "./actionTypesCart";
import { CartAction, InitialCartStateType, GameCart } from "../../types/types";

const CartReducer = (state = InitialCartState, action: CartAction): InitialCartStateType => {
  switch (action.type) {
    case addGameToCart:
      return {
        ...state,
        gamesList: state.gamesList.concat(action.payload as GameCart[]),
        totalPurchase: InitialCartState.totalPurchase,
        userBalance: state.userBalance,
      };
    case changeGameCheck:
      return {
        ...state,
        gamesList: state.gamesList.map(
          (initGame) =>
            (action.payload as GameCart[]).find((game: { title: string }) => game.title === initGame.title) || initGame
        ),
        totalPurchase: InitialCartState.totalPurchase,
        userBalance: state.userBalance,
      };
    case changeGameAmount:
      return {
        ...state,
        gamesList: state.gamesList.map(
          (initGame) =>
            (action.payload as GameCart[]).find((game: { title: string }) => game.title === initGame.title) || initGame
        ),
        totalPurchase: InitialCartState.totalPurchase,
        userBalance: state.userBalance,
      };
    case removeGameFromCart:
      return {
        ...state,
        gamesList: state.gamesList.filter((game) => game.check === false),
        totalPurchase: InitialCartState.totalPurchase,
        userBalance: state.userBalance,
      };

    case wantToBuyGames:
      return {
        ...state,
        gamesList: state.gamesList,
        totalPurchase: InitialCartState.totalPurchase + (action.payload as number),
        userBalance: state.userBalance,
      };

    case notWantToBuyGames:
      return {
        ...state,
        gamesList: state.gamesList,
        totalPurchase: state.totalPurchase - (action.payload as number),
        userBalance: state.userBalance,
      };

    case buyGames:
      return {
        ...state,
        gamesList: InitialCartState.gamesList,
        totalPurchase: state.totalPurchase,
        userBalance: InitialCartState.userBalance - (action.payload as number),
      };
    default:
      return state;
  }
};

export default CartReducer;
