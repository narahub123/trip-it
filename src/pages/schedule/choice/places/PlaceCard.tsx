import React from "react";
import "./placeCard.css";
import { PlaceApiType } from "../../../../types/place";
import { metros } from "../../../../data/metros";
import { Rootstate } from "../../../../store/store";
import { useSelector } from "react-redux";
import { contentTypeIds } from "../../../../data/contentTypeIds";

interface PlaceCardProps {
  place: PlaceApiType;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  const areacode =
    useSelector((state: Rootstate) => state.schedule.schedule.metro_id) || "1";
  // 기본 이미지
  const defaultImage = metros.find(
    (metro) => metro.areaCode === areacode
  )?.imgUrl;
  return (
    <div className="placeCard">
      <figure className="photo">
        <img src={place.firstimage || defaultImage} alt={place.title} />
      </figure>
      <span className="info">
        <div className="placeName">
          <p>{place.title}</p>
        </div>
        <div className="addrContainer">
          <span
            className="type"
            style={
              place.contenttypeid === "12"
                ? { color: "red" }
                : place.contenttypeid === "14"
                ? { color: "blue" }
                : place.contenttypeid === "32"
                ? { color: "violet" }
                : place.contenttypeid === "39"
                ? { color: "green" }
                : {}
            }
          >
            {contentTypeIds[Number(place.contenttypeid)]}
          </span>
          <span className="addr">{place.addr1}</span>
        </div>
      </span>
    </div>
  );
};

export default PlaceCard;
