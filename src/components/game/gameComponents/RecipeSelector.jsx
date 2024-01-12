import React from 'react';

import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

import RecipeIcon from './icons/RecipeIcon';
import ClickAwayPopper from '../../common/ClickAwayPopper'

const RecipeSelector = ({selectedRecipeName, recipeMap, onChange}) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openPopper = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopper = () => {
    setAnchorEl(null);
  };

  const onChangeRecipe = (recipeName) => {
    closePopper()
    onChange(recipeName)
  }

return (
  <Container maxWidth="xs">
        <Box 
          display="flex"
          flexDirection='column'
          alignItems="center"
          sx={{ bgcolor: 'rgba(160, 177, 186, 0.8)'}}
        >
          <div>Select a Recipe:</div>
          
          <Box
            sx={{
          border: '2px dashed black', // Adjust the border styles
          padding: 0.3, // Optional: Add padding to the box
          }}
          >
          {selectedRecipeName ? (
            <RecipeIcon recipe={recipeMap[selectedRecipeName]} onClick={openPopper} />
            ) : (
              <RecipeIcon disableTitle onClick={openPopper} />
            )}
            <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
              <Container maxWidth="xs">
                <Box
                  sx={{ bgcolor: 'rgba(160, 177, 186, 0.8)'}}
                >
                <Grid container spacing={1}>
                  {Object.keys(recipeMap).map((recipeName) => (
                      <Grid item key={recipeName}>
                        <RecipeIcon recipe={recipeMap[recipeName]} onClick={() => onChangeRecipe(recipeName)}/>
                      </Grid>
                    ))}
                </Grid>
                </Box>
              </Container>
            </ClickAwayPopper>
          </Box>   
      </Box>
      </Container>
  )
}

export default RecipeSelector