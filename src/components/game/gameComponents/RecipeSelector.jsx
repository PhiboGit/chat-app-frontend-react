import React from 'react';

import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

import RecipeIcon from './icons/RecipeIcon';

const RecipeSelector = ({recipeMap, onChange}) => {

return (
  
        <Box 
          display="flex"
          flexDirection='column'
          alignItems="center"
          
        >         
          <Container maxWidth="sx">
            <Box
              sx={{ 
                
                margin: 1,
              }}
            >
              <Grid container justifyContent={"center"} spacing={1}>
                {Object.keys(recipeMap).map((recipeName) => (
                    <Grid item key={recipeName}>
                      <RecipeIcon recipeName={recipeName} onClick={() => onChange(recipeName)}/>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Container>
      </Box>
  )
}

export default RecipeSelector