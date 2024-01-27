// CharacterDataProvider.jsx
import { createContext, useEffect, useState } from 'react';

export const CharacterDataContext = createContext();

export const CharacterDataProvider = ({children, initCharData, messageReceiver }) => {

  const charData = initCharData.character
  const [characterData, setCharacterData] = useState(charData);
  const [marketplaceOrderBook, setMarketplaceOrderBook] = useState();


  useEffect(() => {
    console.log("adding event listener")
    messageReceiver.addEventListener('update_char', updateChar);
    messageReceiver.addEventListener('action_manager', updateChar);
    messageReceiver.addEventListener('items', updateItems);
    messageReceiver.addEventListener('marketplace' , updateMarketplace)

    return () => {
      
      console.log("removing event listener")
      messageReceiver.removeEventListener('update_char', updateChar)
      messageReceiver.removeEventListener('action_manager', updateChar)
      messageReceiver.removeEventListener('items', updateItems);
      messageReceiver.removeEventListener('marketplace', updateMarketplace);
    };
  }, [])

  function updateMarketplace(event){
    const receivedData = event.detail; // Access the data from the detail property
    console.log("Marketplace update: ", receivedData);

    if (receivedData.hasOwnProperty("orderBook")){
      setMarketplaceOrderBook(receivedData.orderBook)
    }
  }

  useEffect(() => {
    setCharacterData(charData);
  }, [charData]);

  function updateItems(event){
    const receivedData = event.detail; // Access the data from the detail property
    console.log("Item update: ", receivedData);

    const items = receivedData.items;
    
    changeValue('items', items, "$push");
  }

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

    console.log("CharData updated!", characterData);
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
        if(lastKey == 'items' && typeof value === 'string'){
          return
        } else if(lastKey == 'items' && Array.isArray(value)){
          // Create a mapping of _id to objects in currentObj[lastKey]
          const idToItemMap = currentObj[lastKey].reduce((map, item) => {
            map[item._id] = item;
            return map;
          }, {});
          for(const newItem of value){
            const item = idToItemMap[newItem._id]
            if(item){
              Object.assign(item, newItem);
            } else {
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
    setCharacterData({ ...charData });
    console.log("characterData updated!")
  }

  return (
    <CharacterDataContext.Provider value={{ characterData, marketplaceOrderBook }}>
      {children}
    </CharacterDataContext.Provider>
  );
};
