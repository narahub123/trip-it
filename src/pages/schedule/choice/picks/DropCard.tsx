import React, { useCallback, useEffect, useState } from "react";
import "./dropCard.css";
import { PlaceApiType } from "../../../../types/place";
import { metros } from "../../../../data/metros";
import { Rootstate } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { contentTypeIds } from "../../../../data/contentTypeIds";
import { fetchPlace, modalToggle } from "../../../../store/slices/placeSlice";
import Dropdown from "../../../../components/ui/Dropdown";
import {
  hourFormat1,
  hourFormat2,
  minuteFormat1,
  minuteFormat2,
  timeFormat,
} from "../../../../data/time";

interface DropCardProps {
  place: PlaceApiType;
}

const DropCard = ({ place }: DropCardProps) => {
  const dispatch = useDispatch();
  const areacode =
    useSelector((state: Rootstate) => state.schedule.schedule.metro_id) || "1";

  // 기본 이미지
  const defaultImage = metros.find(
    (metro) => metro.areaCode === areacode
  )?.imgUrl;

  const handleModal = useCallback(
    (contentId: string) => {
      console.log(contentId);
      dispatch(modalToggle());
      dispatch(fetchPlace({ contentId, info: true }) as any);
    },
    [dispatch]
  );

  return (
    <div className="dropPlaceCard">
      <figure className="photo" onClick={() => handleModal(place.contentid)}>
        <img src={place.firstimage || defaultImage} alt={place.title} />
      </figure>
      <span className="info">
        <div className="placeName" onClick={() => handleModal(place.contentid)}>
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
        <div className="duration-time">
          <p>머무는 시간</p>
          {/* <span>
            <Dropdown contents={timeFormat} style={-22} scroll="hidden" />
          </span> */}
          <span>
            <Dropdown contents={hourFormat2} />
          </span>
          :
          <span>
            <Dropdown contents={minuteFormat2} />
          </span>
          -
          {/* <span>
            <Dropdown contents={timeFormat} style={-22} scroll="hidden" />
          </span> */}
          <span>
            <Dropdown contents={hourFormat2} />
          </span>
          :
          <span>
            <Dropdown contents={minuteFormat2} />
          </span>
        </div>
      </span>
    </div>
  );
};

export default DropCard;
