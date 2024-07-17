import { LuSiren } from "react-icons/lu";
import "./blockButton.css";
import { blockUserAPI } from "../../../../apis/blocks";

const BlockButton = () => {
  // 블락하기
  const handleBlock = async (nickname: string) => {
    if (!window.confirm(`차단 하시겠습니까?`)) {
      return;
    }

    try {
      const response = blockUserAPI(nickname);

      console.log(response);
    } catch (error) {
      console.log(error);
      if (error === 1) {
        alert("자신을 차단할 수 없습니다.");
      }
    }
  };

  return (
    <div
      className="blockButton"
      onClick={() => handleBlock("66972ef957cc366ded3231eb")}
    >
      <LuSiren />
    </div>
  );
};

export default BlockButton;
