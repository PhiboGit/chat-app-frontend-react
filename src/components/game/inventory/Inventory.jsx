import React, { useContext, useMemo } from 'react';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import ResourceGrid from './ResourceGrid';
import ItemGrid from './ItemGrid';
import ExpBar from '../ExpBar';

const Inventory = () => {
  
  return (
    <div>
      <ExpBar profession={"character"}/>
      <p>Resources</p>
      <ResourceGrid />
      <p>Items</p>
      <ItemGrid />
    </div>
  );
};

export default Inventory;