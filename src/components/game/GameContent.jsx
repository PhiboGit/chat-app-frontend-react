import React, { useEffect, useState } from 'react';
import {connectWebSocket, disconnectWebSocket, sendWebsocket} from './WebSocketService';
import { GameDataProvider } from './dataProviders/GameDataProvider';
import { CharacterDataProvider } from './dataProviders/CharacterDataProvider';

import { Grid, Container, Box, Tabs, Tab } from '@mui/material';

import ActionOverview from './actionOverview/ActionOverview';
import BasicTabs from './mainContent/BasicTabs';
import InventoryOverview from './inventory/InventoryOverview';

const messageReceiver = new EventTarget()

export default function GameContent() {

  return (
    
      <Grid container style={{height: '100%', overflow: 'auto'}}>
        
        <Grid item xs={12} sm={8} style={{height: '100%', overflow: 'auto'}}>
            <BasicTabs />
        </Grid>
        
        <Grid item xs={12} sm={4} style={{height: '100%', overflow: 'auto'}}>     
          <InventoryOverview />
        </Grid>
      </Grid>
    
  );
}
