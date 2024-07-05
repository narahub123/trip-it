import React, { useEffect, useRef } from "react";
import "./homeModal.css";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Rootstate } from "../../store/store";
import { setActive } from "../../store/slices/modalSlice";
import { getMetro } from "../../store/slices/metroSlice";
import { addAreaCode } from "../../store/slices/scheduleSlice";
import Button from "../../components/ui/Button";

const HomeModal = () => {
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

    console.log(classname);

    if (classname === "home-modal") {
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
    navigate(`/planner/${metro?.name}#step1`);
    // 모달창 닫기
    dispatch(setActive());
  };

  // esc 키를 누른 경우 모달창 닫기
  const handleEscape = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      dispatch(setActive());
    }
  };

  return (
    <div
      className="home-modal"
      onClick={(e) => handleClose(e)}
      tabIndex={0}
      onKeyDown={(e) => handleEscape(e)}
    >
      <div className="container">
        <div className="info">
          <p className="title">{metro?.name}</p>
          <figure>
            <img src={metro?.imgUrl} alt={metro?.name} />
          </figure>
          <p className="desc">{metro?.description}</p>
        </div>
        <div className="buttons">
          <div onClick={handleToggle}>
            <Button
              name="이전"
              backgroundColor="transparent"
              autofocus={false}
            />
          </div>
          <div onClick={metro && (() => handleSelect(metro?.areaCode))}>
            <Button name="선택" backgroundColor="transparent" color="red" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeModal;
