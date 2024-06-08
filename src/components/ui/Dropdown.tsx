import React, { useEffect, useState } from "react";
import "./dropdown.css";

interface DropdownProps {
  init: number;
  contents: string[];
  style?: number;
  scroll?: string;
  setStartHourInit?: (value: string) => void;
  setStartMinuteInit?: (value: string) => void;
  setEndHourInit?: (value: string) => void;
  setEndMinuteInit?: (value: string) => void;
  isActive: boolean;
  toggleDropdown: () => void;
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
  isActive,
  toggleDropdown,
}: DropdownProps) => {
  const [selected, setSelected] = useState<string>(contents[init]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (isActive) {
      const dropdown = document.getElementById("dropdown");
      if (dropdown instanceof HTMLElement) {
        const selectedElement = dropdown.querySelector(
          ".dropdown-option.selected"
        );
        if (selectedElement instanceof HTMLElement) {
          const dropdownHeight = dropdown.clientHeight;
          const selectedItemHeight = selectedElement.clientHeight;
          const scrollTop =
            selectedElement.offsetTop -
            dropdownHeight / 2 +
            selectedItemHeight / 2;
          setIsAnimating(true);
          dropdown.scrollTo({
            top: scrollTop,
            behavior: "smooth",
          });
          setTimeout(() => {
            setIsAnimating(false);
          }, 2000); // 애니메이션 시간 (1000ms = 1초)
        }
      }
    }
  }, [isActive, selected]);

  function handleClick(content: string) {
    setSelected(content);
    toggleDropdown();
    setStartHourInit && setStartHourInit(content);
    setStartMinuteInit && setStartMinuteInit(content);
    setEndHourInit && setEndHourInit(content);
    setEndMinuteInit && setEndMinuteInit(content);
  }

  return (
    <>
      <button type="button" onClick={() => toggleDropdown()}>
        {selected}
      </button>
      {isActive && (
        <ul
          className={`dropdown ${isAnimating ? "animating" : ""}`}
          id="dropdown"
          style={{
            transform: `translate(${style}%, 5px)`,
            overflow: scroll,
          }}
        >
          {contents.map((content) => (
            <li
              className={`dropdown-option ${
                content === selected ? "selected" : ""
              }`}
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
