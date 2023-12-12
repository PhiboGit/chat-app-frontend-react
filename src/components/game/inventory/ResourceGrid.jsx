// ResourceGrid.jsx
import React, { useContext, useMemo } from 'react';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';


import ResourceItem from './ResourceItem';
import './ResourceGrid.css';

const ResourceGrid = () => {
  const { characterData } = useContext(CharacterDataContext);

  const resources = useMemo(() => characterData.resources,[characterData.resources])

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