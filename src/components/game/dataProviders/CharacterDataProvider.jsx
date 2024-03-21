// CharacterDataProvider.jsx
import { createContext, useEffect,useContext, useMemo, useState, useRef } from 'react';

export const CharacterDataContext = createContext();


const ActionQueueContext = createContext();

export const useActionQueue = () => {
  return useContext(ActionQueueContext);
};

export const CharacterDataProvider = ({children, initCharData, messageReceiver }) => {

  const charData = initCharData.character
  const [characterData, setCharacterData] = useState(charData);
  const actionQueue = useMemo(() => characterData.actionQueue, [characterData]);

  const idToItemMap = characterData.items.reduce((map, item) => {
    map[item._id] = item;
    return map;
  }, {});

  // marketplace resoucres
  const [idToOrderMap, setIdToOrderMap] = useState({})
  const [marketplaceOrderBook, setMarketplaceOrderBook] = useState();
  
  // marketplace items
  const itemOrderMapRef= useRef({})
  const [idToItemOrderMap, setIdToItemOrderMap] = useState(itemOrderMapRef)
  const [itemMarketplaceOrderBook, setItemMarketplaceOrderBook] = useState();


  useEffect(() => {
    console.log("adding event listener")
    messageReceiver.addEventListener('update_char', updateChar);
    messageReceiver.addEventListener('action_manager', updateChar);
    messageReceiver.addEventListener('items', updateItems);
    messageReceiver.addEventListener('marketplace' , updateMarketplace)
    messageReceiver.addEventListener('order' , updateOrder)
    messageReceiver.addEventListener('item_marketplace' , updateItemMarketplace)
    messageReceiver.addEventListener('item_order' , updateItemOrder)

    return () => {
      
      console.log("removing event listener")
      messageReceiver.removeEventListener('update_char', updateChar)
      messageReceiver.removeEventListener('action_manager', updateChar)
      messageReceiver.removeEventListener('items', updateItems);
      messageReceiver.removeEventListener('marketplace', updateMarketplace);
      messageReceiver.removeEventListener('order', updateOrder);
      messageReceiver.removeEventListener('item_marketplace', updateItemMarketplace);
      messageReceiver.removeEventListener('item_order', updateItemOrder);
    };
  }, [])

  useEffect(() => {
    setCharacterData(charData);
  }, [charData]);


  useEffect(() => {
    populateIdToOrderMap(initCharData.character.orders)
    populateIdToItemOrderMap(initCharData.character.itemOrders)
  }, [initCharData]);
  
  function updateMarketplace(event){
    const receivedData = event.detail; // Access the data from the detail property
    console.log("Marketplace update: ", receivedData);

    if (receivedData.hasOwnProperty("orderBook")){
      setMarketplaceOrderBook(receivedData.orderBook)
    }
  }

  function updateItemMarketplace(event){
    const receivedData = event.detail; // Access the data from the detail property
    console.log("ItemMarketplace update: ", receivedData);

    if (receivedData.hasOwnProperty("orderBook")){
      setItemMarketplaceOrderBook(receivedData.orderBook)
    }
  }

  function populateIdToItemOrderMap(orders){
    console.log("Populate ItemOrder Map");
    const newIdToOrderMap = {...itemOrderMapRef.current};
    for (const order of orders) {
      newIdToOrderMap[order._id] = order;
    }
    itemOrderMapRef.current = newIdToOrderMap;
    setIdToItemOrderMap(itemOrderMapRef.current)
    console.log("ItemOrder Map", itemOrderMapRef.current);
  }

  function populateIdToOrderMap(orders){
    console.log("Populate Order Map");
    setIdToOrderMap(prev => {
      const newIdToOrderMap = {...prev};
      for (const order of orders) {
        newIdToOrderMap[order._id] = order;
      }
      return newIdToOrderMap
    })
    console.log("Order Map", idToOrderMap);
  }

  function updateOrder(event) {
    const receivedData = event.detail; // Access the data from the detail property
    console.log("Order update: ", receivedData);
    const order = receivedData.order;

    setIdToOrderMap(prev => {
      const newIdToOrderMap = {...prev};
      newIdToOrderMap[order._id] = order;
      return newIdToOrderMap
    })
    console.log("Order Map", idToOrderMap);
  }

  function updateItemOrder(event) {
    const receivedData = event.detail; // Access the data from the detail property
    console.log("ItemOrder update: ", receivedData);
    
    const order = receivedData.order;
    const newIdToOrderMap = {...itemOrderMapRef.current};
    
    newIdToOrderMap[order._id] = order;
    
    itemOrderMapRef.current = newIdToOrderMap;
    setIdToItemOrderMap(itemOrderMapRef.current)
    console.log("ItemOrder Map", itemOrderMapRef.current);
  }

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
          for(const newItem of value){
            const item = idToItemMap[newItem._id]
            if(item){
              // overwrite existing item 
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

  const contextValue = { 
    characterData,
    actionQueue,
    idToItemMap,
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
