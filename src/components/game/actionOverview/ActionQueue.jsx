import React, { useContext, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';

import DeleteIcon from '@mui/icons-material/Delete';
import QueueIcon from '@mui/icons-material/Queue';
import { Box, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import ClickAwayPopper from '../../common/ClickAwayPopper';
import { useCharacterStore } from '../dataProviders/CharacterProvider';

export default function ActionQueue() {
  const [actionQueue] = useCharacterStore((char) => char.actionQueue)
  const { send } = useContext(GameDataContext);

  const [anchorEl, setAnchorEl] = useState()

  const cancelAction = (index) => {
    send({
      type: 'cancel',
      index: index, // index <= 0 is the current action, otherwise the queue index
    });
  };

  const openPopper = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    
       <Box height={"5vh"} display="flex" flexDirection="column"
       sx={{
         border: '2px solid #333', // Add this line for border styling
         borderRadius: '4px',
         bgcolor: 'rgba(160, 177, 186, 0.8)',
       }}
      >
        <Box height={"5vh"} display="flex" flexDirection="row" alignItems={"center"}>
          {actionQueue.length}
          <IconButton onClick={(event) => openPopper(event)} aria-label="delete">
            <QueueIcon fontSize="small"/>
          </IconButton>
        </Box>
        
          
       
        <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>

        
          <Box sx={{
            border: '2px solid #333', // Add this line for border styling
            borderRadius: '4px',
            bgcolor: 'rgba(160, 177, 186, 1)',
          }}>
          Your Queue:
          {actionQueue.map((action, index) => (
          <Grid container key={index} sx={{ borderTop: 3, borderColor: 'divider' }}>
              <Grid item>
                {index}:
              </Grid>
              <Grid item  >
                {`${action.actionType}`}
              </Grid>
              <Grid item key={index}>
                <IconButton onClick={() => cancelAction(index)} aria-label="delete">
                  <DeleteIcon fontSize="small"/>
                </IconButton>
              </Grid>
          </Grid>
          ))}
          </Box>
          

        </ClickAwayPopper>
      </Box>
  );
}
