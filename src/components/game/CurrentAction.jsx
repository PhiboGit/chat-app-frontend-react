import React, { useContext, useEffect, useState, useMemo } from 'react';
import { CharacterDataContext } from './dataProviders/CharacterDataProvider';
import { GameDataContext } from './dataProviders/GameDataProvider';
import './ActionQueue.css'; // Add your CSS file for styling


const updateTime = 100 // ms update

export default function CurrentAction() {
  const { characterData } = useContext(CharacterDataContext);
  const { send } = useContext(GameDataContext)

  const currentAction = useMemo(() => characterData.currentAction, [characterData.currentAction]);

  const [time, setTime] = useState()
  const [timer, setTimer] = useState()

  const [actionTime, setActionTime] = useState()
  const [task, setTask] = useState()
  const [actionType, setActionType] = useState()
  const [limit, setLimit] = useState()
  const [iterations, setIterations] = useState()
  const [counter, setCounter] = useState()
  const [args, setArgs] = useState()

  useEffect(() => {
    console.log('currentAction: ', currentAction)
    
    clearInterval(timer);
    

    if (currentAction){
      setActionTime(currentAction.actionTime);
      setTask(currentAction.task)
      setActionType(currentAction.actionType)
      setLimit(currentAction.limit)
      setIterations(currentAction.iterations)
      setCounter(currentAction.counter)
      setArgs(currentAction.args)

      startProgress();
    }  
  }, [currentAction]);
  function startProgress() {
    setTime(0);
    const startTime = Date.now();
  
    console.log('Starting progress currentAction: ', actionTime);
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      setTime(elapsedTime);
  
      // Check if the progress has reached the actionTime
      if (elapsedTime >= actionTime) {
        clearInterval(intervalId);
        setTime(actionTime); // Ensure the progress bar reaches 100%
      }
    }, updateTime);
  
    setTimer(intervalId);
  }

  function getActionName(){
    return (
      <>
        {(limit) ? (
          <p>Iterations left: {iterations}</p>
        ):(
          <p>Counter: {counter}</p>
        )}
      </>
    )
  }

  function cancelAction(){
    send({
      type: 'cancel',
      index: -1, // index <= 0 is the current action, otherwise the queue index
    });
  }

  return (
    <div className="action-queue-container">
      <p>Current Action:</p>
      {currentAction ? (
        <>
          {getActionName()}
          <div className="action-progress">
            <progress value={time} max={actionTime} title={``} />
          </div>
          <button onClick={() => cancelAction()}>Cancel</button>
        </>
      ) : (
        <p>empty</p>
      )}
    </div>
  );
}