// ResourceGrid.jsx
import React, { useContext, useMemo } from 'react';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';


import Item from './Item';
import './ResourceGrid.css';

const ItemGrid = () => {
  const { characterData } = useContext(CharacterDataContext);

  const items = useMemo(() => characterData.items,[characterData.items])

  return (
    <div className="resources-grid-container">
      <div className="resources-grid">
        {items.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemGrid;