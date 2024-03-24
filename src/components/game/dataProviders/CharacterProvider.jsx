import React, {
  useEffect,
} from "react";
import createPartialContextStore from "./createPartialContextStore";
import {messageReceiver} from "./MessageReceiver";

let useCharacterStore

// Updater is a child of Provider to access the store
const CharacterProvider = ({children, initChar}) => {
  // deep copy, cause currently there are two characterUpdater with the same initial state initChar
  const { Provider, useStore } = createPartialContextStore(structuredClone(initChar.character));
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
    return () => {
      messageReceiver.removeEventListener('update_char', updateChar)
    };
  }, [])
  
  function updateChar(event) {
    const updates = event.detail;  
    const updateOperations = ["$inc", "$set", "$push", "$pull"];
  
    setState( prev => {
      const char = {...prev}
      let updatedPaths = {}
      updateOperations.forEach((operation) => {
        if (updates.hasOwnProperty(operation)) {
          Object.entries(updates[operation]).forEach(([path, value]) => {
            console.log("update: ", operation, path, value);
            const newValue = changeValue(char, path, value, operation);
            const changedPath = {}
            setPath(changedPath, path,() => newValue)
            updatedPaths = {...updatedPaths, ...changedPath}
          });
        }
      });
      console.log("character paths updated:", updatedPaths)
      return updatedPaths
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
        return setPath(char, path, (prev) => prev.push(value))
        break;
      case "$pull":
        return setPath(char, path, (prev) => prev.filter(item => item._id != value))
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


export { CharacterProvider as CharacterProvider, useCharacterStore as useCharacterStore }
