import React, { useEffect, useState } from "react";
import "./dropdown.css";
import { DropdownState } from "./DropCard";

export interface DurationType {
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
}

interface DropdownProps {
  id: string;
  index: number;
  init: number;
  contents: string[];
  style?: number;
  scroll?: string;
  time: DurationType;
  setTime: (value: DurationType) => void;

  dropdownStates: DropdownState[];
  toggleDropdown: (index: number) => void;
  setViolated: (index: number, violated: boolean) => void;
}

const Dropdown = ({
  id,
  index,
  init,
  contents,
  style = -29,
  scroll = "auto",
  time,
  setTime,

  dropdownStates,
  toggleDropdown,
  setViolated,
}: DropdownProps) => {
  const [selected, setSelected] = useState<string>(contents[init]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (dropdownStates[index].down) {
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
  }, [dropdownStates[index].down, selected]);

  function handleClick(content: string) {
    // 현재 프로퍼티가 startHour인 경우 endHour와 비교
    if (id === "startHour") {
      if (content > time.endHour) {
        alert(`시작 시간은 종료시간보다 같거나 작어야 합니다.`);
        return;
      } else if (content === time.endHour) {
        setTime({ ...time, [id]: content });
        setSelected(content);
        toggleDropdown(index);
        if (time.startMinute >= time.endMinute) {
          alert(
            `시작 시간과 종료 시간이 같다면 시작 시간의 분이 종료 시간의 분보다 작아야 합니다.`
          );
          setViolated(1, true);
          toggleDropdown(1);
          return;
        }
      }
    }

    // 현재 프로퍼티가 startHour인 경우
    if (id === "startMinute") {
      if (time.startHour === time.endHour) {
        if (content >= time.endMinute) {
          alert(
            `시작 시간과 종료 시간이 같다면 시작 시간의 분이 종료 시간의 분보다 작아야 합니다.`
          );
          // setViolated(index, true); // 유효성 걸림
          return;
        }
      }
    }

    // 현재 프로퍼티가 endHour인 경우 startHour와 비교
    if (id === "endHour") {
      if (content < time.startHour) {
        alert(
          `종료 시간은 시작 시간보다 같거나 커야 합니다. \n시간을 다시 조정해주세요.`
        );
        // setViolated(index, true);
        return;
        // 시작 시간과 종료 시간이 같은 경우 시작 분과 종료 분을 확인해서
        // 종료 분이 시작 분보다 작다면 경고창
      } else if (time.startHour === content) {
        // 우선 시간 설정을 하고 에러 부분으로 이동
        setTime({ ...time, [id]: content });
        setSelected(content);
        toggleDropdown(index);
        // setViolated(index, false);

        if (Number(time.startMinute) >= Number(time.endMinute)) {
          alert(
            `시작 시간과 종료 시간이 같다면 종료 시간의 분이 시작 시간의 분보다 커야 합니다.`
          );
          setViolated(3, true);
          toggleDropdown(3);

          return;
        }
      }
    }

    // 현재 프로퍼티가 endMinute인 경우
    // startHour와 endHour가 같은지 확인하고 같다면 startMinute와 endMinute 비교
    if (id === "endMinute") {
      if (time.startHour === time.endHour) {
        if (time.startMinute >= content) {
          alert(
            `시작 시간과 종료 시간이 같다면 종료 시간의 분이 시작 시간의 분보다 커야 합니다.`
          );
          // setViolated(index, true); // 유효성 걸림
          return;
        }
      }
    }

    setTime({ ...time, [id]: content });
    setSelected(content);

    // 유효성 되돌리기
    setViolated(index, false);
    toggleDropdown(index);
  }

  return (
    <>
      <button
        type="button"
        className={dropdownStates[index].violated ? "violated" : undefined}
        onClick={() => toggleDropdown(index)}
      >
        {selected}
      </button>
      {dropdownStates[index].down && (
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
              onClick={(e) => handleClick(content)}
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
