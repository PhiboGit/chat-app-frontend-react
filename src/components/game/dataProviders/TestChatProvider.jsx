import React, {
  useEffect,
} from "react";
import createPartialContextStore from "./createPartialContextStore";
import {messageReceiver} from "./MessageReceiver";

let chatStore

// Updater is a child of Provider to access the store
const TestChatProvider = ({children, initChar}) => {
  const { Provider, useStore } = createPartialContextStore({sender: "Init", message: "init"});
  chatStore = useStore
  return (
    <Provider>
      <Updater>
        {children}
      </Updater>
    </Provider>
  )
}

// subs to the event emitted by the websocket
const Updater = ({children}) => {
  const [state, setState] = chatStore((store) => store);
  
  useEffect(() => {
    setState({counter: 0})
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


export { TestChatProvider as TestChatProvider, chatStore as useTestChatStore }
