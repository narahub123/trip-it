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
  const [violated, setViolated] = useState(false);

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

    const currentProperty = e.currentTarget.id;

    const child = document.getElementById(currentProperty); // li
    const parent = child && child.parentElement; // ul
    const uncle = parent && parent.previousElementSibling;
    const grand = parent && parent.parentElement; // span
    const grandSibling = grand && grand.nextElementSibling; // span
    const grandSiblingChild = grandSibling && grandSibling.lastElementChild; // button
    console.log("부모", parent);
    console.log("삼촌", uncle);
    console.log("조부모", grand);
    console.log("조형제", grandSibling);
    console.log("조형제자식", grandSiblingChild);

    // 현재 프로퍼티가 endHour인 경우 startHour와 비교
    if (currentProperty === "endHour") {
      if (content < time.startHour) {
        alert(
          `종료 시간은 시작 시간보다 같거나 커야 합니다. \n시간을 다시 조정해주세요.`
        );
        setViolated(true); // 유효성 걸림
        return;
        // 시작 시간과 종료 시간이 같은 경우 시작 분과 종료 분을 확인해서
        // 종료 분이 시작 분보다 작다면 경고창
      } else if (time.startHour === content) {
        if (Number(time.startMinute) >= Number(time.endMinute)) {
          alert(
            `시작 시간과 종료 시간이 같다면 종료 시간의 분이 시작 시간의 분보다 커야 합니다.`
          );
          //setViolated(true); // 유효성 걸림 : 어떻게 다른 버튼을 표시할 수 있는가?
          grandSiblingChild?.setAttribute("class", "violated"); // 표시는 했는데 react set 함수로 삭제가 안됨
          return;
        }
      }
    }

    // 현재 프로퍼티가 endMinute인 경우
    // startHour와 endHour가 같은지 확인하고 같다면 startMinute와 endMinute 비교
    if (currentProperty === "endMinute") {
      if (time.startHour === time.endHour) {
        if (time.startMinute >= content) {
          alert(
            `시작 시간과 종료 시간이 같다면 종료 시간의 분이 시작 시간의 분보다 커야 합니다.`
          );
          setViolated(true); // 유효성 걸림
          return;
        }
      }
    }

    setTime({ ...time, [e.currentTarget.id]: content });
    setViolated(false); // 유효성 통화
    if (currentProperty === "endMinute") {
      uncle?.removeAttribute("class");
    }
    setSelected(content);
    toggleDropdown();
  }

  return (
    <>
      <button
        type="button"
        className={violated ? "violated" : undefined}
        onClick={() => toggleDropdown()}
      >
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
