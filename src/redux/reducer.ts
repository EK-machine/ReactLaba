import { initialState } from "./initalState";
import { logInType, logOutType } from "./actionTypes";

const reducer = (
  state = initialState,
  action: { type: string; payload: string }
): { loggedIn: boolean; userName: string } => {
  switch (action.type) {
    case logInType:
      return {
        ...state,
        loggedIn: true,
        userName: action.payload,
      };
    case logOutType:
      return {
        ...state,
        loggedIn: false,
        userName: initialState.userName,
      };
    default:
      return state;
  }
};

export default reducer;
export type ReducerState = ReturnType<typeof reducer>;
