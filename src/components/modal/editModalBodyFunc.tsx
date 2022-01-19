import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./editmodalbody.css";
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
  const pcGenre = category ? category.includes("pc") : false;
  const psGenre = category ? category.includes("ps") : false;
  const xbxGenre = category ? category.includes("xbx") : false;

  const [titleInp, setTitleInp] = useState<string>(title || "");
  const [categoryInp, setCategoryInp] = useState(incomGenreArr[0]);
  const [priceInp, setPriceInp] = useState<number>(price || 0.99);
  const [imgUrlInp, setImgUrlInp] = useState<string>(imgUrl || "");
  const [descriptionInp, setDescriptionInp] = useState<string>(description);
  const [ageInp, setAgeInp] = useState<number>(age || ageArr[0]);
  const [pcCheckedInp, setPcCheckedInp] = useState<boolean>(pcGenre);
  const [psCheckedInp, setPsCheckedInp] = useState<boolean>(psGenre);
  const [xbxCheckedInp, setXbxCheckedInp] = useState<boolean>(xbxGenre);
  const [formValid, setFormValid] = useState<boolean>(false);
  const dispatch = useDispatch();

  const outerTabRef = useRef<HTMLDivElement | null>(null);
  const topTabRef = useRef<HTMLElement | null>(null);
  const bottomTabRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const focusableElements = Array.from<HTMLElement>(outerTabRef.current?.querySelectorAll("[type]") ?? []);
    const topTab = focusableElements[0];
    topTabRef.current = topTab;
    setTimeout(() => focusableElements[1]?.focus());
  }, []);

  useEffect(() => {
    const focusableElements = Array.from<HTMLElement>(outerTabRef.current?.querySelectorAll("[type]") ?? []);
    if (formValid) {
      const bottomTab = focusableElements[focusableElements.length - 1];
      bottomTabRef.current = bottomTab;
    } else {
      const bottomTab = focusableElements[focusableElements.length - 2];
      bottomTabRef.current = bottomTab;
    }
    bottomTabRef.current.focus();
  }, [formValid]);

  const location = useLocation();
  const partOfUrl = help.getPath(location);
  console.log(location);

  const finalCategory = [pcCheckedInp ? "pc" : null, psCheckedInp ? "ps" : null, xbxCheckedInp ? "xbx" : null]
    .filter((categor) => Boolean(categor))
    .join(", ");
  const finalRating = rating || 4;

  const closeHandler = () => {
    dispatch(closeModalAction());
    dispatch(doNotWantDelEditGameAction());
  };

  const deleteHandler = () => {
    dispatch(showDelConfModalAction());
    const delGameObj = {
      id,
      title: titleInp,
      imgUrl: imgUrlInp,
      price: Number(priceInp),
      description: descriptionInp,
      age: Number(ageInp),
      genre: categoryInp,
      category: finalCategory,
    };
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
    const editGameObj = {
      id,
      title: titleInp,
      imgUrl: imgUrlInp,
      price: Number(priceInp),
      description: descriptionInp,
      rating: finalRating,
      age: Number(ageInp),
      genre: categoryInp,
      category: finalCategory,
    };
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
    const createGameObj = {
      title: titleInp,
      imgUrl: imgUrlInp,
      price: priceInp,
      description: descriptionInp,
      rating: 4,
      age: Number(ageInp),
      genre: categoryInp,
      category: finalCategory,
    };
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

  const onKeyDownFunk = (e: React.KeyboardEvent) => {
    if (document.activeElement === bottomTabRef.current && e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      topTabRef.current?.focus();
    }
    if (document.activeElement === topTabRef.current && e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      bottomTabRef.current?.focus();
    }
    if (e.key === "Escape") {
      closeHandler();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className="editModal__container" ref={outerTabRef} onKeyDown={onKeyDownFunk} role="note">
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
    </div>
  );
};

export default EditModalFunc;
