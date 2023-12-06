import React, { useEffect, useState } from 'react';
import {connectWebSocket, disconnectWebSocket} from './WebSocketService';
import { GameDataProvider } from './dataProviders/GameDataProvider';

export default function GamePage() {
  const [initGameData, setGameInitData] = useState();

  useEffect(() => {
    

    // Connect to WebSocket when the component mounts
    console.log('Open WebSocket connection...');
    connectWebSocket(setGameInitData);

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
        <GameDataProvider data={initGameData}>
          <div>
            {/* Add game content here */}
          </div>
        </GameDataProvider>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
