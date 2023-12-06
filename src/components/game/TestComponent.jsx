import React, { useContext } from 'react';
import { GameDataContext } from './dataProviders/GameDataProvider';
import { CharacterDataContext } from './dataProviders/CharacterDataProvider';

const TestComponent = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { charData } = useContext(CharacterDataContext);

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
      <p>CharData: {JSON.stringify(charData)}</p>
      <button onClick={handleButtonClick}>Call send()</button>
    </div>
  );
};

export default TestComponent;