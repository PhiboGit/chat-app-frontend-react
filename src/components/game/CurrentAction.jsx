import React, { useContext, useEffect, useState, useMemo } from 'react';
import { CharacterDataContext } from './dataProviders/CharacterDataProvider';

const updateTime = 100 // ms update

export default function CurrentAction() {
  const { characterData } = useContext(CharacterDataContext);

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

  function startProgress(){
    setTime(0)
    console.log('Starting progress currentAction: ', time)
    const intervalId = setInterval(() => {
      setTime((time) => {
        return time + updateTime
      });
    }, updateTime);
  
    setTimer(intervalId);
  }

  function getActionName(){
    return (
      <>
        <p>{task} - {actionType}: {JSON.stringify(args)}</p>
        {(limit) ? (
          <p>Iterations left: {iterations}</p>
        ):(
          <p>Counter: {counter}</p>
        )}
      </>
    )
  }

  return (
    <div>
      <p>Current Action:</p>
      {(currentAction) ? (
        <>
          {getActionName()}
          <progress value={time} max={actionTime} title={``} />
        </>
      ):(
        <p>empty</p>
      )}
    </div>
  );
}