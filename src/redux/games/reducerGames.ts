import initialGameState from "./initialStateGame";
import { wantDelGame, doNotWantDelGame, wantToEditGame } from "./actionTypesGames";
import { EditGame, initialGameStateType } from "../../types/types";

const GamesReducer = (
  state = initialGameState as initialGameStateType,
  action: { type: string; payload: string | EditGame }
): { gameWantToDelete: string; gameWantToEdit: EditGame } => {
  switch (action.type) {
    case wantDelGame:
      return {
        ...state,
        gameWantToDelete: action.payload as string,
        gameWantToEdit: initialGameState.gameWantToEdit,
      };
    case doNotWantDelGame:
      return {
        ...state,
        gameWantToDelete: initialGameState.gameWantToDelete,
        gameWantToEdit: initialGameState.gameWantToEdit,
      };
    case wantToEditGame:
      return {
        ...state,
        gameWantToDelete: initialGameState.gameWantToDelete,
        gameWantToEdit: action.payload as EditGame,
      };
    default:
      return state;
  }
};

export default GamesReducer;
