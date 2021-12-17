import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./editmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { showDelConfModalAction, closeModalAction } from "../../redux/modal/actionsModal";
import InputTextAdmin from "../elements/inputTextAdmin";
import InputNumberAdmin from "../elements/inputNumberAdmin";
import TextArea from "../elements/textArea";

const ageArr = ["6+", "7+", "11+", "13+", "15+", "16+", "18+"];

const genreArr = ["action-adventure", "first-person shooter", "fighting game", "survival game", "nonlinear gameplay"];

const EditModalBody: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState("action-adventure");
  const [price, setPrice] = useState<number>(1);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [age, setAge] = useState("6+");
  const [pcChecked, setPcChecked] = useState<boolean>(false);
  const [psChecked, setPsChecked] = useState<boolean>(false);
  const [xbxChecked, setXbxChecked] = useState<boolean>(false);
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(closeModalAction());
  };

  const deleteHandler = () => {
    dispatch(showDelConfModalAction());
  };

  const titleGetter = (nameData: string) => {
    setTitle(nameData);
  };

  const priceGetter = (priceData: number) => {
    if (Number(priceData) <= 0) {
      return;
    }
    const num = Number(Math.round(priceData * 100) / 100);
    setPrice(num);
  };

  const imgUrlGetter = (imgUrlData: string) => {
    setImgUrl(imgUrlData);
  };

  const descriptionGetter = (inputName: string) => {
    setDescription(inputName);
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
          <img className="editModal__contentImg_img" src={imgUrl} alt="Here will be pic of game" />
        </div>
        <div className="editModal__contentForm_container">
          <p className="editModal__contentForm_title">Information</p>
          <form className="editModal__contentForm_form">
            <InputTextAdmin name="Name" id="titleInput" type="text" onChange={titleGetter} value={title} />
            <label htmlFor="genre" className="editModal__contentForm_labelGen">
              Category
              <select
                className="editModal__contentForm_genre"
                id="genre"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                {genreArr.map((gen) => (
                  <option value={gen} key={gen}>
                    {gen}
                  </option>
                ))}
              </select>
            </label>
            <InputNumberAdmin name="Price" id="priceInput" type="number" onChange={priceGetter} value={price} />
            <InputTextAdmin name="Image" id="imgUrlInput" type="text" onChange={imgUrlGetter} value={imgUrl} />
            <TextArea name="Description" id="Description" onChange={descriptionGetter} value={description} />
            <label htmlFor="age" className="editModal__contentForm_labelAge">
              Age
              <select
                className="editModal__contentForm_age"
                id="age"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                value={age}
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
                checked={pcChecked}
                onChange={() => setPcChecked(!pcChecked)}
              />
            </label>
            <label htmlFor="PS" className="editModal__contentForm_labelPs">
              PlayStation 5
              <input
                type="checkbox"
                className="editModal__contentForm_PsCheck"
                checked={psChecked}
                onChange={() => setPsChecked(!psChecked)}
              />
            </label>
            <label htmlFor="XBX" className="editModal__contentForm_labelXbx">
              XBox One
              <input
                type="checkbox"
                className="editModal__contentForm_XbxCheck"
                checked={xbxChecked}
                onChange={() => setXbxChecked(!xbxChecked)}
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
