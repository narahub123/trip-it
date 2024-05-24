import React from "react";
import "./homeCard.css";
import { MetroType } from "../../types/schedules";
import { metros } from "../../data/metros";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActive } from "../../store/slices/modalSlice";
import { getMetro } from "../../store/slices/metroSlice";

interface HomeCardProps {
  metro: MetroType;
  setActive: (value: boolean) => void;
  setArea: (value: MetroType) => void;
}

const HomeCard = ({ metro }: HomeCardProps) => {
  const dispatch = useDispatch();
  // const handleModal = (areaCode: string) => {
  //   const selectedArea = metros.find((metro) => metro.areaCode === areaCode);
  //   setActive(true);
  //   selectedArea && setArea(selectedArea);
  // };
  const handleModal = (areacode: string) => {
    dispatch(setActive());
    dispatch(getMetro(areacode));
  };
  return (
    <li
      key={metro.areaCode}
      onClick={() => handleModal(metro.areaCode)}
      className="homeCard"
    >
      <Link to={`/#${metro.areaCode}`}>
        <figure>
          <img src={metro.imgUrl} alt={metro.name} />
        </figure>
        <div>
          <p>{metro.name}</p>
        </div>
      </Link>
    </li>
  );
};

export default HomeCard;
