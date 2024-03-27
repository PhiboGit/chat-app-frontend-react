import React, {
  useEffect,
} from "react";
import { messageReceiver } from "./MessageReceiver";
import createPartialContextStore from "./createPartialContextStore";

let useCharacterStore


const createInitialCharacterState = (initChar) => {
  // deep copy, cause currently there are other Updater with the same initial state initChar
  const initialState = structuredClone(initChar)
  // other Schema are populated only with the init message
  // These are managed by other stores
  const populatedToIdArray = (array) => array.map(object => object._id)
  initialState.items = populatedToIdArray(initialState.items)
  initialState.orders = populatedToIdArray(initialState.orders)
  initialState.itemOrders= populatedToIdArray(initialState.itemOrders)
  return initialState
}

// Updater is a child of Provider to access the store
const CharacterProvider = ({children, initChar}) => {
  
  const { Provider, useStore } = createPartialContextStore(createInitialCharacterState(initChar.character));
  useCharacterStore = useStore
  return (
    <Provider>
      <Updater useStore={useStore}>
        {children}
      </Updater>
    </Provider>
  )
}

const resolvePath = (object, path, defaultValue) => path
  .split('.')
  .reduce((o, p) => o ? o[p] : defaultValue, object)

const setPath = (object, path, updater, defaultValue) => path
  .split('.')
  .reduce((o,key,i) => o[key] = path.split('.').length === ++i ? updater(o[key] !== undefined ? o[key] : defaultValue) : o[key] || {}, object)

// subs to the event emitted by the websocket
const Updater = ({children, useStore}) => {
  const [charState, setState] = useStore((char) => char);
  
  useEffect(() => {
    messageReceiver.addEventListener('update_char' , updateChar)
    messageReceiver.addEventListener('action_manager', updateChar);
    return () => {
      messageReceiver.removeEventListener('update_char', updateChar)
      messageReceiver.removeEventListener('action_manager', updateChar)
    };
  }, [])
  
  function updateChar(event) {
    const updates = event.detail;  
    const updateOperations = ["$inc", "$set", "$push", "$pull"];
  
    setState( prev => {
      const char = {...prev}
      updateOperations.forEach((operation) => {
        if (updates.hasOwnProperty(operation)) {
          Object.entries(updates[operation]).forEach(([path, value]) => {
            console.log("update: ", operation, path, value);
            changeValue(char, path, value, operation);
          });
        }
      });
      console.log("character updated:", char)
      return char
    })
  }


  function changeValue(char, path, value, operation) {
    switch (operation) {
      case "$set":
        return setPath(char, path, (prev) => value)
        break;
      case "$inc":
        return setPath(char, path, (prev) => prev + value)
        break;
      case "$push":
        return setPath(char, path, (prev) => {
          // necessary as push does not return an array!
          const newArray = [...prev]
          newArray.push(value)
          return newArray
        })
        break;
      case "$pull":
        return setPath(char, path, (prev) => prev.filter(id => id != value))
        break;
      default:
        console.error("Invalid operation: ", operation);
        return;
    }
  }
  
  return (
    <>
      {children}
    </>
  )
}


export { CharacterProvider as CharacterProvider, useCharacterStore as useCharacterStore };
