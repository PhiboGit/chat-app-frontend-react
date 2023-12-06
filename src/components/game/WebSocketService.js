// WebSocketService.js
import {serverIP} from '../../Globals';

let socket = null

export function connectWebSocket(setGameInitData) {
  console.log('ConnectWebSocket', socket);
  if (!socket || socket.readyState == 2 || socket.readyState == 3) {
    console.log('Setting up new socket...');
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
        setGameInitData(data.data);
      }
    };

    socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
      // Handle WebSocket connection closure
    };
  }
}

export function disconnectWebSocket() {
  console.log('WebSocket disconnect', socket);
  if (socket) {
    socket.close();
  }
}
