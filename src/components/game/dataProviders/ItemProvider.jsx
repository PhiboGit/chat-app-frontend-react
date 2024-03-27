import React, {
  useEffect,
} from "react";
import createPartialContextStore from "./createPartialContextStore";
import {messageReceiver} from "./MessageReceiver";

let useItemIdMapStore



// Updater is a child of Provider to access the store
const ItemProvider = ({children, initChar}) => {
  const idToItemMap = new Map()
  initChar.character.items.forEach((item) => idToItemMap.set(item._id, item))
  console.log(idToItemMap)  

  const { Provider, useStore } = createPartialContextStore(idToItemMap);
  useItemIdMapStore = useStore

  return (
    <Provider>
      <Updater useStore={useStore}>
        {children}
      </Updater>
    </Provider>
  )
}

// subs to the event emitted by the websocket
const Updater = ({children, useStore}) => {
  const [idToItemMap, setMapState] = useStore((map) => map);

  
  useEffect(() => {
    messageReceiver.addEventListener('item_update' , updateItem)
    messageReceiver.addEventListener('update_char' , pullItem)
    return () => {
      messageReceiver.removeEventListener('item_update', updateItem)
      messageReceiver.removeEventListener('update_char', pullItem)
    };
  }, [])
  
  function updateItem(event){
    const receivedData = event.detail;
    const item = receivedData.item;
    //idToItemMap.set(item._id, item)
    setMapState(prev => {
      const map = new Map(prev)
      map.set(item._id, item)
      return map
    })
    console.log("update ItemIdMap", idToItemMap)
  }

  function pullItem(event){
    const updates = event.detail;  
    // only delete object from map if it is an pull from items
    if (updates.hasOwnProperty("$pull")) {
      Object.entries(updates["$pull"]).forEach(([path, id]) => {
        // a pull from items is an id
        if(path === "items" ){
          console.log("pull from ItemIdMap")
          setMapState(prev => {
            const map = new Map(prev)
            map.delete(id)
            return map
          })
        }
      })
    }
  }
  
  return (
    <>
      {children}
    </>
  )
}


export { ItemProvider as ItemProvider, useItemIdMapStore as useItemIdMapStore }
