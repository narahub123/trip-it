import React from "react";
import "./button.css";
interface ButtonProps {
  name: string;
  backgroundColor?: string;
  color?: string;
  autofocus?: boolean;
}

const Button = ({
  name,
  backgroundColor = "aquamarine",
  color = "black",
  autofocus = true,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className="button"
      style={{
        border: "0",
        outline: "none",
        padding: "20px",
        borderRadius: "13px",
        backgroundColor: `${backgroundColor}`,
        color: `${color}`,
      }}
      autoFocus={autofocus}
    >
      {name}
    </button>
  );
};

export default Button;
