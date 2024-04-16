import React from "react";

// Interface defining the props expected by the Card component
interface CardProps {
  index: number; // Index of the card
  name: string; // Name of the card
  title: string; // Title of the card
}

// Functional component representing a Card
const Card: React.FC<CardProps> = ({ index, name, title }) => {
  // JSX structure for rendering the Card component
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center">
        <span className="mr-2 font-semibold">{index + 1}.</span> {/* Numbering */}
        <div>
          <h2 className="text-xl font-semibold mb-2">{name}</h2> {/* Card name */}
          <p className="text-gray-600">{title}</p> {/* Card title */}
        </div>
      </div>
    </div>
  );
};

export default Card; // Exporting the Card component
