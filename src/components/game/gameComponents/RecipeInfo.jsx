import React from 'react';

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

const RecipeInfo = ({recipe}) => {

  return (
    <Container maxWidth="xs">
      <Box 
        display="flex"
        flexDirection='column'
        alignItems="center"
        sx={{ bgcolor: 'rgba(135, 168, 155, 0.8)'}}
      >
        <h3>Info:</h3>
        <b>{`Amount: ${recipe.amount} x ${recipe.name}`}</b>
        <b>{`Level: ${recipe.level}`}</b>
        <b>{`Exp: ${recipe.exp}`}</b>
        <b>{`CharExp: ${recipe.expChar}`}</b>
        <b>{`Time: ${recipe.time}ms`}</b>
      </Box>
    </Container>
  )
}

export default RecipeInfo