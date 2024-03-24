import React, { useContext, useState, useMemo } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import ResourceIcon from '../gameComponents/icons/ResourceIcon';
import { Button, Container, Typography } from '@mui/material';
import ClickAwayPopper from '../../common/ClickAwayPopper';
import ItemActionMenu from './ItemActionMenu';
import ItemIcon from '../gameComponents/icons/ItemIcon';
import ResourceActionMenu from './ResourceActionMenu';
import { useCharacterStore } from '../dataProviders/CharacterProvider';


// each Item obersves its own state. 
// now the grid only re-renders the item that changed, not the whole grid.
const InventoryResourceGridItem = ({name, onClick}) => {
    
  const [value] = useCharacterStore((char) => char.resources[name])

  return(
    
      <ResourceIcon
        amount={value}
        name={name}
        onClick={onClick}
      />

  )
          
};

export default InventoryResourceGridItem;