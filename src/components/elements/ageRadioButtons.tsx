import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./ageradiobuttons.css";
import { ProductItemProps } from "../../types/types";
import { filterByCategoryAction } from "../../redux/actionsFilter";

const ageArr = ["all ages", "6", "7", "11", "13", "15", "16", "18"];

const AgeRadioButtons: React.FC = () => {
  const dispatch = useDispatch();
  const [age, setAge] = useState<string>("all ages");

  useEffect(() => {
    async function fetchOnAge() {
      const startFetch = await fetch(`http://localhost:3000/games?age_like=${age}`, { method: "GET" });
      const startFetchJson: Array<ProductItemProps> = await startFetch.json();
      dispatch(filterByCategoryAction(startFetchJson));
    }

    async function fetchAllAges() {
      const startFetch = await fetch("http://localhost:3000/games", { method: "GET" });
      const startFetchJson: Array<ProductItemProps> = await startFetch.json();
      dispatch(filterByCategoryAction(startFetchJson));
    }
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
            name="fav_lang"
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
