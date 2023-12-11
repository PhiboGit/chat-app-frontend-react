import React, { useEffect, useState } from 'react';
import {connectWebSocket, disconnectWebSocket, sendWebsocket} from './WebSocketService';
import { GameDataProvider } from './dataProviders/GameDataProvider';
import { CharacterDataProvider } from './dataProviders/CharacterDataProvider';

import { Grid, Container, Box, Tabs, Tab } from '@mui/material';

import Inventory from './inventory/Inventory';
import ActionOverview from './actionOverview/ActionOverview';
import GatheringOverview from './gathering/GatheringOverview';
import BasicTabs from './mainContent/BasicTabs';

const messageReceiver = new EventTarget()

export default function GamePage() {
  const [initGameData, setGameInitData] = useState();
  const [initCharData, setCharInitData] = useState();
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);

  useEffect(() => {
    

    // Connect to WebSocket when the component mounts
    console.log('Open WebSocket connection...');
    connectWebSocket(setGameInitData, setCharInitData, messageReceiver, setIsWebSocketOpen);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      console.log('Cleanup WebSocket connection');
      disconnectWebSocket();
    };
  }, []);

  return (
    <>
      {isWebSocketOpen ? (
        <>
          {(initGameData && initCharData) ? (
            <GameDataProvider initGameData={initGameData} send={sendWebsocket}>
              <CharacterDataProvider initCharData={initCharData} messageReceiver={messageReceiver}>
                <Container maxWidth="false" style={{ height: '100vh' }}>
                  <Grid container style={{ height: '100%' }}   >

                    {/* Main Content */}
                    <Grid item xs={12} md={9}>
                      <Box style={{ backgroundColor: '#f0f0f0', height: '100%' }}>
                        <BasicTabs/>
                      </Box>
                    </Grid>
                    {/* Right Side */}
                    <Grid item xs={12} md={3}>
                      <Grid container direction="column" style={{ height: '100%' }}>
                        {/* Inventory */}
                        <Grid item style={{ flex: 3 }}>
                          <Box style={{ backgroundColor: '#ddd', height: '100%' }}>
                            <Inventory />
                          </Box>
                        </Grid>

                        {/* Action Queue */}
                        <Grid item style={{ flex: 1 }}>
                          <Box style={{ backgroundColor: '#bbb', height: '100%' }}>
                            <ActionOverview />
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Container>
              </CharacterDataProvider>
            </GameDataProvider>
          ) : (
            <div>loading...</div>
          )}
        </>
      ) : (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
        Please reload the page.
        </div>
      )}
    </>
  );
}
