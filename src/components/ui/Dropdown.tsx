import React, { useState } from "react";
import "./dropdown.css";

interface DropdownProps {
  init: number;
  contents: string[];
  style?: number;
  scroll?: string;
  setStartHourInit?: (value: number) => void;
  setStartMinuteInit?: (value: number) => void;
  setEndHourInit?: (value: number) => void;
  setEndMinuteInit?: (value: number) => void;
}

const Dropdown = ({
  init,
  contents,
  style = -29,
  scroll = "auto",
  setStartHourInit,
  setStartMinuteInit,
  setEndHourInit,
  setEndMinuteInit,
}: DropdownProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(contents[init]);
  // console.log(selected);

  function handleClick(content: string) {
    setSelected(content);
    setIsActive(false);
    setStartHourInit && setStartHourInit(Number(content));
    setStartMinuteInit && setStartMinuteInit(Number(content));
    setEndHourInit && setEndHourInit(Number(content));
    setEndMinuteInit && setEndMinuteInit(Number(content));
  }

  return (
    <>
      <button type="button" onClick={() => setIsActive(!isActive)}>
        {selected}
      </button>
      {isActive && (
        <ul
          className="dropdown"
          id="dropdown"
          style={{
            transform: `translate(${style}%, 5px)`,
            overflow: scroll,
          }}
        >
          {contents.map((content) => (
            <li
              className="dropdown-option"
              key={content}
              id={content}
              style={
                content === selected
                  ? { backgroundColor: "aquamarine" }
                  : undefined
              }
              onClick={() => handleClick(content)}
            >
              {content}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Dropdown;
