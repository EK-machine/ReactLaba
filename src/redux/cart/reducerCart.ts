import InitialCartState from "./initalStateCart";
import { addGameToCart, changeGameCheck, removeGameFromCart, changeGameAmount } from "./actionTypesCart";
import { CartAction, InitialCartStateType } from "../../types/types";

const CartReducer = (state = InitialCartState, action: CartAction): InitialCartStateType => {
  switch (action.type) {
    case addGameToCart:
      return {
        ...state,
        gamesList: state.gamesList.concat(action.payload),
      };
    case changeGameCheck:
      return {
        ...state,
        gamesList: state.gamesList.map(
          (initGame) => action.payload.find((game: { title: string }) => game.title === initGame.title) || initGame
        ),
      };
    case changeGameAmount:
      return {
        ...state,
        gamesList: state.gamesList.map(
          (initGame) => action.payload.find((game: { title: string }) => game.title === initGame.title) || initGame
        ),
      };
    case removeGameFromCart:
      return {
        ...state,
        gamesList: state.gamesList.filter((game) => game.check === false),
      };
    default:
      return state;
  }
};

export default CartReducer;
