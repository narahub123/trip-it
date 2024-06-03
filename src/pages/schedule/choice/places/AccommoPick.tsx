import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { DestrucDateType } from "../dates/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import { setColumns } from "../../../../store/slices/placeSlice";

interface AccommoPickProps {
  date: string;
  index: number;
  setColumn: (value: number | undefined) => void;
}

const AccommoPick = ({ date, index, setColumn }: AccommoPickProps) => {
  const [inserted, setInserted] = useState(false);
  const dispatch = useDispatch();
  const place = useSelector((state: Rootstate) => state.place.place);
  const selectedPlaces = useSelector(
    (state: Rootstate) => state.place.selectedPlaces
  );

  const columns = useSelector((state: Rootstate) => state.place.columns);

  const match = columns.find((column) => column.column === index);

  const matched = selectedPlaces?.find(
    (place) => place.contentid === match?.contentId
  );

  const handleInsertImage = (index: number) => {
    if (!inserted) {
      console.log("저기");

      setColumn(index);
      const updatedColumns = columns.map((col) =>
        col.column === index ? { ...col, contentId: place?.contentid } : col
      );
      dispatch(setColumns(updatedColumns));
    }

    if (inserted) {
      console.log("여기");

      setColumn(undefined);
      const updatedColumns = columns.map((col) =>
        col.column === index ? { ...col, contentId: "" } : col
      );
      dispatch(setColumns(updatedColumns));
    }

    setInserted(!inserted);
  };
  return (
    <li className="accommo" key={date}>
      <p className="date">{date}</p>
      <figure className="image">
        {matched && !inserted && (
          <img
            src={matched?.firstimage}
            alt="호텔"
            onClick={() => {
              handleInsertImage(index);
            }}
          />
        )}
        {inserted && (
          <img
            src={place?.firstimage}
            alt="호텔"
            onClick={() => {
              handleInsertImage(index);
            }}
          />
        )}
        {!inserted && !matched && (
          <div
            className="plus"
            onClick={() => {
              handleInsertImage(index);
            }}
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
