// ResourceItem.jsx
import React from 'react';
import './ResourceItem.css';
import PlaceholderImg from '../../../assets/object_cube.png'

const ResourceItem = ({ name, value }) => {
  // Generate the dynamic path for the image based on the name
  const imagePath = PlaceholderImg; // Adjust the path as per your project structure

  return (
    <div className="resource-item" title={name}>
      <span className="item-name">{name}</span>
      <img src={imagePath} alt={name} />
      <span className="item-value">{value}</span>
    </div>
  );
};

export default ResourceItem;
