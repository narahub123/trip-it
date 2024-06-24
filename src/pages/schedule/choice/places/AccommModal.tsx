import React, { useEffect, useRef, useState } from "react";
import "./accommoModal.css";

import { useDispatch, useSelector } from "react-redux";
import { accommoToggle } from "../../../../store/slices/placeSlice";
import { Rootstate, store } from "../../../../store/store";

import AccommoPick from "./AccommoPick";
import {
  calcItems,
  clearInserted,
  setItems,
  setSelected,
} from "../../../../store/slices/accommoSlice";
import Button from "../../../../components/ui/Button";
import {
  addPlaceToColumn,
  removeAccommosFromColumnPlaces,
  removePlaceFromColumnPlaces_1ByContentId,
} from "../../../../store/slices/columnPlacesSlice";
import { destrucDate } from "../../../../utils/date";

const AccommModal = () => {
  const dispatch = useDispatch();
  const buttonsRef = useRef<HTMLDivElement>(null);
  const place = useSelector((state: Rootstate) => state.place.place);
  const dates = useSelector((state: Rootstate) => state.date.datesArray);
  const items = useSelector((state: Rootstate) => state.accommo.items);
  const [selections, setSelections] = useState(
    items.map((item) => item.contentId)
  );
  const [all, setAll] = useState(false);
  const selected = useSelector((state: Rootstate) => state.accommo.selected);

  useEffect(() => {
    // contentId가 ''아닌 요소가 존재하는 여부 확인
    const isExisted = items.findIndex((item) => item.contentId !== "");
    // 존재하지 않는다면 컬럼 리셋
    if (isExisted === -1) store.dispatch(calcItems());
  }, []);

  useEffect(() => {
    // 버튼 찾기
    const modal = buttonsRef.current?.children[0] as HTMLButtonElement;
    if (modal && selected) {
      modal.focus();
    }
  }, [selected]);

  // 일정
  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (e.currentTarget.className === "accommo-modal") {
      // 토글이 작동하는 경우 selected를 품
      dispatch(setSelected(false));
      // 모든 inserted를 품
      dispatch(clearInserted());
      dispatch(accommoToggle());
    }
  };

  const handleSelection = () => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      // 선택한 숙소의 contentId와 등록한 숙소의 contentId가 갖은 경우
      if (place && item.contentId === place?.contentid) {
        // 기존에 등록되었던 숙소 정보를 columnPlaces에서 삭제해야 함
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
              accommoColumn: i,
            })
          );
        }

        dispatch(
          addPlaceToColumn({
            column: i.toString(),
            place: place,
            order: -1,
            date: dates[i],
            accommoColumn: i,
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
            accommoColumn: i,
          })
        );

        // 기존 숙소를 columnPlaces_1에서 삭제
        // 숙소 배열에 존재하는 여부 확인
        const existed = items.findIndex(
          (item) => item.contentId === deletedAccommo
        );

        console.log(existed);

        // 숙소 배열에 존재하지 않는다면 columnPlaces_1에서 삭제
        if (existed === -1)
          dispatch(removePlaceFromColumnPlaces_1ByContentId(deletedAccommo));
      }
    }

    // 숙소를 columnPlaces_1에 추가
    place &&
      dispatch(
        addPlaceToColumn({
          column: "_1",
          place,
          order: -1,
        })
      );

    dispatch(clearInserted());
    dispatch(accommoToggle());
    dispatch(setSelected(false));
  };

  const handleSelectAll = () => {
    const newItems = items.map((item) => ({
      ...item,
      contentId: place?.contentid,
      inserted: true,
    }));

    dispatch(setItems(newItems));
    dispatch(setSelected(true));
    setAll(true);
  };

  const handleRewind = () => {
    dispatch(clearInserted());
    dispatch(setSelected(false));
    setAll(false);
  };

  // esc 키를 누른 경우 모달창 닫기
  const handleEscape = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      dispatch(accommoToggle());
    }
  };

  return (
    <div
      className="accommo-modal"
      onClick={(e) => handleToggle(e)}
      tabIndex={0}
      onKeyDown={(e) => handleEscape(e)}
    >
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
          {!all ? (
            <div className="select-all" onClick={handleSelectAll}>
              전체 선택
            </div>
          ) : (
            <div className="select-all" onClick={handleRewind}>
              되돌리기
            </div>
          )}
          <div
            className="done"
            ref={buttonsRef}
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
