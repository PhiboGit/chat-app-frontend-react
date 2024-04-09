import React , { useContext } from 'react';

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import ResourceIcon from './icons/ResourceIcon';
import { GameDataContext } from '../dataProviders/GameDataProvider';

const RecipeInfo = ({recipeName}) => {
  const { gameData } = useContext(GameDataContext);
  const recipe = gameData.recipesData[recipeName]
  const resourceInfo = gameData.resourcesInfo[recipe.name]

  return (
    <Container maxWidth="xs">
      <Box 
        display="flex"
        flexDirection='column'
        alignItems="center"
        sx={{ bgcolor: 'rgba(135, 168, 155, 0.8)'}}
      >
        <h3>{`${recipe.amount} x ${resourceInfo.displayName}`}</h3>
        <Box
            sx={{
              margin: 1,
              border: '2px dashed black', // Adjust the border styles
              padding: 0.3, // Optional: Add padding to the box
            }}
          >
            <ResourceIcon amount={recipe.amount} name={recipe.name} />
          </Box>   
        <b>{`Level: ${recipe.level}`}</b>
        <b>{`Exp: ${recipe.exp}`}</b>
        <b>{`CharExp: ${recipe.expChar}`}</b>
        <b>{`Time: ${recipe.time}ms`}</b>
      </Box>
    </Container>
  )
}

export default RecipeInfo