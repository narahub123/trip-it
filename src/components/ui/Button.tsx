import React from "react";
import "./button.css";
interface ButtonProps {
  name: string;
  backgroundColor?: string;
  color?: string;
  autofocus?: boolean;
  padding?: string | number;
  width?: string | number;
}

const Button = ({
  name,
  backgroundColor = "aquamarine",
  padding = "20px",
  color = "black",
  autofocus = true,
  width,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className="button"
      style={{
        border: "0",
        outline: "none",
        padding: `${padding}`,
        borderRadius: "13px",
        backgroundColor: `${backgroundColor}`,
        color: `${color}`,
        width: `${width}`,
      }}
      autoFocus={autofocus}
    >
      {name}
    </button>
  );
};

export default Button;
