// ResourceItem.jsx
import React from 'react';
import './ResourceItem.css';
import PlaceholderImg from '../../../assets/object_cube.png'

const Item = ({ item }) => {
  // Generate the dynamic path for the image based on the name
  const imagePath = PlaceholderImg; // Adjust the path as per your project structure

  return (
    <div className="resource-item" title={item._id}>
      <span className="item-name">{`${item.type},${item.subtype},${item.tier}`}</span>
      <img src={imagePath} alt={item._id} />
    </div>
  );
};

export default Item;
