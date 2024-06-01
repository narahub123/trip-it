import React, { useState } from "react";
import "./dropdown.css";

interface DropdownProps {
  init: number;
  contents: string[];
  style?: number;
  scroll?: string;
}

const Dropdown = ({
  init,
  contents,
  style = -29,
  scroll = "auto",
}: DropdownProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(contents[init]);
  // console.log(selected);

  const handleClick = (content: string) => {
    setSelected(content);
    setIsActive(false);
  };

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
