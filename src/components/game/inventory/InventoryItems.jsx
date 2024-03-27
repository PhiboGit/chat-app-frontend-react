import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { useCharacterStore } from '../dataProviders/CharacterProvider';
import InventoryItemGridItem from './InventoryItemGridItem';


const InventoryItems = () => {
  const [items] = useCharacterStore((char) => char.items)

  return (
    <Box>
      Items:
      <Grid container spacing={1}>
        {Array.from(items).map((itemId) => (
          <InventoryItemGridItem key={itemId} itemId={itemId}/>
        ))}
      </Grid>
    </Box>
  );
};

export default InventoryItems;