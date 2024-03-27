import React, { useContext, useState, useMemo } from 'react';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { GameDataContext } from '../dataProviders/GameDataProvider';
import { TextField, Typography } from '@mui/material';

const ResourceActionMenu = ({resource, closeMenu}) => {
  const { gameData, send } = useContext(GameDataContext);
  const info = gameData.resourcesInfo[resource];

  const [sellAmount, setSellAmount] = useState(1)

  const handleSell = () => {
    const sell = {
      "type": "sell/resource",
      "args": {
        "resourceName": resource,
        "amount": sellAmount
      }
    }
    send(sell)
    closeMenu()
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          bgcolor: 'rgba(160, 177, 186, 0.95)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Optional: Align items in the center horizontally
        }}
      >
        <Typography>
          {info.displayName}
        </Typography>
        <TextField 
          type='number' 
          defaultValue={sellAmount} 
          onChange={(event) => setSellAmount(parseInt(event.target.value))}
          size='small'/>
        <Button onClick={handleSell} key={"sell"} variant="contained">Sell</Button>
      </Box>
    </Container>
  )
}

export default ResourceActionMenu