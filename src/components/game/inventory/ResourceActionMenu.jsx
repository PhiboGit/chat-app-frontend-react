import React, { useContext, useState, useMemo } from 'react';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { GameDataContext } from '../dataProviders/GameDataProvider';

const ResourceActionMenu = ({resource, closeMenu}) => {
  const { gameData, send } = useContext(GameDataContext);

  const handleSell = (item) => {
    const sell = {
      "type": "sell/resource",
      "args": {
        "resourceName": resource,
        "amount": 1
      }
    }
    send(sell)
    closeMenu()
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          bgcolor: 'rgba(160, 177, 186, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Optional: Align items in the center horizontally
        }}
      >
        <Button onClick={() => handleSell(resource)} key={"sell"} variant="contained">Sell</Button>
      </Box>
    </Container>
  )
}

export default ResourceActionMenu