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

export interface DropdownState {
  down: boolean;
  violated: boolean;
}

const DropCard = ({ place, date, column, row }: DropCardProps) => {
  const dispatch = useDispatch();
  const [dropdownStates, setDropdownStates] = useState<DropdownState[]>([
    {
      down: false,
      violated: false,
    },
    {
      down: false,
      violated: false,
    },
    {
      down: false,
      violated: false,
    },
    {
      down: false,
      violated: false,
    },
  ]);

  const toggleDropdown = (index: number) => {
    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index] = {
      ...newDropdownStates[index],
      down: !newDropdownStates[index].down,
    };

    setDropdownStates(newDropdownStates);

    // 열린 드롭다운 외의 다른 드롭다운 닫기
    for (let i = 0; i < newDropdownStates.length; i++) {
      if (i !== index && newDropdownStates[i].down === true) {
        newDropdownStates[i].down = false;
      }
    }
    setDropdownStates(newDropdownStates);
  };

  const setViolated = (index: number, violated: boolean) => {
    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index].violated = violated;

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

  const handleBlur = (e: React.FocusEvent<HTMLSpanElement, Element>) => {
    e.preventDefault();
    console.log("블러닷");
    alert(`작업 완료 후 다른 거 해라`);
    return;
  };

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
          <span
            className={dropdownStates[0].violated ? "violated" : undefined}
            onBlur={
              dropdownStates[0].violated ? (e) => handleBlur(e) : undefined
            }
          >
            <Dropdown
              id={"startHour"}
              index={0}
              contents={hourFormat2}
              init={Number(time.startHour) - 1}
              time={time}
              setTime={setTime}
              dropdownStates={dropdownStates}
              toggleDropdown={toggleDropdown}
              setViolated={setViolated}
            />
          </span>
          :
          <span
            onBlur={
              dropdownStates[1].violated ? (e) => handleBlur(e) : undefined
            }
          >
            <Dropdown
              id={"startMinute"}
              index={1}
              contents={minuteFormat2}
              init={Number(time.startMinute)}
              time={time}
              setTime={setTime}
              dropdownStates={dropdownStates}
              toggleDropdown={toggleDropdown}
              setViolated={setViolated}
            />
          </span>
          -
          <span
            onBlur={
              dropdownStates[2].violated ? (e) => handleBlur(e) : undefined
            }
          >
            <Dropdown
              id={"endHour"}
              index={2}
              contents={hourFormat2}
              init={Number(time.endHour) - 1}
              time={time}
              setTime={setTime}
              dropdownStates={dropdownStates}
              toggleDropdown={toggleDropdown}
              setViolated={setViolated}
            />
          </span>
          :
          <span
            onBlur={
              dropdownStates[3].violated ? (e) => handleBlur(e) : undefined
            }
          >
            <Dropdown
              id={"endMinute"}
              index={3}
              contents={minuteFormat2}
              init={Number(time.endMinute)}
              time={time}
              setTime={setTime}
              dropdownStates={dropdownStates}
              toggleDropdown={toggleDropdown}
              setViolated={setViolated}
            />
          </span>
        </div>
      </span>
    </div>
  );
};

export default DropCard;
