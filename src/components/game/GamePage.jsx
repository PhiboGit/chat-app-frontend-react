import React, { useEffect, useState } from 'react';
import {connectWebSocket, disconnectWebSocket, sendWebsocket} from './WebSocketService';
import { GameDataProvider } from './dataProviders/GameDataProvider';
import { CharacterDataProvider } from './dataProviders/CharacterDataProvider';

import TestComponent from './TestComponent';

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
    <div>
      <h1>Game Page</h1>
      {isWebSocketOpen ? (
        <>
          {(initGameData && initCharData) ? (
            <GameDataProvider initGameData={initGameData} send={sendWebsocket}>
              <CharacterDataProvider initCharData={initCharData} messageReceiver={messageReceiver}>
                <div>
                  <TestComponent />
                </div>
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
    </div>
  );
}
