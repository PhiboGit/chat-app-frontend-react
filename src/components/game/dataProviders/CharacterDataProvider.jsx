// CharacterDataProvider.jsx
import { createContext, useEffect, useState } from 'react';

export const CharacterDataContext = createContext();

export const CharacterDataProvider = ({children, initCharData, messageReceiver }) => {

  const charData = initCharData.character
  const [characterData, setCharacterData] = useState(charData);


  useEffect(() => {
    console.log("adding event listener")
    messageReceiver.addEventListener('update_char', updateChar);
    messageReceiver.addEventListener('action_manager', updateChar);
    
    return () => {
      
      console.log("removing event listener")
      messageReceiver.removeEventListener('update_char', updateChar)
      messageReceiver.removeEventListener('action_manager', updateChar)
    };
  }, [])

  useEffect(() => {
    setCharacterData(charData);
  }, [charData]);

  function updateChar(event) {
    const receivedData = event.detail; // Access the data from the detail property
    console.log("Char update: ", receivedData);
  
    const updateOperations = ["$inc", "$set", "$push", "$pull"];
  
    updateOperations.forEach((operation) => {
      if (receivedData.hasOwnProperty(operation)) {
        Object.entries(receivedData[operation]).forEach(([key, value]) => {
          console.log("update: ", operation, key, value);
          changeValue(key, value, operation);
        });
      }
    });

    console.log("CharData updated");
  }

  function changeValue(key, value, operation) {
    // traverse through the char data by key
    const keys = key.split('.');
    let currentObj = charData;
    for (let i = 0; i < keys.length - 1; i++) {
      const currentKey = keys[i];
      if (!currentObj[currentKey]) {
        console.error("Invalid key for key: ", currentKey);
        return;
      }
      currentObj = currentObj[currentKey];
    }
  
    const lastKey = keys[keys.length - 1];

    switch (operation) {
      case "$inc":
        currentObj[lastKey] += value;
        break;
      case "$set":
        currentObj[lastKey] = value;
        break;
      case "$push":
        currentObj[lastKey].push(value);
        break;
      case "$pull":
        currentObj[lastKey] = currentObj[lastKey].filter(item => item !== value);
        break;
      default:
        console.error("Invalid operation: ", operation);
        return;
    }
    setCharacterData({ ...charData });
  }

  return (
    <CharacterDataContext.Provider value={{ characterData }}>
      {children}
    </CharacterDataContext.Provider>
  );
};
