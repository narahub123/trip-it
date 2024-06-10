import React from "react";
import "./homeCard.css";
import { MetroType } from "../../types/schedules";
import { useDispatch } from "react-redux";
import { setActive } from "../../store/slices/modalSlice";
import { getMetro } from "../../store/slices/metroSlice";

interface HomeCardProps {
  metro: MetroType;
}

const HomeCard = ({ metro }: HomeCardProps) => {
  const dispatch = useDispatch();

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
      <figure>
        <img src={metro.imgUrl} alt={metro.name} />
      </figure>
      <div>
        <p>{metro.name}</p>
      </div>
    </li>
  );
};

export default HomeCard;
