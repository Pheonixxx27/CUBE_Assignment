import React from "react";

// Interface defining the structure of a Photo object
interface Photo {
  url: string; // URL of the photo
}

// Interface defining the props expected by the PhotoGrid component
interface PhotoGridProps {
  photos: Photo[]; // Array of Photo objects
}

// Functional component representing a grid of photos
const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  // JSX structure for rendering the PhotoGrid component
  return (
    <div className="grid grid-cols-3 gap-4 w-80%">
      {/* Mapping over the array of photos and rendering each photo */}
      {photos.map((photo, index) => (
        <img
          key={index} // Unique key for each photo
          src={photo.url} // Source URL of the photo
          alt={`Photo ${index + 1}`} // Alt text for accessibility
          className="w-40 h-36 object-cover" // Adjust width and height as needed
        />
      ))}
    </div>
  );
};

export default PhotoGrid; // Exporting the PhotoGrid component
