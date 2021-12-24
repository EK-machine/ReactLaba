import { combineReducers } from "redux";
import logInReducer from "./login/reducerLogin";
import modalReducer from "./modal/reducerModal";
import FilterReducer from "./filter/reducerFilter";
import CartReducer from "./cart/reducerCart";
import GamesReducer from "./games/reducerGames";

const rootReducer = combineReducers({
  filter: FilterReducer,
  signIn: logInReducer,
  modal: modalReducer,
  cart: CartReducer,
  games: GamesReducer,
});

export default rootReducer;
export type ReducerState = ReturnType<typeof rootReducer>;
