import React, { useRef } from "react";
import "./editmodalcontent.css";
import InputTextAdmin from "../elements/inputTextAdmin";
import InputNumberAdmin from "../elements/inputNumberAdmin";
import TextArea from "../elements/textArea";
import OptionSelect from "../elements/optionSelect";
import Checkbox from "../elements/checkbox";
import CloseBtn from "../elements/closeBtn";
import Btn from "../elements/btn";
import useFocusTrap from "../../helpers/useFocusTrap";

interface EditModalContentProps {
  closeHandler: () => void;
  imgUrlInp: string;
  titleInp: string;
  titleGetter: (nameData: string) => void;
  categoryInp: string;
  setCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  ageArr: number[];
  genreArr: string[];
  priceGetter: (priceData: number) => void;
  priceInp: number;
  imgUrlGetter: (imgUrlData: string) => void;
  descriptionGetter: (inputName: string) => void;
  descriptionInp: string;
  ageInp: number;
  setAge: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  pcCheckedInp: boolean;
  pcCheckHandler: () => void;
  onKeyUpPc: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  psCheckedInp: boolean;
  psCheckHandler: () => void;
  onKeyUpPs: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  xbxCheckedInp: boolean;
  xbxCheckHandler: () => void;
  onKeyUpXbx: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  gameData: string;
  formValid: boolean;
  submitHandlerEdit: () => void;
  deleteHandler: () => void;
  submitHandlerCreate: () => void;
}

const EditModalContent: React.FC<EditModalContentProps> = (props) => {
  const outerTabRef = useRef<HTMLDivElement | null>(null);
  const topTabRef = useRef<HTMLElement | null>(null);
  const bottomTabRef = useRef<HTMLElement | null>(null);

  const focusTrap = useFocusTrap(outerTabRef, topTabRef, bottomTabRef, props.closeHandler, props.formValid);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className="editModal__container" ref={outerTabRef} onKeyDown={focusTrap} role="note">
      <CloseBtn title="Edit card" closeHandler={props.closeHandler} />
      <div className="editModal__content_container">
        <div className="editModal__contentImg_container">
          <p className="editModal__contentImg_title">Card image</p>
          <img
            className="editModal__contentImg_img"
            src={props.imgUrlInp}
            alt={`Here will be pic of game ${props.titleInp}`}
          />
        </div>
        <div className="editModal__contentForm_container">
          <p className="editModal__contentForm_title">Information</p>
          <form className="editModal__contentForm_form">
            <InputTextAdmin
              name="Name"
              id="titleInput"
              type="text"
              onChange={props.titleGetter}
              value={props.titleInp}
            />
            <OptionSelect
              name="Category"
              id="genre"
              value={props.categoryInp}
              onChange={props.setCategory}
              arr={props.genreArr as string[]}
            />
            <InputNumberAdmin
              name="Price"
              id="priceInput"
              type="number"
              onChange={props.priceGetter}
              value={props.priceInp}
            />
            <InputTextAdmin
              name="Image"
              id="imgUrlInput"
              type="text"
              onChange={props.imgUrlGetter}
              value={props.imgUrlInp}
            />
            <TextArea
              name="Description"
              id="Description"
              onChange={props.descriptionGetter}
              value={props.descriptionInp}
            />
            <OptionSelect
              name="Age"
              id="age"
              value={props.ageInp}
              onChange={props.setAge}
              arr={props.ageArr as number[]}
            />
            <p className="editModal__contentForm_platformTitle">Platgorm</p>
            <Checkbox
              name="PC"
              checked={props.pcCheckedInp}
              onChange={props.pcCheckHandler}
              onKeyUp={props.onKeyUpPc}
            />
            <Checkbox
              name="PS"
              checked={props.psCheckedInp}
              onChange={props.psCheckHandler}
              onKeyUp={props.onKeyUpPs}
            />
            <Checkbox
              name="XBox"
              checked={props.xbxCheckedInp}
              onChange={props.xbxCheckHandler}
              onKeyUp={props.onKeyUpXbx}
            />
            <div className="editModal__contentForm_btnContainer">
              {props.gameData ? (
                <>
                  <Btn disabled={!props.formValid} title="Submit" onClick={props.submitHandlerEdit} />
                  <Btn title="Delete card" onClick={props.deleteHandler} />
                </>
              ) : (
                <Btn disabled={!props.formValid} title="Submit" onClick={props.submitHandlerCreate} />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModalContent;
