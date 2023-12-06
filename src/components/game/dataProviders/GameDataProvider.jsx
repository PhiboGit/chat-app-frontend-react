// GameDataProvider.jsx
import { createContext, useState } from 'react';

export const GameDataContext = createContext();

export const GameDataProvider = ({children, initGameData, send }) => {
  const [gameData, setGameData] = useState({
    expTable: initGameData.expTable,
    gatheringResourcesData: initGameData.gatheringResourcesData,
    recipesData: initGameData.recipesData
  });

  return (
    <GameDataContext.Provider value={{ gameData, send }}>
      {children}
    </GameDataContext.Provider>
  );
};
