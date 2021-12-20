import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./editmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { showDelConfModalAction, closeModalAction } from "../../redux/modal/actionsModal";
import {
  wantDelGameAction,
  doNotWantDelEditGameAction,
  getGameDataAction,
  editGameAction,
  createGameAction,
} from "../../redux/games/actionsGames";
import InputTextAdmin from "../elements/inputTextAdmin";
import InputNumberAdmin from "../elements/inputNumberAdmin";
import TextArea from "../elements/textArea";
import { ReducerState } from "../../redux/reducerRoot";

const ageArr = [6, 7, 11, 13, 15, 16, 18];

// dispatch(fetchGamesAction(`?id_like=${value}`));

const genreArr = ["action-adventure", "first-person shooter", "fighting game", "survival game", "nonlinear gameplay"];

const EditModalBody: React.FC = () => {
  const gameData = useSelector((state: ReducerState) => state.games.gameWantToEdit);
  const { title, category, price, imgUrl, description, age, genre, id } = gameData;

  const incomGenreArr = genre ? genre.split(", ") : ["fighting game"];
  const incomcategoryArr = category ? category.split(", ") : ["", "", ""];
  const [pcGenre, psGenre, xbxGenre] = incomcategoryArr;

  const [titleInp, setTitleInp] = useState<string>(title);
  const [categoryInp, setCategoryInp] = useState(incomGenreArr[0]);
  const [priceInp, setPriceInp] = useState<number>(price);
  const [imgUrlInp, setImgUrlInp] = useState<string>(imgUrl);
  const [descriptionInp, setDescriptionInp] = useState<string>(description);
  const [ageInp, setAgeInp] = useState(age);
  const [pcCheckedInp, setPcCheckedInp] = useState<boolean>(Boolean(pcGenre));
  const [psCheckedInp, setPsCheckedInp] = useState<boolean>(Boolean(psGenre));
  const [xbxCheckedInp, setXbxCheckedInp] = useState<boolean>(Boolean(xbxGenre));
  const dispatch = useDispatch();

  const finalPc = pcCheckedInp ? "pc" : null;
  const finalPs = psCheckedInp ? "ps" : null;
  const finalXbx = xbxCheckedInp ? "xbx" : null;
  const categories = [finalPc, finalPs, finalXbx];
  const finalCategory = categories.filter((categor) => Boolean(categor)).join(", ");

  const closeHandler = () => {
    dispatch(closeModalAction());
    dispatch(doNotWantDelEditGameAction());
  };

  const deleteHandler = () => {
    dispatch(showDelConfModalAction());
    dispatch(wantDelGameAction(title));
  };

  const titleGetter = (nameData: string) => {
    setTitleInp(nameData);
  };

  const priceGetter = (priceData: number) => {
    if (Number(priceData) <= 0) {
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
    const partOfUrl = `?id_like=${id}`;
    const gameObj = {
      id,
      title: titleInp,
      imgUrl: imgUrlInp,
      price: priceInp,
      description: descriptionInp,
      age: Number(ageInp),
      genre: categoryInp,
      category: finalCategory,
    };
    dispatch(getGameDataAction(gameObj));
    dispatch(editGameAction(partOfUrl, gameObj));
  };

  const submitHandlerCreate = () => {
    console.log(pcGenre, psGenre, xbxGenre);
    const gameObj = {
      title: titleInp,
      imgUrl: imgUrlInp,
      price: priceInp,
      description: descriptionInp,
      age: Number(ageInp),
      genre: categoryInp,
      category: finalCategory,
      rating: 4,
    };
    dispatch(getGameDataAction(gameObj));
    dispatch(createGameAction(gameObj));
  };

  return (
    <div className="editModal__container">
      <div className="editModal__upper_container">
        <h1 className="editModal__title">Edit card</h1>
        <button className="editModal__closeBtn" type="button" onClick={closeHandler}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="editModal__content_container">
        <div className="editModal__contentImg_container">
          <p className="editModal__contentImg_title">Card image</p>
          <img className="editModal__contentImg_img" src={imgUrlInp} alt="Here will be pic of game" />
        </div>
        <div className="editModal__contentForm_container">
          <p className="editModal__contentForm_title">Information</p>
          <form className="editModal__contentForm_form">
            <InputTextAdmin name="Name" id="titleInput" type="text" onChange={titleGetter} value={titleInp} />
            <label htmlFor="genre" className="editModal__contentForm_labelGen">
              Category
              <select
                className="editModal__contentForm_genre"
                id="genre"
                onChange={(e) => setCategoryInp(e.target.value)}
                value={categoryInp}
              >
                {genreArr.map((gen) => (
                  <option value={gen} key={gen}>
                    {gen}
                  </option>
                ))}
              </select>
            </label>
            <InputNumberAdmin name="Price" id="priceInput" type="number" onChange={priceGetter} value={priceInp} />
            <InputTextAdmin name="Image" id="imgUrlInput" type="text" onChange={imgUrlGetter} value={imgUrlInp} />
            <TextArea name="Description" id="Description" onChange={descriptionGetter} value={descriptionInp} />
            <label htmlFor="age" className="editModal__contentForm_labelAge">
              Age
              <select
                className="editModal__contentForm_age"
                id="age"
                onChange={(e) => {
                  setAgeInp(e.target.value);
                }}
                value={ageInp}
              >
                {ageArr.map((ageOp) => (
                  <option value={ageOp} key={ageOp}>
                    {ageOp}
                  </option>
                ))}
              </select>
            </label>
            <p className="editModal__contentForm_platformTitle">Platgorm</p>
            <label htmlFor="PC" className="editModal__contentForm_labelPc">
              PC
              <input
                type="checkbox"
                className="editModal__contentForm_PcCheck"
                checked={pcCheckedInp}
                onChange={() => setPcCheckedInp(!pcCheckedInp)}
              />
            </label>
            <label htmlFor="PS" className="editModal__contentForm_labelPs">
              PlayStation 5
              <input
                type="checkbox"
                className="editModal__contentForm_PsCheck"
                checked={psCheckedInp}
                onChange={() => setPsCheckedInp(!psCheckedInp)}
              />
            </label>
            <label htmlFor="XBX" className="editModal__contentForm_labelXbx">
              XBox One
              <input
                type="checkbox"
                className="editModal__contentForm_XbxCheck"
                checked={xbxCheckedInp}
                onChange={() => setXbxCheckedInp(!xbxCheckedInp)}
              />
            </label>
            {gameData.title ? (
              <div className="editModal__contentForm_btnContainer">
                <button type="button" className="editModal__contentForm_btn" onClick={submitHandlerEdit}>
                  Submit
                </button>
                <button type="button" className="editModal__contentForm_btn" onClick={deleteHandler}>
                  Delete card
                </button>
              </div>
            ) : (
              <div className="editModal__contentForm_btnContainer">
                <button type="button" className="editModal__contentForm_btn" onClick={submitHandlerCreate}>
                  Submit
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModalBody;
