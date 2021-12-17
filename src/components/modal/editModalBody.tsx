import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./editmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { showDelConfModalAction, closeModalAction } from "../../redux/modal/actionsModal";
import { wantDelGameAction } from "../../redux/games/actionsGames";
import InputTextAdmin from "../elements/inputTextAdmin";
import InputNumberAdmin from "../elements/inputNumberAdmin";
import TextArea from "../elements/textArea";
import { ReducerState } from "../../redux/reducerRoot";

const ageArr = ["6+", "7+", "11+", "13+", "15+", "16+", "18+"];

const genreArr = ["action-adventure", "first-person shooter", "fighting game", "survival game", "nonlinear gameplay"];

const EditModalBody: React.FC = () => {
  const gameData = useSelector((state: ReducerState) => state.games.gameWantToEdit);
  const { title, category, price, imgUrl, description, age } = gameData;

  const [titleInp, setTitleInp] = useState<string>(title);
  const [categoryInp, setCategoryInp] = useState(category);
  const [priceInp, setPriceInp] = useState<number>(price);
  const [imgUrlInp, setImgUrlInp] = useState<string>(imgUrl);
  const [descriptionInp, setDescriptionInp] = useState<string>(description);
  const [ageInp, setAgeInp] = useState(`${age}+`);
  const [pcCheckedInp, setPcCheckedInp] = useState<boolean>(false);
  const [psCheckedInp, setPsCheckedInp] = useState<boolean>(false);
  const [xbxCheckedInp, setXbxCheckedInp] = useState<boolean>(false);
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(closeModalAction());
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
            <div className="editModal__contentForm_btnContainer">
              <button type="button" className="editModal__contentForm_btn">
                Submit
              </button>
              <button type="button" className="editModal__contentForm_btn" onClick={deleteHandler}>
                Delete card
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModalBody;
