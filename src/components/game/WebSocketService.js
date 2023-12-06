// WebSocketService.js
import {serverIP} from '../../Globals';

let socket

export function connectWebSocket(onDataReceived) {
  if (!socket) {
    const token = localStorage.getItem('token')
    const socketURL = `ws://${serverIP}?accessToken=${token}`;
    socket = new WebSocket(socketURL);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
      // You can send initial messages or perform other actions upon connection
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log('WebSocket message received:', data);
      // Handle incoming messages from the WebSocket server
      if (data['type'] === 'init_data') {
        onDataReceived(data.data);
      }
    };

    socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
      // Handle WebSocket connection closure
    };
  }
  return socket
}

export function disconnectWebSocket(socket) {
  if (socket) {
    socket.close();
  }
}
