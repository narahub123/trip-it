import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { DestrucDateType } from "../dates/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import { setItems, setSelected } from "../../../../store/slices/accommoSlice";
import { metros } from "../../../../data/metros";

interface AccommoPickProps {
  date: DestrucDateType;
  index: number;
}

const AccommoPick = ({ date, index }: AccommoPickProps) => {
  // 숙소배열과 동일한 컬럼
  const columnPlaces = useSelector(
    (state: Rootstate) => state.columnPlaces.columnPlaces
  );

  const colPlaces0 =
    index !== 0 ? columnPlaces[`columnPlaces${index - 1}`] : undefined;

  const accommos0 =
    colPlaces0 && colPlaces0.filter((place) => place.contenttypeid === "32");

  const colPlaces = columnPlaces[`columnPlaces${index}`];

  // 동일한 컬럼에서 숙소 존재여부 확인
  const accommos = colPlaces.filter((place) => place.contenttypeid === "32");

  // 이전에 선택했던 장소
  const matched =
    accommos.length > 1 // 숙소가 둘 이상일 때
      ? accommos[1]
      : accommos.length === 1 && accommos0?.length === 0 // 숙소가 하나이고 이전 컬럼에 숙소가 없을 때
      ? accommos[0]
      : undefined;

  // console.log(matched);

  // 숙소 배열
  const items = useSelector((state: Rootstate) => state.accommo.items);
  // console.log(items);

  // 현재 선택한 장소
  const place = useSelector((state: Rootstate) => state.place.place);

  // 현재 컬럼에 새로 이미지를 추가하였는지 여부
  const inserted = items[index].inserted;

  // console.log(inserted);

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
    // console.log(seletetedItem);

    if (!inserted) {
      const updateItems = items.map((item) =>
        item.index === seletetedItem
          ? { ...item, contentId: place?.contentid, inserted: !inserted }
          : item
      );

      dispatch(setItems(updateItems));
      dispatch(setSelected(true));
      // setInserted(!inserted);
    }
    if (inserted) {
      const updateItems = items.map((item) =>
        item.index === seletetedItem
          ? { ...item, contentId: "", inserted: !inserted }
          : item
      );

      dispatch(setItems(updateItems));
      dispatch(setSelected(false));
      // setInserted(!inserted);
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
