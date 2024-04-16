import React , { useContext } from 'react';

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { Typography } from '@mui/material';

const CraftingInfoText = ({recipeName}) => {
  const { gameData } = useContext(GameDataContext);
  const recipe = gameData.recipesData[recipeName]
  const resourceInfo = gameData.resourcesInfo[recipe.name]

  return (
    <Container maxWidth="xs">
      <Box 
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <Box>
          <Typography >
            {`Level: ${recipe.level}`}
          </Typography>
          <Typography>
            {`Exp: ${recipe.exp}`}
          </Typography>
          <Typography>
            {`Exp Char: ${recipe.expChar}`}
          </Typography>
          <Typography>
            {`Time: ${recipe.time}ms`}
          </Typography>

        </Box>
      </Box>
    </Container>
  )
}

export default CraftingInfoText