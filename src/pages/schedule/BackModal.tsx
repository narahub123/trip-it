import React from "react";
import "./backModal.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBackToggle } from "../../store/slices/uiSlice";

const BackModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoBack = () => {
    dispatch(setBackToggle());
    navigate("/", { replace: true });
  };

  const handleBackground = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const classname = e.currentTarget.className;

    if (classname === "back-modal") dispatch(setBackToggle());
  };

  const handleCancel = () => {
    window.history.pushState(null, "", window.location.href);
    dispatch(setBackToggle());
  };

  return (
    <div className="back-modal" onClick={(e) => handleBackground(e)}>
      <div className="container" onClick={(e) => handleBackground(e)}>
        <div className="info">
          <p>변경사항이 저장되지 않을 수 있습니다.</p>
        </div>
        <div className="btns">
          <button className="close" onClick={() => handleCancel()}>
            취소
          </button>
          <button className="confirm" onClick={() => handleGoBack()} autoFocus>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackModal;
