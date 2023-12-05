// WebSocketService.js
import {serverIP} from '../../Globals';

let socket

export function connect() {
  // Get the token from localStorage
  const token = localStorage.getItem('token');
  if (!socket) {
    const socketURL = `ws://${serverIP}?accessToken=${token}`;
    socket = new WebSocket(socketURL);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
      // You can send initial messages or perform other actions upon connection
    };

    socket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      // Handle incoming messages from the WebSocket server
    };

    socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
      // Handle WebSocket connection closure
    };
  }
}

export function disconnect() {
  if (socket) {
    socket.close();
  }
}
