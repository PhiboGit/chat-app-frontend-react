import React, { useEffect, useState } from 'react';
import {connectWebSocket, disconnectWebSocket} from './WebSocketService';
import { GameDataProvider } from './dataProviders/GameDataProvider';

export default function GamePage() {
  const [initGameData, setGameInitData] = useState();

  useEffect(() => {
    

    // Connect to WebSocket when the component mounts
    const socket = connectWebSocket(setGameInitData);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      //TODO: fix disconnect on site loading, iterrupting the connection
      //disconnectWebSocket(socket);
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
