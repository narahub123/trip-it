import { useRef, useState } from "react";
import "./darkmode.css";
import { LuSun, LuMoon } from "react-icons/lu";

const DarkMode = () => {
  const darkmodeRef = useRef<HTMLDivElement>(null);
  const [darkmodeOn, setDarkmodeOn] = useState(false);
  const handleMode = () => {
    setDarkmodeOn(!darkmodeOn);
    const parent = darkmodeRef.current?.parentElement as HTMLElement;

    console.log("theme", parent.dataset.theme);

    if (parent.dataset.theme === "light")
      parent.setAttribute("data-theme", "dark");
    else parent.setAttribute("data-theme", "light");

    console.log(parent);
  };
  return (
    <div className="darkmode" ref={darkmodeRef}>
      <div className="darkmode-container" onClick={handleMode}>
        <div
          className={
            darkmodeOn ? "darkmode-thumb-right" : "darkmode-thumb-left"
          }
        ></div>
        <figure>
          <LuSun />
        </figure>
        <figure>
          <LuMoon />
        </figure>
      </div>
    </div>
  );
};

export default DarkMode;
