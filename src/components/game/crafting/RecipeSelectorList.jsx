import React, { useEffect } from 'react';

import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';


const RecipeSelectorList = ({recipeMap, onChange, selectedRecipe}) => {

  const handleListItemClick = (event, identifier) => {
    onChange(identifier);
  };

return (
  <Box >
      <List component="nav" dense>
        {Object.keys(recipeMap).map((recipeName) => (
          <ListItemButton
            key={recipeName}
            selected={selectedRecipe === recipeName}
            onClick={(event) => handleListItemClick(event, recipeName)}
            >
            <ListItemText primary={recipeName} />
          </ListItemButton>
        ))}
      </List>
    </Box>

      
  )
}

export default RecipeSelectorList