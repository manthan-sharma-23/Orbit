import React from "react";

const Button = ({
  width = "full",
  height = "full",
  borderColor = "black",
  backgroundColor = "black",
  type = "submit",
  text = "Button text",
  textColor = "white",
  onClick,
}: {
  width?: string;
  height?: string;
  borderColor?: string;
  backgroundColor?: string;
  text?: string;
  textColor?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className={`w-${width} h-${height}`}>
      <button
        className={`flex h-${height} w-${width} font-semibold transition hover:bg-white hover:text-black flex justify-center items-center rounded-xl border-2 text-${textColor} border-${borderColor} bg-${backgroundColor} px-1 py-1 text-lg mx-1 `}
        onClick={onClick}
        type={type}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
