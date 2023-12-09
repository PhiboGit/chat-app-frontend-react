import React, { useContext, useMemo } from 'react';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import ResourceGrid from './ResourceGrid';
import ExpBar from '../ExpBar';

const Inventory = () => {
  const { characterData } = useContext(CharacterDataContext);

  const resources = useMemo(() => characterData.resources,[characterData.resources])
  return (
    <div>
      <ExpBar profession={"character"}/>
      <ResourceGrid resources={resources} />
    </div>
  );
};

export default Inventory;