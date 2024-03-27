// GameDataProvider.jsx
import { createContext } from 'react';

export const GameDataContext = createContext();

export const GameDataProvider = ({children, initGameData, send }) => {
  const gameData = {
    resourcesInfo: initGameData.resourcesInfo,
    expTable: initGameData.expTable,
    gatheringResourcesData: initGameData.gatheringResourcesData,
    recipesData: initGameData.recipesData,
    refiningRecipes: initGameData.refiningRecipes,
    craftingTable: initGameData.craftingTable,
    craftingMaterials: initGameData.craftingMaterials
  };

  return (
    <GameDataContext.Provider value={{ gameData, send }}>
      {children}
    </GameDataContext.Provider>
  );
};
