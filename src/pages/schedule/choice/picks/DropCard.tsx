import React, { useCallback, useEffect, useState } from "react";
import "./dropCard.css";
import { ColumnPlaceType, PlaceApiType } from "../../../../types/place";
import { metros } from "../../../../data/metros";
import { Rootstate } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { contentTypeIds } from "../../../../data/contentTypeIds";
import { fetchPlace, modalToggle } from "../../../../store/slices/placeSlice";

import {
  hourFormat1,
  hourFormat2,
  minuteFormat1,
  minuteFormat2,
  timeFormat,
} from "../../../../data/time";
import { DestrucDateType } from "../dates/Calendar";
import {
  updateEndTime,
  updateStartTime,
} from "../../../../store/slices/columnPlacesSlice";
import Dropdown, { DurationType } from "./Dropdown";

interface DropCardProps {
  place: ColumnPlaceType;
  date: DestrucDateType;
  column: number;
  row: number;
}

const DropCard = ({ place, date, column, row }: DropCardProps) => {
  const dispatch = useDispatch();
  const [dropdownStates, setDropdownStates] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const toggleDropdown = (index: number) => {
    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index] = !newDropdownStates[index];
    setDropdownStates(newDropdownStates);

    // 열린 드롭다운 외의 다른 드롭다운 닫기
    for (let i = 0; i < newDropdownStates.length; i++) {
      if (i !== index && newDropdownStates[i] === true) {
        newDropdownStates[i] = false;
      }
    }
    setDropdownStates(newDropdownStates);
  };

  const areacode =
    useSelector((state: Rootstate) => state.schedule.schedule.metro_id) || "1";

  const [time, setTime] = useState<DurationType>({
    startHour:
      new Date(place.start_time).getHours() < 10
        ? "0" + new Date(place.start_time).getHours()
        : new Date(place.start_time).getHours().toString(),
    startMinute:
      new Date(place.start_time).getMinutes() < 10
        ? "0" + new Date(place.start_time).getMinutes()
        : new Date(place.start_time).getMinutes().toString(),
    endHour:
      new Date(place.start_time).getHours() < 10
        ? "0" + new Date(place.end_time).getHours()
        : new Date(place.end_time).getHours().toString(),
    endMinute:
      new Date(place.end_time).getMinutes() < 10
        ? "0" + new Date(place.end_time).getMinutes()
        : new Date(place.end_time).getMinutes().toString(),
  });

  useEffect(() => {
    dispatch(
      updateStartTime({
        column,
        row,
        hour: time.startHour,
        minute: time.startMinute,
      })
    );
  }, [time]);

  useEffect(() => {
    dispatch(
      updateEndTime({ column, row, hour: time.endHour, minute: time.endMinute })
    );
  }, [time]);

  // 기본 이미지
  const defaultImage = metros.find(
    (metro) => metro.areaCode === areacode
  )?.imgUrl;

  const handleModal = useCallback(
    (contentId: string) => {
      console.log(contentId);
      dispatch(modalToggle());
      dispatch(fetchPlace({ contentId }) as any);
    },
    [dispatch]
  );

  console.log(time);

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
          <span>
            <Dropdown
              id={"startHour"}
              contents={hourFormat2}
              init={Number(time.startHour) - 1}
              time={time}
              setTime={setTime}
              isActive={dropdownStates[0]}
              toggleDropdown={() => toggleDropdown(0)}
            />
          </span>
          :
          <span>
            <Dropdown
              id={"startMinute"}
              contents={minuteFormat2}
              init={Number(time.startMinute)}
              time={time}
              setTime={setTime}
              isActive={dropdownStates[1]}
              toggleDropdown={() => toggleDropdown(1)}
            />
          </span>
          -
          <span>
            <Dropdown
              id={"endHour"}
              contents={hourFormat2}
              init={Number(time.endHour) - 1}
              time={time}
              setTime={setTime}
              isActive={dropdownStates[2]}
              toggleDropdown={() => toggleDropdown(2)}
            />
          </span>
          :
          <span>
            <Dropdown
              id={"endMinute"}
              contents={minuteFormat2}
              init={Number(time.endMinute)}
              time={time}
              setTime={setTime}
              isActive={dropdownStates[3]}
              toggleDropdown={() => toggleDropdown(3)}
            />
          </span>
        </div>
      </span>
    </div>
  );
};

export default DropCard;
