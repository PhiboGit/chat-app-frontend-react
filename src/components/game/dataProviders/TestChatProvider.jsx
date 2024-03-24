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
    setState({counter: 1})
    console.log('sub to chat')
    messageReceiver.addEventListener('chat' , updateChat)
    return () => {
      messageReceiver.removeEventListener('chat', updateChat)
    };
  }, [])
  
  function updateChat(event) {
    const detail = event.detail;
    //setState(detail)
    setState((prev) => {
      console.log('prev', prev);
    
      return  {...detail, counter: prev.counter + 1};
    
    })
  }
  
  return (
    <>
      {children}
    </>
  )
}


export { TestChatProvider as TestChatProvider, useStore as useTestChatStore }
