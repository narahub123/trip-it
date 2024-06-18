import React, { useEffect, useState } from "react";
import "./dropdown.css";

export interface DurationType {
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
}

interface DropdownProps {
  id: string;
  init: number;
  contents: string[];
  style?: number;
  scroll?: string;
  time: DurationType;
  setTime: (value: DurationType) => void;
  isActive: boolean;
  toggleDropdown: () => void;
}

const Dropdown = ({
  id,
  init,
  contents,
  style = -29,
  scroll = "auto",
  time,
  setTime,
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

  function handleClick(
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    content: string
  ) {
    console.log(e.currentTarget.id);

    setTime({ ...time, [e.currentTarget.id]: content });
    setSelected(content);
    toggleDropdown();
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
              id={id}
              style={
                content === selected
                  ? { backgroundColor: "aquamarine" }
                  : undefined
              }
              onClick={(e) => handleClick(e, content)}
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
