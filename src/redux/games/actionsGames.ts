import { wantDelGame, doNotWantDelEditGame, wantToEditGame, getGameData } from "./actionTypesGames";
import { fetchGamesAction } from "../filter/actionsFilter";
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

export const deleteGameAction = (partOfUrl: string) => (dispatch, getState) => {
  const gameDelId = getState().games.gameWantToDelete.id;
  fetch(`http://localhost:3000/games/${gameDelId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((resp) => {
    resp.json();
    dispatch(fetchGamesAction(partOfUrl));
  });
};

export const createGameAction = (gameToEdit: EditGame, partOfUrl: string) => (dispatch, getState) => {
  dispatch(getGameDataAction(gameToEdit));
  const game = getState().games.gameToPostPut;
  fetch(`http://localhost:3000/games`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  }).then((resp) => {
    resp.json();
    dispatch(fetchGamesAction(partOfUrl));
  });
};

export const editGameAction = (gameToEdit: EditGame, partOfUrl: string) => (dispatch, getState) => {
  dispatch(getGameDataAction(gameToEdit));
  const gameEditId = getState().games.gameToPostPut.id;
  const game = getState().games.gameToPostPut;
  fetch(`http://localhost:3000/games/${gameEditId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  }).then((resp) => {
    resp.json();
    dispatch(fetchGamesAction(partOfUrl));
  });
};
