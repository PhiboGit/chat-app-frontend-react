import React, {
  useEffect,
} from "react";
import createPartialContextStore from "./createPartialContextStore";
import {messageReceiver} from "./MessageReceiver";

const { Provider, useStore } = createPartialContextStore({});

// Updater is a child of Provider to access the store
const TestChatProvider = ({children, initChar}) => {
  return (
    <Provider>
      <Updater initChar={initChar}>
        {children}
      </Updater>
    </Provider>
  )
}

// subs to the event emitted by the websocket
const Updater = ({children, initChar}) => {
  const [state, setState] = useStore((store) => store);
  
  useEffect(() => {
    console.log('sub to chat')
    messageReceiver.addEventListener('chat' , updateChat)
    return () => {
      messageReceiver.removeEventListener('chat', updateChat)
    };
  }, [])
  
  function updateChat(event) {
    const detail = event.detail;
    setState(detail)
  }
  
  return (
    <>
      {children}
    </>
  )
}


export { TestChatProvider as TestChatProvider, useStore as useTestChatStore }
