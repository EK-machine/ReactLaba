/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./editmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { showDelConfModalAction, closeModalAction } from "../../redux/modal/actionsModal";
import {
  doNotWantDelEditGameAction,
  wantDelGameAction,
  getGameDataAction,
  editGameAction,
  createGameAction,
} from "../../redux/games/actionsGames";
import InputTextAdmin from "../elements/inputTextAdmin";
import InputNumberAdmin from "../elements/inputNumberAdmin";
import TextArea from "../elements/textArea";

const ageArr = [6, 7, 11, 13, 15, 16, 18];
const genreArr = ["action-adventure", "first-person shooter", "fighting game", "survival game", "nonlinear gameplay"];

class EditModalBodyClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleInp: this.props.gameData.title || "",
      priceInp: this.props.gameData.price || 0.99,
      imgUrlInp: this.props.gameData.imgUrl || "",
      descriptionInp: this.props.gameData.description || "",
      ageInp: this.props.gameData.age || ageArr[0],
      categoryInp: this.props.gameData.genre ? this.props.gameData.genre.split(", ")[0] : genreArr[2],
      pcCheckedInp: this.props.gameData.category ? this.props.gameData.category.includes("pc") : false,
      psCheckedInp: this.props.gameData.category ? this.props.gameData.category.includes("ps") : false,
      xbxCheckedInp: this.props.gameData.category ? this.props.gameData.category.includes("xbx") : false,
    };

    this.outerTabRef = React.createRef();
    this.topTabRef = React.createRef();
    this.bottomTabRef = React.createRef();

    this.closeHandler = this.closeHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.titleGetter = this.titleGetter.bind(this);
    this.priceGetter = this.priceGetter.bind(this);
    this.imgUrlGetter = this.imgUrlGetter.bind(this);
    this.descriptionGetter = this.descriptionGetter.bind(this);
    this.ageSetter = this.ageSetter.bind(this);
    this.categorySetter = this.categorySetter.bind(this);
    this.pcCheckHandler = this.pcCheckHandler.bind(this);
    this.onKeyUpPc = this.onKeyUpPc.bind(this);
    this.psCheckHandler = this.psCheckHandler.bind(this);
    this.onKeyUpPs = this.onKeyUpPs.bind(this);
    this.xbxCheckHandler = this.xbxCheckHandler.bind(this);
    this.onKeyUpXbx = this.onKeyUpXbx.bind(this);
    this.submitHandlerEdit = this.submitHandlerEdit.bind(this);
    this.submitHandlerCreate = this.submitHandlerCreate.bind(this);
    this.onKeyDownFunk = this.onKeyDownFunk.bind(this);
  }

  componentDidMount() {
    const focusableElements = Array.from(this.outerTabRef.current?.querySelectorAll("[type]") ?? []);
    const topTab = focusableElements[0];
    this.topTabRef.current = topTab;
    const bottomTab = focusableElements[focusableElements.length - 2];
    this.bottomTabRef.current = bottomTab;
    setTimeout(() => focusableElements[1]?.focus());
  }

  componentDidUpdate() {
    const focusableElements = Array.from(this.outerTabRef.current?.querySelectorAll("[type]") ?? []);
    if (this.isFormValid()) {
      const bottomTab = focusableElements[focusableElements.length - 1];
      this.bottomTabRef.current = bottomTab;
    } else {
      const bottomTab = focusableElements[focusableElements.length - 2];
      this.bottomTabRef.current = bottomTab;
    }
  }

  closeHandler = () => {
    this.props.closeModal();
    this.props.doNotWantDelEditGame();
  };

  deleteHandler = () => {
    this.props.showDelConfModal();
    const delGameObj = {
      id: this.props.gameData.id,
      title: this.state.titleInp,
      imgUrl: this.state.imgUrlInp,
      price: Number(this.state.priceInp),
      description: this.state.descriptionInp,
      age: Number(this.state.ageInp),
      genre: this.state.categoryInp,
      category: [
        this.state.pcCheckedInp ? "pc" : null,
        this.state.psCheckedInp ? "ps" : null,
        this.state.xbxCheckedInp ? "xbx" : null,
      ]
        .filter((categor) => Boolean(categor))
        .join(", "),
    };
    this.props.wantDelGame(delGameObj);
  };

  titleGetter = (nameData) => {
    this.setState({
      titleInp: nameData,
    });
  };

  priceGetter = (priceData) => {
    if (Number(priceData) <= 0.01 && Number(priceData) > 999) {
      return;
    }
    const num = Number(Math.round(priceData * 100) / 100);
    this.setState({
      priceInp: num,
    });
  };

  imgUrlGetter = (imgUrlData) => {
    this.setState({
      imgUrlInp: imgUrlData,
    });
  };

  descriptionGetter = (inputName) => {
    this.setState({
      descriptionInp: inputName,
    });
  };

  ageSetter = (e) => {
    this.setState({ ageInp: e.target.value });
  };

  categorySetter = (e) => {
    this.setState({ categoryInp: e.target.value });
  };

  pcCheckHandler = () => {
    this.setState((prevState) => ({
      pcCheckedInp: !prevState.pcCheckedInp,
    }));
  };

  onKeyUpPc = (e) => {
    if (e.key === "Enter") {
      this.setState((prevState) => ({
        pcCheckedInp: !prevState.pcCheckedInp,
      }));
    }
  };

  psCheckHandler = () => {
    this.setState((prevState) => ({
      psCheckedInp: !prevState.psCheckedInp,
    }));
  };

  onKeyUpPs = (e) => {
    if (e.key === "Enter") {
      this.setState((prevState) => ({
        psCheckedInp: !prevState.psCheckedInp,
      }));
    }
  };

  xbxCheckHandler = () => {
    this.setState((prevState) => ({
      xbxCheckedInp: !prevState.xbxCheckedInp,
    }));
  };

  onKeyUpXbx = (e) => {
    if (e.key === "Enter") {
      this.setState((prevState) => ({
        xbxCheckedInp: !prevState.xbxCheckedInp,
      }));
    }
  };

  getPath = () => {
    const { pathname } = this.props.location;
    let partOfUrl = "/";
    if (pathname.includes("pc")) {
      partOfUrl = "?category_like=pc";
    }
    if (pathname.includes("ps")) {
      partOfUrl = "?category_like=ps";
    }
    if (pathname.includes("xbx")) {
      partOfUrl = "?category_like=xbx";
    }
    return partOfUrl;
  };

  submitHandlerEdit = () => {
    const editGameObj = {
      id: this.props.gameData.id,
      title: this.state.titleInp,
      imgUrl: this.state.imgUrlInp,
      price: Number(this.state.priceInp),
      description: this.state.descriptionInp,
      rating: this.props.gameData.rating || 4,
      age: Number(this.state.ageInp),
      genre: this.state.categoryInp,
      category: [
        this.state.pcCheckedInp ? "pc" : null,
        this.state.psCheckedInp ? "ps" : null,
        this.state.xbxCheckedInp ? "xbx" : null,
      ]
        .filter((categor) => Boolean(categor))
        .join(", "),
    };

    const partOfUrl = this.getPath();
    this.props.getGameData(editGameObj);
    this.props.editGame(editGameObj, partOfUrl);
    this.props.closeModal();
  };

  submitHandlerCreate = () => {
    const createGameObj = {
      title: this.state.titleInp,
      imgUrl: this.state.imgUrlInp,
      price: Number(this.state.priceInp),
      description: this.state.descriptionInp,
      rating: 4,
      age: Number(this.state.ageInp),
      genre: this.state.categoryInp,
      category: [
        this.state.pcCheckedInp ? "pc" : null,
        this.state.psCheckedInp ? "ps" : null,
        this.state.xbxCheckedInp ? "xbx" : null,
      ]
        .filter((categor) => Boolean(categor))
        .join(", "),
    };
    const editGameObj = {
      ...createGameObj,
      id: this.props.gameData.id,
    };
    this.props.getGameData(editGameObj);
    const partOfUrl = this.getPath();
    this.props.createGame(createGameObj, partOfUrl);
    this.props.closeModal();
  };

  isFormValid = () => {
    const finalCategory = [
      this.state.pcCheckedInp ? "pc" : null,
      this.state.psCheckedInp ? "ps" : null,
      this.state.xbxCheckedInp ? "xbx" : null,
    ]
      .filter((categor) => Boolean(categor))
      .join(", ");
    if (
      this.state.titleInp &&
      this.state.imgUrlInp &&
      this.state.priceInp &&
      this.state.descriptionInp &&
      Boolean(finalCategory)
    ) {
      return true;
    }
    return false;
  };

  onKeyDownFunk = (e) => {
    if (document.activeElement === this.bottomTabRef.current && e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      this.topTabRef.current?.focus();
    }
    if (document.activeElement === this.topTabRef.current && e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      this.bottomTabRef.current?.focus();
    }
    if (e.key === "Escape") {
      this.closeHandler();
    }
  };

  render() {
    const formValid = this.isFormValid();

    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div className="editModal__container" ref={this.outerTabRef} onKeyDown={this.onKeyDownFunk} role="note">
        <div className="editModal__upper_container">
          <h1 className="editModal__title">Edit card</h1>
          <button className="editModal__closeBtn" type="button" onClick={this.closeHandler}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="editModal__content_container">
          <div className="editModal__contentImg_container">
            <p className="editModal__contentImg_title">Card image</p>
            <img
              className="editModal__contentImg_img"
              src={this.state.imgUrlInp}
              alt={`Here will be pic of game ${this.state.titleInp}`}
            />
          </div>
          <div className="editModal__contentForm_container">
            <p className="editModal__contentForm_title">Information</p>
            <form className="editModal__contentForm_form">
              <InputTextAdmin
                name="Name"
                id="titleInput"
                type="text"
                onChange={this.titleGetter}
                value={this.state.titleInp}
              />
              <label htmlFor="genre" className="editModal__contentForm_labelGen">
                <p className="editModal__contentForm_paragraph">Category</p>
                <select
                  className="editModal__contentForm_genre"
                  id="genre"
                  onChange={this.categorySetter}
                  value={this.state.categoryInp}
                >
                  {genreArr.map((gen) => (
                    <option value={gen} key={gen}>
                      {gen}
                    </option>
                  ))}
                </select>
              </label>
              <InputNumberAdmin
                name="Price"
                id="priceInput"
                type="number"
                onChange={this.priceGetter}
                value={this.state.priceInp}
              />
              <InputTextAdmin
                name="Image"
                id="imgUrlInput"
                type="text"
                onChange={this.imgUrlGetter}
                value={this.state.imgUrlInp}
              />
              <TextArea
                name="Description"
                id="Description"
                onChange={this.descriptionGetter}
                value={this.state.descriptionInp}
              />

              <label htmlFor="age" className="editModal__contentForm_labelAge">
                <p className="editModal__contentForm_paragraph">Age</p>
                <select
                  className="editModal__contentForm_age"
                  id="age"
                  onChange={this.ageSetter}
                  value={this.state.ageInp}
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
                  checked={this.state.pcCheckedInp}
                  onChange={this.pcCheckHandler}
                  onKeyUp={this.onKeyUpPc}
                />
              </label>
              <label htmlFor="PS" className="editModal__contentForm_labelPs">
                PlayStation 5
                <input
                  type="checkbox"
                  className="editModal__contentForm_PsCheck"
                  checked={this.state.psCheckedInp}
                  onChange={this.psCheckHandler}
                  onKeyUp={this.onKeyUpPs}
                />
              </label>
              <label htmlFor="XBX" className="editModal__contentForm_labelXbx">
                XBox One
                <input
                  type="checkbox"
                  className="editModal__contentForm_XbxCheck"
                  checked={this.state.xbxCheckedInp}
                  onChange={this.xbxCheckHandler}
                  onKeyUp={this.onKeyUpXbx}
                />
              </label>

              {this.props.gameData.title ? (
                <div className="editModal__contentForm_btnContainer">
                  <button
                    type="button"
                    disabled={!formValid}
                    className="editModal__contentForm_btn"
                    onClick={this.submitHandlerEdit}
                  >
                    Submit
                  </button>
                  <button type="button" className="editModal__contentForm_btn" onClick={this.deleteHandler}>
                    Delete card
                  </button>
                </div>
              ) : (
                <div className="editModal__contentForm_btnContainer">
                  <button
                    type="button"
                    className="editModal__contentForm_btn"
                    onClick={this.submitHandlerCreate}
                    disabled={!formValid}
                  >
                    Submit
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameData: state.games.gameWantToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModalAction()),
  showDelConfModal: () => dispatch(showDelConfModalAction()),
  doNotWantDelEditGame: () => dispatch(doNotWantDelEditGameAction()),
  wantDelGame: (delGameObj) => dispatch(wantDelGameAction(delGameObj)),
  getGameData: (editGameObj) => dispatch(getGameDataAction(editGameObj)),
  editGame: (editGameObj, partOfUrl) => dispatch(editGameAction(editGameObj, partOfUrl)), // дописать про парт оф урл
  createGame: (createGameObj, partOfUrl) => dispatch(createGameAction(createGameObj, partOfUrl)), // дописать про парт оф урл
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditModalBodyClass));
