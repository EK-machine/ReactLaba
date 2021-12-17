import { wantDelGame, doNotWantDelGame, wantToEditGame } from "./actionTypesGames";
import { EditGame } from "../../types/types";

export const wantDelGameAction = (gameTitle: string): { type: string; payload: string } => ({
  type: wantDelGame,
  payload: gameTitle,
});

export const doNotWantDelGameAction = (): { type: string } => ({
  type: doNotWantDelGame,
});

export const wantToEditGameAction = (gameToEdit: EditGame): { type: string; payload: EditGame } => ({
  type: wantToEditGame,
  payload: gameToEdit,
});
