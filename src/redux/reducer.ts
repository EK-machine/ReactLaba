import { initialState } from "./initalState";
import { logInType, logOutType } from "./actionTypes";

const reducer = (state = initialState, action: { type: string }): { loggedIn: boolean; userName: string } => {
  switch (action.type) {
    case logInType:
      return {
        ...state,
        loggedIn: true,
      };
    case logOutType:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;
