import React, { useState } from "react";

const ToggleBackground = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const bgClass = isDarkMode ? "bg-black" : "bg-white";
  const textClass = isDarkMode ? "text-white" : "text-black";
  const buttonClass = isDarkMode
    ? "bg-white text-black"
    : "bg-black text-white";

  return (
    <div
      className={`${bgClass} min-h-screen p-8`}
    >
      <div className="max-w-md mx-auto">
        <h1 className={`${textClass} text-2xl font-bold mb-4`}>
          Hi, this is {isDarkMode ? "Dark" : "Light"} theme
        </h1>
        <button
          onClick={toggleTheme}
          className={`${buttonClass} px-4 py-2 rounded-md font-medium`}
        >
          Switch to {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
    </div>
  );
};

export default ToggleBackground;
