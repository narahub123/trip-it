import React, { useEffect, useRef } from "react";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";

import { Rootstate } from "../store/store";
import { setActive } from "../store/slices/modalSlice";
import { getMetro } from "../store/slices/metroSlice";
import { addAreaCode } from "../store/slices/scheduleSlice";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const dispatch = useDispatch();
  const metro = useSelector((state: Rootstate) => state.metro.selectedMetro);

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const Target = e.target as HTMLDivElement;

    const classname = Target.className;

    if (classname === "modal") {
      dispatch(setActive());
      dispatch(getMetro(""));
    }
  };

  const handleToggle = () => {
    dispatch(setActive());
    dispatch(getMetro(""));
  };

  const handleSelect = (areaCode: string) => {
    console.log(areaCode);

    // schedule에 areaCode 추가
    dispatch(addAreaCode(areaCode));
    // schedule 페이지로 이동
    navigate(`/schedule/${metro?.name}#step1`);
    // 모달창 닫기
    dispatch(setActive());
  };

  return (
    <div className="modal" onClick={(e) => handleClose(e)}>
      <div className="container">
        <div className="info">
          <p className="title">{metro?.name}</p>
          <figure>
            <img src={metro?.imgUrl} alt={metro?.name} />
          </figure>
          <p className="desc">{metro?.description}</p>
        </div>
        <div className="buttons">
          <button onClick={handleToggle}>이전</button>
          <button onClick={metro && (() => handleSelect(metro?.areaCode))}>
            선택
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
