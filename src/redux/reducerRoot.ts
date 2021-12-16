import { combineReducers } from "redux";
import logInReducer from "./login/reducerLogin";
import modalReducer from "./modal/reducerModal";
import FilterReducer from "./filter/reducerFilter";
import CartReducer from "./cart/reducerCart";

const rootReducer = combineReducers({
  signIn: logInReducer,
  modal: modalReducer,
  filter: FilterReducer,
  cart: CartReducer,
});

export default rootReducer;
export type ReducerState = ReturnType<typeof rootReducer>;
