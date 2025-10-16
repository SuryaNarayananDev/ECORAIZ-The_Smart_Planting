import React from 'react';
import './ImageGrid.css'; 

const ImageGrid = ({ image, ranks }) => {
  return (
    <div className="image-container">
      <img src={image} alt="Uploaded Map" className="map-image" />
      <div className="grid-overlay">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="grid-box">
            <span className="grid-label">{ranks[i] !== undefined ? ranks[i] + 1 : i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
