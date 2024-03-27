// CharacterDataProvider.jsx
import { createContext, useEffect,useContext, useMemo, useState, useRef } from 'react';

export const CharacterDataContext = createContext();


const ActionQueueContext = createContext();
export const useActionQueue = () => {
  const actionQueue = useContext(ActionQueueContext);

  return actionQueue
};

export const CharacterDataProvider = ({children, initCharData, messageReceiver }) => {

  const [characterData, setCharacterData] = useState(initCharData.character);
  const actionQueue = useMemo(() => characterData.actionQueue, [characterData]);

  // marketplace resoucres
  const [idToOrderMap, setIdToOrderMap] = useState({})
  const [marketplaceOrderBook, setMarketplaceOrderBook] = useState();
  
  // marketplace items
  const [idToItemOrderMap, setIdToItemOrderMap] = useState({})
  const [itemMarketplaceOrderBook, setItemMarketplaceOrderBook] = useState();


  useEffect(() => {
    console.log("adding event listener")
    messageReceiver.addEventListener('update_char', updateChar);
    messageReceiver.addEventListener('action_manager', updateChar);
    messageReceiver.addEventListener('marketplace' , updateMarketplace)
    messageReceiver.addEventListener('order' , updateOrder)
    messageReceiver.addEventListener('item_marketplace' , updateItemMarketplace)
    messageReceiver.addEventListener('item_order' , updateItemOrder)

    return () => {
      console.log("removing event listener")
      messageReceiver.removeEventListener('update_char', updateChar)
      messageReceiver.removeEventListener('action_manager', updateChar)
      messageReceiver.removeEventListener('marketplace', updateMarketplace);
      messageReceiver.removeEventListener('order', updateOrder);
      messageReceiver.removeEventListener('item_marketplace', updateItemMarketplace);
      messageReceiver.removeEventListener('item_order', updateItemOrder);
    };
  }, [])

  //with the initData pre-populate the maps
  useEffect(() => {
    populateIdToOrderMap(initCharData.character.orders)
    populateIdToItemOrderMap(initCharData.character.itemOrders)
  }, [initCharData]);
  
  function updateMarketplace(event){
    const receivedData = event.detail;
    if (receivedData.hasOwnProperty("orderBook")){
      setMarketplaceOrderBook(receivedData.orderBook)
    }
  }

  function updateItemMarketplace(event){
    const receivedData = event.detail; 
    if (receivedData.hasOwnProperty("orderBook")){
      setItemMarketplaceOrderBook(receivedData.orderBook)
    }
  }

  function populateIdToItemOrderMap(orders){
    setIdToItemOrderMap(prev => {
      const newIdToOrderMap = {...prev};
      for (const order of orders) {
        newIdToOrderMap[order._id] = order;
      }
      return newIdToOrderMap
    })
  }

  function populateIdToOrderMap(orders){
    setIdToOrderMap(prev => {
      const newIdToOrderMap = {...prev};
      for (const order of orders) {
        newIdToOrderMap[order._id] = order;
      }
      return newIdToOrderMap
    })
  }

  function updateOrder(event) {
    const receivedData = event.detail;
    const order = receivedData.order;
    setIdToOrderMap(prev => {
      const newIdToOrderMap = {...prev};
      newIdToOrderMap[order._id] = order;
      return newIdToOrderMap
    })
  }

  function updateItemOrder(event) {
    const receivedData = event.detail;
    const order = receivedData.order;
    setIdToItemOrderMap(prev => {
      const newIdToOrderMap = {...prev};
      newIdToOrderMap[order._id] = order;
      return newIdToOrderMap
    })
  }


  function updateChar(event) {
    const receivedData = event.detail;  
    const updateOperations = ["$inc", "$set", "$push", "$pull"];
  
    setCharacterData( prev => {
      const char = {...prev}
      updateOperations.forEach((operation) => {
        if (receivedData.hasOwnProperty(operation)) {
          Object.entries(receivedData[operation]).forEach(([key, value]) => {
            console.log("update: ", operation, key, value);
            changeValue(char, key, value, operation);
          });
        }
      });
      return char
    })
    console.log("characterData updated!", characterData)
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
          currentObj[lastKey].push(value);
        break;
      case "$pull":
        currentObj[lastKey] = currentObj[lastKey].filter(item => item._id != value);
        break;
      default:
        console.error("Invalid operation: ", operation);
        return;
    }
  }

  const contextValue = { 
    characterData,
    actionQueue,
    marketplaceOrderBook,
    idToOrderMap,
    itemMarketplaceOrderBook,
    idToItemOrderMap 
  }

  return (
    <CharacterDataContext.Provider value={contextValue}>
      <ActionQueueContext.Provider value={actionQueue}>
        {children}
      </ActionQueueContext.Provider>
    </CharacterDataContext.Provider>
  );
};
