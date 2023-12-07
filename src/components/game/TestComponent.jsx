import React, { useContext } from 'react';
import { GameDataContext } from './dataProviders/GameDataProvider';
import { CharacterDataContext } from './dataProviders/CharacterDataProvider';

const TestComponent = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);
  //const { resources } = useContext(CharacterDataContext);
  // maybe useMemo()
  //const oreT1Value = useMemo(() => characterData.resources.oreT1, [characterData.resources.oreT1]);
  const oreT1Value = characterData.resources.oreT1;


  const handleButtonClick = () => {
    const action = {
      "type": "action",
      "actionType" : "mining",
        "task": "gathering",
        "limit": true,
        "iterations": 1,
      "args": {
          "tier": 1
        }
      }
    send(action);
  };

  return (
    <div>
      <h1>Test Component</h1>
      <p>GameData: {JSON.stringify(gameData)}</p>
      <p>CharData: {JSON.stringify(characterData)}</p>
      <p>OreT1: {oreT1Value}</p>
      <button onClick={handleButtonClick}>Call send()</button>
    </div>
  );
};

export default TestComponent;