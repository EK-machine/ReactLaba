import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showDelConfModalAction, closeModalAction } from "../../redux/modal/actionsModal";
import {
  wantDelGameAction,
  doNotWantDelEditGameAction,
  getGameDataAction,
  editGameAction,
  createGameAction,
} from "../../redux/games/actionsGames";
import { ReducerState } from "../../redux/reducerRoot";
import help from "../../helpers/funcs";
import EditModalContent from "./editModalContent";

const ageArr = [6, 7, 11, 13, 15, 16, 18];

const genreArr = ["action-adventure", "first-person shooter", "fighting game", "survival game", "nonlinear gameplay"];

const EditModalFunc: React.FC = () => {
  const gameData = useSelector((state: ReducerState) => state.games.gameWantToEdit);
  const { title, category, price, imgUrl, description, age, genre, id, rating } = gameData;
  const incomGenreArr = genre ? genre.split(", ") : genreArr[2];
  const commonGenre = [
    category ? category.includes("pc") : false,
    category ? category.includes("ps") : false,
    category ? category.includes("xbx") : false,
  ];
  const [titleInp, setTitleInp] = useState<string>(title || "");
  const [categoryInp, setCategoryInp] = useState(incomGenreArr[0]);
  const [priceInp, setPriceInp] = useState<number>(price || 0.99);
  const [imgUrlInp, setImgUrlInp] = useState<string>(imgUrl || "");
  const [descriptionInp, setDescriptionInp] = useState<string>(description);
  const [ageInp, setAgeInp] = useState<number>(age || ageArr[0]);
  const [pcCheckedInp, setPcCheckedInp] = useState<boolean>(commonGenre[0]);
  const [psCheckedInp, setPsCheckedInp] = useState<boolean>(commonGenre[1]);
  const [xbxCheckedInp, setXbxCheckedInp] = useState<boolean>(commonGenre[2]);
  const [formValid, setFormValid] = useState<boolean>(false);
  const dispatch = useDispatch();

  const location = useLocation();
  const partOfUrl = help.getPath(location);

  const finalCategory = [pcCheckedInp ? "pc" : null, psCheckedInp ? "ps" : null, xbxCheckedInp ? "xbx" : null]
    .filter((categor) => Boolean(categor))
    .join(", ");

  const closeHandler = () => {
    dispatch(closeModalAction());
    dispatch(doNotWantDelEditGameAction());
  };

  const gameObj = {
    title: titleInp,
    imgUrl: imgUrlInp,
    price: Number(priceInp),
    description: descriptionInp,
    age: Number(ageInp),
    genre: categoryInp,
    category: finalCategory,
  };

  const delGameObj = {
    ...gameObj,
    id,
  };

  const editGameObj = {
    ...delGameObj,
    rating: rating || 4,
  };

  const createGameObj = {
    ...gameObj,
    rating: 4,
  };

  const deleteHandler = () => {
    dispatch(showDelConfModalAction());
    dispatch(wantDelGameAction(delGameObj));
  };

  const titleGetter = (nameData: string) => {
    setTitleInp(nameData);
  };

  const priceGetter = (priceData: number) => {
    if (Number(priceData) <= 0.01 && Number(priceData) > 999) {
      return;
    }
    const num = Number(Math.round(priceData * 100) / 100);
    setPriceInp(num);
  };

  const imgUrlGetter = (imgUrlData: string) => {
    setImgUrlInp(imgUrlData);
  };

  const descriptionGetter = (inputName: string) => {
    setDescriptionInp(inputName);
  };

  const submitHandlerEdit = () => {
    dispatch(getGameDataAction(editGameObj));
    dispatch(editGameAction(editGameObj, partOfUrl));
    dispatch(closeModalAction());
  };

  useEffect(() => {
    if (help.formValidEdit(titleInp, imgUrlInp, priceInp, descriptionInp, finalCategory)) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [titleInp, imgUrlInp, priceInp, descriptionInp, finalCategory]);

  const submitHandlerCreate = () => {
    dispatch(getGameDataAction(createGameObj));
    dispatch(createGameAction(createGameObj, partOfUrl));
    dispatch(closeModalAction());
  };

  const pcCheckHandler = () => {
    setPcCheckedInp(!pcCheckedInp);
  };

  const onKeyUpPc = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPcCheckedInp(!pcCheckedInp);
    }
  };

  const psCheckHandler = () => {
    setPsCheckedInp(!psCheckedInp);
  };

  const onKeyUpPs = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPsCheckedInp(!psCheckedInp);
    }
  };

  const xbxCheckHandler = () => {
    setXbxCheckedInp(!xbxCheckedInp);
  };

  const onKeyUpXbx = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setXbxCheckedInp(!xbxCheckedInp);
    }
  };

  const setCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryInp(e.target.value);
  };

  const setAge = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAgeInp(Number(e.target.value));
  };

  return (
    <>
      <EditModalContent
        closeHandler={closeHandler}
        imgUrlInp={imgUrlInp}
        titleInp={titleInp}
        titleGetter={titleGetter}
        categoryInp={categoryInp}
        setCategory={setCategory}
        ageArr={ageArr}
        genreArr={genreArr}
        priceGetter={priceGetter}
        priceInp={priceInp}
        imgUrlGetter={imgUrlGetter}
        descriptionGetter={descriptionGetter}
        descriptionInp={descriptionInp}
        ageInp={ageInp}
        setAge={setAge}
        pcCheckedInp={pcCheckedInp}
        pcCheckHandler={pcCheckHandler}
        onKeyUpPc={onKeyUpPc}
        psCheckedInp={psCheckedInp}
        psCheckHandler={psCheckHandler}
        onKeyUpPs={onKeyUpPs}
        xbxCheckedInp={xbxCheckedInp}
        xbxCheckHandler={xbxCheckHandler}
        onKeyUpXbx={onKeyUpXbx}
        gameData={gameData.title}
        formValid={formValid}
        submitHandlerEdit={submitHandlerEdit}
        deleteHandler={deleteHandler}
        submitHandlerCreate={submitHandlerCreate}
      />
    </>
  );
};

export default EditModalFunc;
