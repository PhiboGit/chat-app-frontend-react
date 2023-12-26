import React, { useContext, useMemo } from 'react';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';
import { GameDataContext } from '../dataProviders/GameDataProvider';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Container, Grid } from '@mui/material';

export default function ActionQueue() {
  const { characterData } = useContext(CharacterDataContext);
  const { send } = useContext(GameDataContext);

  const actionQueue = useMemo(() => characterData.actionQueue, [characterData.actionQueue]);

  const cancelAction = (index) => {
    send({
      type: 'cancel',
      index: index, // index <= 0 is the current action, otherwise the queue index
    });
  };

  return (
    <Container>
      {actionQueue &&
       <Box
       sx={{
         border: '2px solid #333', // Add this line for border styling
         borderRadius: '4px',
         bgcolor: 'rgba(160, 177, 186, 0.8)',
       }}
      >
        {actionQueue.map((action, index) => (
        <Grid container key={index}>
            <Grid item xs={10} sx={{ bgcolor: 'rgba(100, 177, 186, 0.8)'}}>
              {`${action.actionType}`}
            </Grid>
            <Grid item xs={2} key={index}>
              <IconButton onClick={() => cancelAction(index)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Grid>
        </Grid>
        ))}
      </Box>}
    </Container>
  );
}
