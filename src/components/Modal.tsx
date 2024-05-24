import React, { useEffect, useRef } from "react";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";

import { Rootstate } from "../store/store";
import { setActive } from "../store/slices/modalSlice";
import { getMetro } from "../store/slices/metroSlice";

const Modal = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const dispatch = useDispatch();
  const metro = useSelector((state: Rootstate) => state.metro.selectedMetro);

  console.log(metro);
  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const Target = e.target as HTMLDivElement;

    const classname = Target.className;
    console.log(classname);
    if (classname === "modal") {
      dispatch(setActive());
      dispatch(getMetro(""));
    }
  };

  const handleToggle = () => {
    dispatch(setActive());
    dispatch(getMetro(""));
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
          <button>선택</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
