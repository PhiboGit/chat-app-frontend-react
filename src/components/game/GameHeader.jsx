import React, { useEffect, useState } from 'react';


import { Grid, Container, Box, Tabs, Tab } from '@mui/material';
import ActionOverview from './actionOverview/ActionOverview';
import CurrentAction from './actionOverview/CurrentAction';
import ActionQueue from './actionOverview/ActionQueue';
import { useTestChatStore } from './dataProviders/TestChatProvider';
import { useCharacterStore } from './dataProviders/CharacterProvider';

const Display = ({ value }) => {
  const [fieldValue] = useTestChatStore((store) => store[value]);
  return (
    <div className="value">
      {value}: {fieldValue}
    </div>
  );
};

const TestValue = ({}) => {
  const [fieldValue] = useCharacterStore((char) => char.resources.woodT1);

  return (
    <div >
      Test: {JSON.stringify(fieldValue)}
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
          <Display value="counter" />
        </Grid>
        <Grid item >
          <TestValue />
        </Grid>
      </Grid>
    </Box>
              
  );
}
