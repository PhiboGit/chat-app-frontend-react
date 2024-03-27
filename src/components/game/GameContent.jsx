import React from 'react';

import { Grid } from '@mui/material';

import InventoryTabs from './inventory/InventoryTabs';
import BasicTabs from './mainContent/BasicTabs';

export default function GameContent() {

  return (
      // if too small and uses xs the grid is scrollable to reach second item
      <Grid container style={{height: '100%', overflow: 'auto'}}>
        {/* row with sm, else column with xs when too small ,scrollable item */}
        <Grid item xs={12} sm={8} style={{height: '100%', overflow: 'auto'}}>
            <BasicTabs />
        </Grid>
        {/* row with sm, else column with xs when too small ,scrollable item */}
        <Grid item xs={12} sm={4} style={{height: '100%', overflow: 'auto'}}>     
          <InventoryTabs />
        </Grid>
      </Grid>
    
  );
}
