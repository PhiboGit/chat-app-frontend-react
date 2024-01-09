import React, { useContext, useState, useMemo } from 'react';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { GameDataContext } from '../dataProviders/GameDataProvider';

const ItemActionMenu = ({item, closeMenu}) => {
  const { gameData, send } = useContext(GameDataContext);


  const handleEquip = (item, skill) => {
    const equip = {
      "type": "equip",
      "args": {
        "itemId": item._id,
        "skill": skill,
        "slot": item.type
      }
    }
    send(equip)
    closeMenu()
  }

  const handleSell = (item) => {
    const sell = {
      "type": "sell",
      "args": {
        "itemId": item._id,
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
        <Button onClick={() => handleSell(item)} key={"sell"} variant="contained">Sell</Button>
        {item.skills.map((skill) => (
          <Button onClick={() => handleEquip(item, skill)} key={skill} variant="contained">Equip {skill}</Button>
        ))}
      </Box>
    </Container>
  )
}

export default ItemActionMenu