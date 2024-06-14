import React, { useEffect, useState } from "react";
import "./accommoModal.css";

import { useDispatch, useSelector } from "react-redux";
import {
  accommoToggle,
  addSelectedPlace,
} from "../../../../store/slices/placeSlice";
import { Rootstate, store } from "../../../../store/store";

import AccommoPick from "./AccommoPick";
import { calcItems, setSelected } from "../../../../store/slices/accommoSlice";
import Button from "../../../../components/ui/Button";
import {
  addPlaceToColumn,
  removeAccommosFromColumnPlaces,
  removePlaceFromColumnPlaces_1,
} from "../../../../store/slices/columnPlacesSlice";
import { destrucDate } from "../../../../utils/date";

const AccommModal = () => {
  const dispatch = useDispatch();
  const place = useSelector((state: Rootstate) => state.place.place);
  const dates = useSelector((state: Rootstate) => state.date.datesArray);
  const items = useSelector((state: Rootstate) => state.accommo.items);
  const [selections, setSelections] = useState(
    items.map((item) => item.contentId)
  );
  const selected = useSelector((state: Rootstate) => state.accommo.selected);

  useEffect(() => {
    // contentId가 ''아닌 요소가 존재하는 여부 확인
    const isExisted = items.findIndex((item) => item.contentId !== "");
    // 존재하지 않는다면 컬럼 리셋
    if (isExisted === -1) store.dispatch(calcItems());
  }, []);

  // 일정
  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (e.currentTarget.className === "accommo-modal") {
      // 토글이 작동하는 경우 selected를 품
      dispatch(setSelected(false));
      dispatch(accommoToggle());
    }
  };

  const handleSelection = () => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      // 선택한 숙소의 contentId와 등록한 숙소의 contentId가 갖은 경우
      if (place && item.contentId === place?.contentid) {
        // 기존에 등록되었던 숙소 정보를 columnPlaces에서 삭제해야 함
        // 기존에 등록되었던 숙소의 contentId
        const deletedAccommo = selections[i];
        dispatch(
          removeAccommosFromColumnPlaces({
            column: i,
            contentId: deletedAccommo,
          })
        );

        // 삭제가 완료되고 새로운 숙소 등록 : 삭제 완료 전에 숙소가 등록될 듯?
        if (i === 0) {
          dispatch(
            addPlaceToColumn({
              column: "0",
              place: place,
              order: 0,
              date: dates[0],
            })
          );
        }

        dispatch(
          addPlaceToColumn({
            column: i.toString(),
            place: place,
            order: -1,
            date: dates[i],
          })
        );

        const datePlusOne = destrucDate(
          new Date(dates[i].year, dates[i].month, dates[i].date + 1)
        );

        dispatch(
          addPlaceToColumn({
            column: (i + 1).toString(),
            place: place,
            order: 0,
            date: datePlusOne,
          })
        );
      }
    }

    place && dispatch(addSelectedPlace(place));
    dispatch(accommoToggle());
    dispatch(setSelected(false));
  };

  return (
    <div className="accommo-modal" onClick={(e) => handleToggle(e)}>
      <div className="accommo-container" onClick={(e) => handleToggle(e)}>
        <div className="container">
          <div className="desc">숙박하실 날짜를 선택해주세요</div>
          <div className="accommo-title">{place?.title}</div>
          <div className="accommo-list-container">
            <ul>
              {items.map((item) => (
                <AccommoPick
                  date={item.date}
                  index={item.index}
                  key={item.date.date}
                />
              ))}
            </ul>
          </div>
          <div className="select-all">전체 선택</div>
          <div
            className="done"
            onClick={
              selected
                ? () => {
                    handleSelection();
                  }
                : () => dispatch(accommoToggle())
            }
          >
            {selected ? (
              <Button
                name="선택"
                padding={`15px 0px`}
                backgroundColor="black"
                color="white"
                width={"70%"}
              />
            ) : (
              <Button
                name="되돌아기기"
                padding={`15px 0px`}
                backgroundColor="black"
                color="white"
                width={"70%"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommModal;
