import { wantDelGame, doNotWantDelEditGame, wantToEditGame, getGameData } from "./actionTypesGames";
import { EditGame } from "../../types/types";

export const wantDelGameAction = (gameToDel: EditGame): { type: string; payload: EditGame } => ({
  type: wantDelGame,
  payload: gameToDel,
});

export const doNotWantDelEditGameAction = (): { type: string } => ({
  type: doNotWantDelEditGame,
});

export const wantToEditGameAction = (gameToEdit: EditGame): { type: string; payload: EditGame } => ({
  type: wantToEditGame,
  payload: gameToEdit,
});

export const getGameDataAction = (gameToEdit: EditGame): { type: string; payload: EditGame } => ({
  type: getGameData,
  payload: gameToEdit,
});

export const createGameAction = (gameToEdit: EditGame) => async (dispatch, getState) => {
  dispatch(getGameDataAction(gameToEdit));
  const game = getState().games.gameToPostPut;
  await fetch(`http://localhost:3000/games`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });
};

export const deleteGameAction = () => async (dispatch, getState) => {
  const gameId = getState().games.gameWantToDelete.id;
  const game = getState().games.gameWantToDelete;
  await fetch(`http://localhost:3000/games/${gameId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });
};

export const editGameAction = (partOfUrl: string, gameToEdit: EditGame) => async (dispatch, getState) => {
  dispatch(getGameDataAction(gameToEdit));
  const game = getState().games.gameToPostPut;
  await fetch(`http://localhost:3000/games${partOfUrl}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });
};
