import { wantDelGame, doNotWantDelGame } from "./actionTypesGames";

export const wantDelGameAction = (gameTitle: string): { type: string; payload: string } => ({
  type: wantDelGame,
  payload: gameTitle,
});

export const doNotWantDelGameAction = (): { type: string } => ({
  type: doNotWantDelGame,
});
