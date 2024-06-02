import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { DestrucDateType } from "../dates/Calendar";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";

interface AccommoPickProps {
  date: DestrucDateType;
  index: number;
  setColumn: (value: number | undefined) => void;
}

const AccommoPick = ({ date, index, setColumn }: AccommoPickProps) => {
  const [inserted, setInserted] = useState(false);
  const place = useSelector((state: Rootstate) => state.place.place);
  const selectedPlaces = useSelector(
    (state: Rootstate) => state.place.selectedPlaces
  );
  const contentIds = useSelector((state: Rootstate) => state.place.contentIds);
  console.log(contentIds);

  const matchedContentIds = contentIds?.filter(
    (contentId) => typeof contentId.column === "number"
  );

  const matchedContentId = matchedContentIds?.find((id) => id.column === index);

  const matchedPlace = selectedPlaces?.find(
    (place) => place.contentid === matchedContentId?.contentId
  );

  console.log(matchedContentIds);

  const handleInsertImage = (index: number) => {
    !inserted && setColumn(index);
    inserted && setColumn(undefined);
    setInserted(!inserted);
  };
  return (
    <li className="accommo" key={date.date}>
      <p className="date">{`${
        date.month < 10 ? "0" + date.month : date.month
      }.${date.date < 10 ? "0" + date.date : date.date}`}</p>
      <figure className="image">
        {matchedContentId && !inserted && (
          <img
            src={matchedPlace?.firstimage}
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
        {!inserted && !matchedPlace && (
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
        {inserted
          ? place?.title
          : matchedPlace
          ? matchedPlace.title
          : "호텔선택"}
      </p>
    </li>
  );
};

export default AccommoPick;
