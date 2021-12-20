import { initialGameStateType, EditGame } from "../../types/types";

const initialGameState: initialGameStateType = {
  gameWantToDelete: {} as EditGame,
  gameWantToEdit: {} as EditGame,
  gameToPostPut: {} as EditGame,
};

export default initialGameState;
