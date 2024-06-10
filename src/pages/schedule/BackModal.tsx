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

  return (
    <div className="back-modal">
      <div className="container">
        <div className="info">
          <p>변경사항이 저장되지 않을 수 있습니다.</p>
        </div>
        <div className="btns">
          <p className="close" onClick={() => dispatch(setBackToggle())}>
            취소
          </p>
          <p className="confirm" onClick={() => handleGoBack()}>
            확인
          </p>
        </div>
      </div>
    </div>
  );
};

export default BackModal;
