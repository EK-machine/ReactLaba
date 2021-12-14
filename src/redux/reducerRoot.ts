import { combineReducers } from "redux";
import logInReducer from "./reducerLogin";
import modalReducer from "./reducerModal";
import FilterReducer from "./reducerFilter";
import CartReducer from "./cart/reducerCart";

const rootReducer = combineReducers({
  signIn: logInReducer,
  modal: modalReducer,
  filter: FilterReducer,
  cart: CartReducer,
});

export default rootReducer;
export type ReducerState = ReturnType<typeof rootReducer>;
