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
import { DestrucDateType } from "../dates/Calendar";
import {
  updateEndTime,
  updateStartTime,
} from "../../../../store/slices/scheduleSlice";

interface DropCardProps {
  place: PlaceApiType;
  date: DestrucDateType;
  column: number;
}

const DropCard = ({ place, date, column }: DropCardProps) => {
  const dispatch = useDispatch();
  const areacode =
    useSelector((state: Rootstate) => state.schedule.schedule.metro_id) || "1";

  const details = useSelector(
    (state: Rootstate) => state.schedule.schedule.schedule_details
  );

  const detail = details?.find((d) => d.content_id === place.contentid);

  const [startHourInit, setStartHourInit] = useState(
    detail ? new Date(detail?.start_time).getHours() : 7
  );

  const [startMinuteInit, setStartMinuteInit] = useState(
    detail ? new Date(detail?.start_time).getMinutes() : 0
  );

  const [endHourInit, setEndHourInit] = useState(
    detail ? new Date(detail?.end_time).getHours() : 9
  );

  const [endMinuteInit, setEndMinuteInit] = useState(
    detail ? new Date(detail?.end_time).getMinutes() : 0
  );

  useEffect(() => {
    const start_time = new Date(
      date.year,
      date.month,
      date.date,
      startHourInit,
      startMinuteInit
    );

    dispatch(
      updateStartTime({
        contendId: place.contentid,
        date: start_time.toISOString(),
        column: column,
      })
    );
  }, [startHourInit, startMinuteInit]);

  useEffect(() => {
    const end_time = new Date(
      date.year,
      date.month,
      date.date,
      endHourInit,
      endMinuteInit
    );

    dispatch(
      updateEndTime({
        contendId: place.contentid,
        date: end_time.toISOString(),
        column: column,
      })
    );
  }, [endHourInit, endMinuteInit]);

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

  // console.log(startHourInit, startMinuteInit, endHourInit, endMinuteInit);

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
            <Dropdown
              contents={hourFormat2}
              init={startHourInit - 1}
              setStartHourInit={setStartHourInit}
            />
          </span>
          :
          <span>
            <Dropdown
              contents={minuteFormat2}
              init={startMinuteInit}
              setStartMinuteInit={setStartMinuteInit}
            />
          </span>
          -
          {/* <span>
            <Dropdown contents={timeFormat} style={-22} scroll="hidden" />
          </span> */}
          <span>
            <Dropdown
              contents={hourFormat2}
              init={endHourInit - 1}
              setEndHourInit={setEndHourInit}
            />
          </span>
          :
          <span>
            <Dropdown
              contents={minuteFormat2}
              init={endMinuteInit}
              setEndMinuteInit={setEndMinuteInit}
            />
          </span>
        </div>
      </span>
    </div>
  );
};

export default DropCard;
