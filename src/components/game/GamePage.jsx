import React, { useEffect, useState } from 'react';
import {connectWebSocket, disconnectWebSocket, sendWebsocket} from './WebSocketService';
import { GameDataProvider } from './dataProviders/GameDataProvider';
import { CharacterDataProvider } from './dataProviders/CharacterDataProvider';

import { Grid, Container, Box, Tabs, Tab } from '@mui/material';

import ActionOverview from './actionOverview/ActionOverview';
import BasicTabs from './mainContent/BasicTabs';
import InventoryOverview from './inventory/InventoryOverview';
import GameHeader from './GameHeader';
import GameContent from './GameContent';

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
              <Box height="100vh" display="flex" flexDirection="column">
                <Box height={"7vh"}>
                  <GameHeader/>
                </Box>
                <Box flex={1} overflow={"hidden"}>
                  <GameContent/>
                </Box>
                
              </Box>
            </CharacterDataProvider>
          </GameDataProvider>
          ) : (
            <div>loading...</div>
            )}
        </>
      ) : (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
        Please reload the page. You lost Websocket connection to the server!
        </div>
      )}  
    </>
  );
}
