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
  const [renderItPlease] = useCharacterStore((char) => Object.values(char.resources).reduce((acc, value) => value > 0 ? acc + 1 : acc, 0))

  return (
    <Box>
    Resources:
      <Grid container spacing={1}>
        {Object.entries(resources).map(([name, value]) => {
          if (value > 0) return (
            <Grid item key={name}>
              <InventoryResourceGridItem name={name}/>
            </Grid>
          )})}          
      </Grid>
    </Box>
  );
};

export default InventoryResources;