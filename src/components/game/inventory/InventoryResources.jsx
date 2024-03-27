import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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