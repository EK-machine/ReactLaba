import React, { useState, useState } from "react";
import { useDispatch } from "react-redux";
import "./editmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { closeModalAction } from "../../redux/modal/actionsModal";
import InputTextAdmin from "../elements/inputTextAdmin";
import TextArea from "../elements/textArea";

const ageArr = ["6", "7", "11", "13", "15", "16", "18"];

const genreArr = ["action-adventure", "first-person shooter", "fighting game", "survival game", "nonlinear gameplay"];

const EditModalBody: React.FC = () => {
  const [age, setAge] = useState("6");
  const [category, setCategory] = useState("action-adventure");
  const [platform, setPlatform] = useState("");
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(closeModalAction());
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
          <img className="editModal__contentImg_img" src="here will be src" alt="here will be title" />
        </div>
        <div className="editModal__contentForm_container">
          <p className="editModal__contentForm_title">Information</p>
          <form className="editModal__contentForm_form">
            <InputTextAdmin name="Name" />
            <label htmlFor="genre" className="editModal__contentForm_labelGen">
              Category
              <select
                className="editModal__contentForm_genre"
                id="genre"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {genreArr.map((gen) => (
                  <option value={gen} key={gen}>
                    {gen}
                  </option>
                ))}
              </select>
            </label>
            <InputTextAdmin name="Price" />
            <InputTextAdmin name="Image" />
            <TextArea name="Description" id="Description" onChange="de" value="" />
            <label htmlFor="age" className="editModal__contentForm_labelAge">
              Category
              <select
                className="editModal__contentForm_age"
                id="age"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
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
              <input type="checkbox" className="editModal__contentForm_PcCheck" />
            </label>
            <label htmlFor="PS" className="editModal__contentForm_labelPs">
              PlayStation 5
              <input type="checkbox" className="editModal__contentForm_PsCheck" />
            </label>
            <label htmlFor="XBX" className="editModal__contentForm_labelXbx">
              XBox One
              <input type="checkbox" className="editModal__contentForm_XbxCheck" />
            </label>
            <div className="editModal__contentForm_btnContainer">
              <button className="editModal__contentForm_btn">Submit</button>
              <button className="editModal__contentForm_btn">Delete card</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModalBody;
