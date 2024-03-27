import React from 'react';

import { Box, Grid } from '@mui/material';

import ActionQueue from './actionOverview/ActionQueue';
import CurrentAction from './actionOverview/CurrentAction';

export default function GameHeader() {
  return (
    <Box pt={1} pb={1} pl={2} pr={2} >
      <Grid container>
        <Grid item xs={3}>
          <CurrentAction/>
        </Grid>
        <Grid item >
          <ActionQueue/>
        </Grid>
      </Grid>
    </Box>
              
  );
}
