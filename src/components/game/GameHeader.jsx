import React, { useEffect, useState } from 'react';

import { Grid, Container, Box, Tabs, Tab } from '@mui/material';

import CurrentAction from './actionOverview/CurrentAction';
import ActionQueue from './actionOverview/ActionQueue';

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
