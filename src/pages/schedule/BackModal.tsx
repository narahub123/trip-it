import React from "react";
import "./backModal.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBackToggle } from "../../store/slices/uiSlice";
import Button from "../../components/ui/Button";

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

  // esc 키를 누른 경우 모달창 닫기
  const handleEscape = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      dispatch(setBackToggle());
    }
  };

  return (
    <div
      className="back-modal"
      onClick={(e) => handleBackground(e)}
      tabIndex={0}
      onKeyDown={(e) => handleEscape(e)}
    >
      <div className="container" onClick={(e) => handleBackground(e)}>
        <div className="info">
          <p>변경사항이 저장되지 않을 수 있습니다.</p>
        </div>
        <div className="btns">
          <div className="close" onClick={() => handleCancel()}>
            <Button
              name="취소"
              backgroundColor="transparent"
              autofocus={false}
            />
          </div>
          <div className="confirm" onClick={() => handleGoBack()}>
            <Button name="확인" backgroundColor="transparent" color="red" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackModal;
