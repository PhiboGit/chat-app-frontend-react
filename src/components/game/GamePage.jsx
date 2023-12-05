import React, { useEffect } from 'react';
import {connect, disconnect} from './WebSocketService';


export default function GamePage (){ 
  useEffect(() => {
    // Connect to WebSocket when the component mounts
    console.log('Connecting to WebSocket...');
    connect();

    // Clean up the WebSocket connection on component unmount
    return () => {
      //disconnect();
      console.log('WebSocket connection closed');
    };
  }, []); // Run this effect only once when the component mounts


  return(
  <div>
    <h1>Game Page</h1>
    {/* Add game content here */}
  </div>
)}
