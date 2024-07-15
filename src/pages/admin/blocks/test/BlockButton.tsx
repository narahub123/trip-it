import { LuSiren } from "react-icons/lu";
import "./blockButton.css";
import { blockUserAPI } from "../../../../apis/blocks";

const BlockButton = () => {
  // 블락하기
  const handleBlock = (nickname: string) => {
    if (!window.confirm(`차단 하시겠습니까?`)) {
      return;
    }

    const response = blockUserAPI(nickname);
  };

  return (
    <div
      className="blockButton"
      onClick={() => handleBlock(`6694adf80f867aa5d7e65624`)}
    >
      <LuSiren />
    </div>
  );
};

export default BlockButton;
