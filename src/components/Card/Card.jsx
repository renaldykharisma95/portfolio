import React from "react";

/**
 * Card - a reusable card component
 * @param {object} props
 * @param {React.ReactNode} props.children - Content to display inside the card
 * @param {string} [props.className] - Additional Tailwind or custom classes
 * @param {object} [props.style] - Optional inline styles
 */
const Card = ({ children, className = "", style = {} }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
