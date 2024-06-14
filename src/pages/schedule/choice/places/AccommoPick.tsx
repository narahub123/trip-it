import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { DestrucDateType } from "../dates/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import { setItems, setSelected } from "../../../../store/slices/accommoSlice";
import {
  addPlaceToColumn,
  removeAccommoFromColumn,
} from "../../../../store/slices/columnPlacesSlice";
import {
  addSelectedPlace,
  removeSelectedPlace,
} from "../../../../store/slices/placeSlice";
import { destrucDate } from "../../../../utils/date";
import { metros } from "../../../../data/metros";

interface AccommoPickProps {
  date: DestrucDateType;
  index: number;
}

const AccommoPick = ({ date, index }: AccommoPickProps) => {
  // 선택한 장소를 모아둠
  const columnPlaces_1 = useSelector(
    (state: Rootstate) => state.columnPlaces.columnPlaces[`columnPlaces_1`]
  );

  // 선택한 장소 보관소의 요소 개수
  const numOfSavedPlaces = columnPlaces_1.length;

  const items = useSelector((state: Rootstate) => state.accommo.items);
  const place = useSelector((state: Rootstate) => state.place.place);
  const match = items.find((item) => item.index === index);
  // 이전에 선택했던 장소
  const [matched, setMatched] = useState(
    columnPlaces_1?.find((place) => place.contentid === match?.contentId)
  );
  const [inserted, setInserted] = useState(false);

  const dispatch = useDispatch();

  // 현재 선택한 장소

  // 기본 이미지
  const defaultImage = metros.find(
    (metro) => metro.areaCode === place?.areacode
  )?.imgUrl;

  const handleInsertImage = (
    e: React.MouseEvent<HTMLImageElement | HTMLDivElement, MouseEvent>
  ) => {
    const seletetedItem = Number(e.currentTarget.id);
    console.log(seletetedItem);

    if (!inserted) {
      const updateItems = items.map((item) =>
        item.index === seletetedItem
          ? { ...item, contentId: place?.contentid }
          : item
      );

      // selectedPlaces에서 삭제
      matched && dispatch(removeSelectedPlace(matched.contentid));

      dispatch(setItems(updateItems));
      dispatch(setSelected(true));
      setInserted(!inserted);
    }
    if (inserted) {
      const updateItems = items.map((item) =>
        item.index === seletetedItem ? { ...item, contentId: "" } : item
      );

      // 이미 저장된 장소가 있다면 다시 추가
      if (matched) {
        dispatch(addSelectedPlace(matched));
      }

      // 추가된 장소 삭제
      place && dispatch(removeSelectedPlace(place?.contentid));

      dispatch(setItems(updateItems));
      dispatch(setSelected(false));
      setInserted(!inserted);
    }
  };

  return (
    <li className="accommo" key={date.date}>
      <p className="date">{`${
        date.month < 10 ? "0" + date.month : date.month
      }.${date.date < 10 ? "0" + date.date : date.date}`}</p>
      <figure className="image">
        {/* 기존 선택한 장소가 있는 경우 */}
        {matched && !inserted && (
          <img
            src={matched?.firstimage || defaultImage}
            alt="호텔"
            onClick={(e) => {
              handleInsertImage(e);
            }}
            id={index.toString()}
          />
        )}
        {/* 클릭하고 place가 있는 경우 */}
        {inserted && place && (
          <img
            src={place?.firstimage || defaultImage}
            alt="호텔"
            onClick={(e) => {
              handleInsertImage(e);
            }}
            id={index.toString()}
          />
        )}
        {/* 클릭 안하고 기존 장소도 없음 */}
        {!inserted && !matched && (
          <div
            className="plus"
            onClick={(e) => {
              handleInsertImage(e);
            }}
            id={index.toString()}
          >
            <LuPlus />
          </div>
        )}
      </figure>
      <p className="accommo-name">
        {inserted ? place?.title : matched ? matched.title : "호텔선택"}
      </p>
    </li>
  );
};

export default AccommoPick;
