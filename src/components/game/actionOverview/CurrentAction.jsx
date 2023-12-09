import React, { useContext, useEffect, useState, useMemo } from 'react';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import './ActionQueue.css'; // Add your CSS file for styling


const updateTime = 100 // ms update

export default function CurrentAction() {
  const { characterData } = useContext(CharacterDataContext);
  const { send } = useContext(GameDataContext)

  const [progress, setProgress] = useState(0)
  const [timer, setTimer] = useState()

  const currentAction = useMemo(() => characterData.currentAction, [characterData.currentAction]);

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
    setProgress(0);
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
    setProgress(0);
    const startTime = Date.now();
    const actionTime = currentAction.actionTime
    console.log('Starting progress currentAction: ', actionTime);
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      setProgress((elapsedTime / actionTime)* 100);
  
      // Check if the progress has reached the actionTime
      if (elapsedTime >= actionTime) {
        clearInterval(intervalId);
        setProgress(100); // Ensure the progress bar reaches 100%
      }
    }, updateTime);
  
    setTimer(intervalId);
  }

  function getActionName(){
    return (
      <>
        <p>{task} - {actionType}</p>
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
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
          </div>
          <button onClick={() => cancelAction()}>Cancel</button>
        </>
      ) : (
        <p>empty</p>
      )}
    </div>
  );
}
