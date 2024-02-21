import React, { useContext, useEffect, useState, useMemo } from 'react';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import Box from '@mui/material/Box';
import { Grid, IconButton } from '@mui/material';
import { Container } from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';

const updateTime = 10 // ms update

import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    transition: "none"
  },
}));


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

  function getActionText(){
    return (
      currentAction ?
        <>
          {actionType}
          <br/>
          {(limit) ? (
            <>Iterations left: {iterations}</>
          ):(
            <>Counter: {counter}</>
          )}
        </>
      :
      <>
          {"Empty"}
          <br/>
          <>Counter: 0 </>
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
    <Box
      sx={{
        border: '2px solid #333', // Add this line for border styling
        borderRadius: '4px',
        bgcolor: 'rgba(160, 177, 186, 0.8)',
      }}>
      <Box >
          <BorderLinearProgress variant="determinate" value={progress}/>
        <Grid container>
          <Grid item >
            {getActionText()}
          </Grid>
          <Grid item>
            <IconButton onClick={() => cancelAction()} aria-label="cancel">
              <CancelIcon />
            </IconButton>

          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
