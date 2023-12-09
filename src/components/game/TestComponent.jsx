import React, { useContext } from 'react';
import { GameDataContext } from './dataProviders/GameDataProvider';
import { CharacterDataContext } from './dataProviders/CharacterDataProvider';
import ExpBar from './ExpBar';
import ResourceGrid from './inventory/ResourceGrid';
import CurrentAction from './actionOverview/CurrentAction';
import ActionQueue from './actionOverview/ActionQueue';

const TestComponent = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);
  //const { resources } = useContext(CharacterDataContext);
  // maybe useMemo()
  //const oreT1Value = useMemo(() => characterData.resources.oreT1, [characterData.resources.oreT1]);
  const oreT1Value = characterData.resources.oreT1;
  const resources = characterData.resources


  const startAction = () => {
    const action = {
      "type": "action",
      "actionType": "mining",
      "task": "gathering",
      "limit": true,
      "iterations": 3,
      "args": {
          "tier": 1
        }
      }
    send(action);
  };

  return (
    <div>
      <h1>Test Component</h1>
      <button onClick={startAction}>Start</button>
      <ExpBar profession={"mining"}/>
    </div>
  );
};

export default TestComponent;