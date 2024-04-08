import React from 'react';

import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

import RecipeIcon from './icons/RecipeIcon';
import ClickAwayPopper from '../../common/ClickAwayPopper'

const RecipeSelector = ({recipeMap, onChange}) => {

return (
  
        <Box 
          display="flex"
          flexDirection='column'
          alignItems="center"
          sx={{ bgcolor: 'rgba(160, 177, 186, 0.8)'}}
        >
          Select a Recipe:
          
          <Container maxWidth="sx">
            <Box
              sx={{ 
                bgcolor: 'rgba(160, 177, 186, 0.8)',
                margin: 1,
              }}
            >
              <Grid container justifyContent={"center"} spacing={1}>
                {Object.keys(recipeMap).map((recipeName) => (
                    <Grid item key={recipeName}>
                      <RecipeIcon recipe={recipeMap[recipeName]} onClick={() => onChange(recipeName)}/>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Container>
      </Box>
  )
}

export default RecipeSelector