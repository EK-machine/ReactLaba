import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./ageradiobuttons.scss";
import { fetchGamesAction } from "../../redux/filter/actionsFilter";

const ageArr = ["all ages", "6", "7", "11", "13", "15", "16", "18"];

const AgeRadioButtons: React.FC = () => {
  const dispatch = useDispatch();
  const [age, setAge] = useState<string>("all ages");
  const [firstUpdate, setFirstUpdate] = useState<boolean>(true);

  useEffect(() => {
    if (firstUpdate) {
      setFirstUpdate(!firstUpdate);
      return;
    }
    const fetchOnAge = () => {
      const partOfUrl = `?age_like=${age}`;
      dispatch(fetchGamesAction(partOfUrl));
    };

    const fetchAllAges = () => {
      const partOfUrl = "";
      dispatch(fetchGamesAction(partOfUrl));
    };

    if (age === "all ages") {
      fetchAllAges();
    } else {
      fetchOnAge();
    }
  }, [age]);

  return (
    <div className="ageSelector__container">
      {ageArr.map((item) => (
        <div className="ageSelector__input_container" key={item}>
          <input
            className="ageSelector__input_radioButton"
            type="radio"
            id={item}
            value={item}
            onChange={(e) => {
              setAge(e.target.value);
            }}
            checked={age === item}
          />
          <label className="ageSelector__label_container" htmlFor={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </label>
        </div>
      ))}
    </div>
  );
};

export default AgeRadioButtons;
