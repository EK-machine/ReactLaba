import initialGameState from "./initialStateGame";
import { wantDelGame, doNotWantDelEditGame, wantToEditGame, getGameData } from "./actionTypesGames";
import { EditGame, initialGameStateType } from "../../types/types";

const GamesReducer = (
  state = initialGameState as initialGameStateType,
  action: { type: string; payload: EditGame }
): { gameWantToDelete: EditGame; gameWantToEdit: EditGame; gameToPostPut: EditGame } => {
  switch (action.type) {
    case wantDelGame:
      return {
        ...state,
        gameWantToDelete: action.payload,
        gameWantToEdit: initialGameState.gameWantToEdit,
        gameToPostPut: initialGameState.gameToPostPut,
      };
    case doNotWantDelEditGame:
      return {
        ...state,
        gameWantToDelete: initialGameState.gameWantToDelete,
        gameWantToEdit: initialGameState.gameWantToEdit,
        gameToPostPut: initialGameState.gameToPostPut,
      };
    case wantToEditGame:
      return {
        ...state,
        gameWantToDelete: initialGameState.gameWantToDelete,
        gameWantToEdit: action.payload,
        gameToPostPut: initialGameState.gameToPostPut,
      };
    case getGameData:
      return {
        ...state,
        gameWantToDelete: initialGameState.gameWantToDelete,
        gameWantToEdit: initialGameState.gameWantToEdit,
        gameToPostPut: action.payload,
      };
    default:
      return state;
  }
};

export default GamesReducer;
