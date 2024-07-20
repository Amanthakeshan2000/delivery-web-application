import React from "react";

const Button = (props) => {
  return (
    <div>
    <button className="
    px-20 py-3
    drop-shadow-lg
    border-0 
    border-brightColor 
    text-viteGreen 
    bg-white 
    hover:bg-viteGreen 
    hover:text-white 
    transition-all 
    font-semibold
    rounded-full">
      {props.title}
    </button>
  </div>
  
  );
};

export default Button;
