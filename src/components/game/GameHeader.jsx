import React, { useEffect, useState } from 'react';


import { Grid, Container, Box, Tabs, Tab } from '@mui/material';
import ActionOverview from './actionOverview/ActionOverview';
import CurrentAction from './actionOverview/CurrentAction';
import ActionQueue from './actionOverview/ActionQueue';
import { useTestChatStore } from './dataProviders/TestChatProvider';

const Display = ({ value }) => {
  const [fieldValue] = useTestChatStore((store) => store[value]);
  return (
    <div className="value">
      {value}: {fieldValue}
    </div>
  );
};


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
        <Grid item >
          last chat message:
          <Display value="sender" />
          <Display value="message" />
        </Grid>
      </Grid>
    </Box>
              
  );
}
