// WebSocketService.js
import {serverIP} from '../../Globals';

let socket = null

/**
 * 
 * @param {*} setGameInitData 
 * @param {*} setCharInitData 
 * @param {EventTarget} messageReceiver 
 */
export function connectWebSocket(setGameInitData, setCharInitData, messageReceiver, setWebSocketOpen) {
  console.log('ConnectWebSocket');
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
      const data = JSON.parse(event.data)
      console.log('WebSocket message JSON received:', data);
      // Handle incoming messages from the WebSocket server
      if (data['type'] === 'init_data') {
        setGameInitData(data.data);
      }
      if (data['type'] === 'init_character') {
        setCharInitData(data.data);
      }
      const customEvent = new CustomEvent(data['type'], { detail: data.data })
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