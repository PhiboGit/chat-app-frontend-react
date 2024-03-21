// WebSocketService.js
import {serverIP} from '../../Globals';

let socket = null

/**
 * 
 */
export function connectWebSocket(setGameInitData, setCharInitData, messageReceiver, setWebSocketOpen) {
  console.log('ConnectWebSocket');
  // no connection, closing, closed
  if (!socket || socket.readyState == 2 || socket.readyState == 3) {
    console.log('Setting up new socket...');
    const token = localStorage.getItem('token')
    const socketURL = `ws://${serverIP}?accessToken=${token}`;
    socket = new WebSocket(socketURL);

    socket.onopen = () => {
      // You can send initial messages or perform other actions upon connection
      console.log('WebSocket connection opened');
      setWebSocketOpen(true)
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      console.log('WebSocket message JSON received:', message);
      // Handle incoming messages from the WebSocket server
      if (message['type'] === 'init_data') {
        setGameInitData(message.data);
      }
      if (message['type'] === 'init_character') {
        setCharInitData(message.data);
      }
      const customEvent = new CustomEvent(message['type'], { detail: message.data })
      messageReceiver.dispatchEvent(customEvent)
    };

    socket.onclose = (event) => {
      // Handle WebSocket connection closure
      console.log('WebSocket connection closed:', event);
      setWebSocketOpen(false);
    };
  }
}

export function disconnectWebSocket() {
  console.log('WebSocket disconnect');
  if (socket) {
    socket.close();
  }
}

export function sendWebsocket(message){
  console.log('WebSocket send: ', message);
  const jsonString = JSON.stringify(message)
  socket.send(jsonString);
}