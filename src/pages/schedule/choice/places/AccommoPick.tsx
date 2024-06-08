import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { DestrucDateType } from "../dates/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import { setColumns, setSelected } from "../../../../store/slices/accommoSlice";
import {
  addPlaceToColumn,
  removeAccommoFromColumn,
} from "../../../../store/slices/columnPlacesSlice";
import {
  addSelectedPlace,
  removeSelectedPlace,
} from "../../../../store/slices/placeSlice";
import { destrucDate } from "../../../../utils/date";

interface AccommoPickProps {
  date: DestrucDateType;
  index: number;
}

const AccommoPick = ({ date, index }: AccommoPickProps) => {
  const selectedPlaces = useSelector(
    (state: Rootstate) => state.place.selectedPlaces
  );
  const columns = useSelector((state: Rootstate) => state.accommo.columns);
  const match = columns.find((column) => column.index === index);
  // 이전에 선택했던 장소
  const [matched, setMatched] = useState(
    selectedPlaces?.find((place) => place.contentid === match?.contentId)
  );
  const [inserted, setInserted] = useState(false);

  const dispatch = useDispatch();

  // 현재 선택한 장소
  const place = useSelector((state: Rootstate) => state.place.place);

  console.log("place", place);

  console.log("matched", matched);

  const handleInsertImage = (
    e: React.MouseEvent<HTMLImageElement | HTMLDivElement, MouseEvent>
  ) => {
    const selectedColumn = Number(e.currentTarget.id);
    console.log(selectedColumn);

    if (!inserted) {
      const updateColumns = columns.map((col) =>
        col.index === selectedColumn
          ? { ...col, contentId: place?.contentid }
          : col
      );

      // 미리 저장된 장소가 있다면 columnPlaces에서 삭제
      if (matched) {
        matched?.contentid &&
          dispatch(
            removeAccommoFromColumn({
              column: selectedColumn.toString(),
              contentId: matched?.contentid,
            })
          );
        matched?.contentid &&
          dispatch(
            removeAccommoFromColumn({
              column: (selectedColumn + 1).toString(),
              contentId: matched?.contentid,
            })
          );

        // selectedPlaces에서 삭제
        dispatch(removeSelectedPlace(matched.contentid));
      }

      // 숙소 추가시 columnPlaces에 추가해야 함
      if (place) {
        if (selectedColumn === 0) {
          dispatch(
            addPlaceToColumn({
              column: selectedColumn,
              place: place,
              order: 0,
              date: date,
            })
          );
        }

        dispatch(
          addPlaceToColumn({
            column: selectedColumn,
            place: place,
            order: -1,
            date: date,
          })
        );

        const datePlusOne = destrucDate(
          new Date(date.year, date.month, date.date + 1)
        );

        dispatch(
          addPlaceToColumn({
            column: selectedColumn + 1,
            place: place,
            order: 0,
            date: datePlusOne,
          })
        );

        // 현재 장소 추가
        if (place) {
          dispatch(addSelectedPlace(place));
        }
      }

      dispatch(setColumns(updateColumns));
      dispatch(setSelected(true));
      setInserted(!inserted);
    }
    if (inserted) {
      const updateColumns = columns.map((col) =>
        col.index === selectedColumn ? { ...col, contentId: "" } : col
      );

      place?.contentid &&
        dispatch(
          removeAccommoFromColumn({
            column: selectedColumn.toString(),
            contentId: place?.contentid,
          })
        );
      place?.contentid &&
        dispatch(
          removeAccommoFromColumn({
            column: (selectedColumn + 1).toString(),
            contentId: place?.contentid,
          })
        );

      // 이미 저장된 장소가 있다면 다시 추가
      if (matched) {
        dispatch(addSelectedPlace(matched));
      }

      // 추가된 장소 삭제
      place && dispatch(removeSelectedPlace(place?.contentid));

      dispatch(setColumns(updateColumns));
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
        {matched && !inserted && (
          <img
            src={matched?.firstimage}
            alt="호텔"
            onClick={(e) => {
              handleInsertImage(e);
            }}
            id={index.toString()}
          />
        )}
        {/* 클릭하고 matched가 있는 경우 */}
        {inserted && matched && (
          <img
            src={place?.firstimage}
            alt="호텔"
            onClick={(e) => {
              handleInsertImage(e);
            }}
            id={index.toString()}
          />
        )}

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
