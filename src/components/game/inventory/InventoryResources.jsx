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
import InventoryResourceGridItem from './InventoryResourceGridItem';


const InventoryResources = () => {
  const [resources] = useCharacterStore((char) => char.resources)

  return (
    <Box>
    Resources:
      <Grid container spacing={1}>
        {Object.entries(resources).map(([name, value]) => (
            <InventoryResourceGridItem key={name} name={name}/>
          ))}          
      </Grid>
    </Box>
  );
};

export default InventoryResources;