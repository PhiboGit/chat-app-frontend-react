// GameDataProvider.jsx
import { createContext, useState } from 'react';

const GameDataContext = createContext();

export const GameDataProvider = ({children, data }) => {
  const [gameData, setGameData] = useState({
    expTable: data.expTable
  });

  return (
    <GameDataContext.Provider value={{ gameData }}>
      {children}
    </GameDataContext.Provider>
  );
};
