// GameDataProvider.jsx
import { createContext, useState } from 'react';

export const GameDataContext = createContext();

export const GameDataProvider = ({children, initGameData, initCharData, send }) => {
  const [gameData, setGameData] = useState({
    expTable: initGameData.expTable,
    gatheringResourcesData: initGameData.gatheringResourcesData,
    recipesData: initGameData.recipesData
  });
  const [charData, setCharData] = useState({
    character: initCharData.character})

  return (
    <GameDataContext.Provider value={{ gameData, charData, send }}>
      {children}
    </GameDataContext.Provider>
  );
};
