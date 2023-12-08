// ResourceGrid.jsx
import React from 'react';
import ResourceItem from './ResourceItem';
import './ResourceGrid.css';

const ResourceGrid = ({ resources }) => {
  const resourceNames = Object.keys(resources);

  return (
    <div className="resources-grid-container">
      <div className="resources-grid">
        {Object.entries(resources).map(([name, value]) => (
          <ResourceItem key={name} name={name} value={value} />
        ))}
      </div>
    </div>
  );
};

export default ResourceGrid;