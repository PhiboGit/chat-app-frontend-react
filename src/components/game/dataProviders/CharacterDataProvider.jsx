// CharacterDataProvider.jsx
import { createContext, useEffect, useState } from 'react';

export const CharacterDataContext = createContext();

export const CharacterDataProvider = ({children, initCharData, messageReceiver }) => {
  
  const [charData, setCharData] = useState(initCharData)

  useEffect(() => {
    console.log("adding event listener")
    messageReceiver.addEventListener('update_char', updateChar);

    return () => {
      
      console.log("removing event listener")
      messageReceiver.removeEventListener('update_char', updateChar)
    };
  }, [])

  function updateChar(event){
    const receivedData = event.detail; // Access the data from the detail property
    console.log("Char update: ", receivedData);
  }

  return (
    <CharacterDataContext.Provider value={{ charData }}>
      {children}
    </CharacterDataContext.Provider>
  );
};
