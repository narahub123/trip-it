import React from "react";
import { MetroType } from "../../types/schedules";
import "./homeModal.css";
interface HomeModalProps {
  area: MetroType;
  setActive: (value: boolean) => void;
}

const HomeModal = ({ area, setActive }: HomeModalProps) => {
  const handleModal = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const className = target.className;

    if (className === "home-modal") {
      setActive(false);
    }
  };

  return (
    <div className="home-modal" onClick={(e) => handleModal(e)}>
      <div className="container">
        <div className="info">
          <p>{area?.name}</p>
          <figure>
            <img src={area?.imgUrl} alt={area?.name} />
          </figure>
          <p>{area?.description}</p>
        </div>
        <div className="buttons">
          <button onClick={() => setActive(false)}>이전</button>
          <button>선택</button>
        </div>
      </div>
    </div>
  );
};

export default HomeModal;
