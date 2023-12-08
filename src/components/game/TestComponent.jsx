import React, { useContext } from 'react';
import { GameDataContext } from './dataProviders/GameDataProvider';
import { CharacterDataContext } from './dataProviders/CharacterDataProvider';
import ExpBar from './ExpBar';
import ResourceGrid from './inventory/ResourceGrid';
import CurrentAction from './CurrentAction';
import ActionQueue from './ActionQueue';

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

  const chancelAction = () => {
    send({
      "type": "cancel",
      "index": -1 // index < 0 is the current action, otherwise the queue index});
    }) 
  }

  return (
    <div>
      <h1>Test Component</h1>
      <p>GameData: {JSON.stringify(gameData)}</p>
      <p>CharData: {JSON.stringify(characterData)}</p>
      <p>OreT1: {oreT1Value}</p>
      <button onClick={startAction}>Start</button>
      <button onClick={chancelAction}>Cancel</button>
      <ExpBar profession={"character"}/>
      <ExpBar profession={"mining"}/>
      <CurrentAction />
      <ActionQueue />
      <ResourceGrid resources={resources} />
    </div>
  );
};

export default TestComponent;