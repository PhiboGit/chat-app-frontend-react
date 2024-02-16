import React, { useEffect, useState } from 'react';


import { Grid, Container, Box, Tabs, Tab } from '@mui/material';
import ActionOverview from './actionOverview/ActionOverview';


export default function GameHeader() {
 
  

  return (
    <Box pt={1} pb={1} pl={2} pr={2} >
      <ActionOverview/>
    </Box>
              
  );
}
