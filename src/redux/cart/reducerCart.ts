import InitialCartState from "./initalStateCart";
import { addGameToCart, removeGameFromCart, removeGamesFromCart } from "./actionTypesCart";
import { CartAction, InitialCartStateType } from "../../types/types";

const CartReducer = (state = InitialCartState, action: CartAction): InitialCartStateType => {
  switch (action.type) {
    case addGameToCart:
      return {
        ...state,
        gamesList: state.gamesList.concat(action.payload),
      };

    case removeGameFromCart:
      return {
        ...state,
        gamesList: state.gamesList.splice(state.gamesList.findIndex(action.payload), 1),
      };

    case removeGamesFromCart:
      return {
        ...state,
        gamesList: state.gamesList.filter((ar) => !action.payload.find((rm) => rm.title === ar.title)),
      };
    default:
      return state;
  }
};

export default CartReducer;
