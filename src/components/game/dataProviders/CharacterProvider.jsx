import React, {
  useEffect,
} from "react";
import createPartialContextStore from "./createPartialContextStore";
import {messageReceiver} from "./MessageReceiver";

const { Provider, useStore } = createPartialContextStore({});

// Updater is a child of Provider to access the store
const CharacterProvider = ({children, initChar}) => {
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
  const [charState, setState] = useStore((char) => char.currency);
  
  useEffect(() => {
    setState(initChar.character)
    messageReceiver.addEventListener('update_char' , updateChar)
    return () => {
      messageReceiver.removeEventListener('update_char', updateChar)
    };
  }, [])
  
  function updateChar(event) {
    setState((prev) => {
      console.log('prev', prev);
    
      return  { currency: {gold : prev.currency.gold + 10}}
    
    })
    // const char = {...state}
    // char.currency.gold = 10
    // setState(char)
    // const updateData = event.detail;  
    // const updateOperations = ["$inc", "$set", "$push", "$pull"];
  
    // const char = state
    // console.log("characterStore prev", char)
    // updateOperations.forEach((operation) => {
    //   if (updateData.hasOwnProperty(operation)) {
    //     Object.entries(updateData[operation]).forEach(([key, value]) => {
    //       console.log("update: ", operation, key, value);
    //       changeValue(char, key, value, operation);
    //     });
    //   }
    // });
    // setState( char )
    // console.log("characterStore updated!", char)
  }

  function changeValue(char, key, value, operation) {
    // traverse through the char data by key
    const keys = key.split('.');
    // tree start, root, pointer to the entry that holds the key,value pair that needs to be changed
    let currentObj = char;
    // find the entry of the charData that need change based on the key. It is still and object.
    // we stop at the object that holds the key/value. (keys[keys.length - 2])
    for (let i = 0; i < keys.length - 1; i++) {
      const currentKey = keys[i];
      if (!currentObj[currentKey]) {
        console.error("Invalid key for key: ", currentKey);
        return;
      }
      // set the pointer to the current key
      currentObj = currentObj[currentKey];
    }
    // currentObj now points to the object that should have the entry that needs to be updated
  
    // the entry that needs to be updated
    const lastKey = keys[keys.length - 1];

    switch (operation) {
      case "$inc":
        currentObj[lastKey] += value;
        break;
      case "$set":
        currentObj[lastKey] = value;
        break;
      case "$push":
        if(lastKey == 'items' && typeof value === 'string'){
          return
          // if it is an item update, the item is wrapped in an array
        } else if(lastKey == 'items' && Array.isArray(value)){
          for(const newItem of value){
            // overwrite existing item
            if(idToItemMap[newItem._id]){
              Object.assign(item, newItem);
            } else {
              // or just add the item
              currentObj[lastKey].push(newItem);
            }
          }
          currentObj[lastKey]
        }else {
          currentObj[lastKey].push(value);
        }
        break;
      case "$pull":
        currentObj[lastKey] = currentObj[lastKey].filter(item => item._id != value);
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


export { CharacterProvider as CharacterProvider, useStore as useCharacterStore }
