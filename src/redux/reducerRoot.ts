import { combineReducers } from "redux";
import logInReducer from "./reducerLogin";
import modalReducer from "./reducerModal";
import FilterReducer from "./reducerFilter";

const rootReducer = combineReducers({
  signIn: logInReducer,
  modal: modalReducer,
  filter: FilterReducer,
});

export default rootReducer;
export type ReducerState = ReturnType<typeof rootReducer>;
