import { createStore } from "redux";
import rootReducer from "./reducerRoot";

const store = createStore(rootReducer);

export default store;
