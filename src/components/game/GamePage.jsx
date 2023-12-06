import React, { useEffect, useState } from 'react';
import {connectWebSocket, disconnectWebSocket, sendWebsocket} from './WebSocketService';
import { GameDataProvider } from './dataProviders/GameDataProvider';

import TestComponent from './TestComponent';

export default function GamePage() {
  const [initGameData, setGameInitData] = useState();
  const [initCharData, setCharInitData] = useState();

  useEffect(() => {
    

    // Connect to WebSocket when the component mounts
    console.log('Open WebSocket connection...');
    connectWebSocket(setGameInitData, setCharInitData);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      console.log('Cleanup WebSocket connection');
      //TODO: fix disconnect on site loading, iterrupting the connection
      disconnectWebSocket();
    };
  }, []);

  return (
    <div>
      <h1>Game Page</h1>
      {initGameData ? (
        <GameDataProvider initGameData={initGameData} initCharData={initCharData} send={sendWebsocket}>
          <div>
            <TestComponent/>
          </div>
        </GameDataProvider>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
