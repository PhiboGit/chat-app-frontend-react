import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';


import Container from '@mui/material/Container';
import RecipeCard from './CraftingCard';
import CraftingCard from './CraftingCard';
import { Box } from '@mui/material';
import RecipeSelector from '../gameComponents/RecipeSelector';

const CraftingOverview = ({profession}) => {
  const { gameData } = useContext(GameDataContext);

  const [recipeName, setRecipeName] = useState('');

  useEffect(() => {
    setRecipeName('')
  }, [profession])

  const professionRecipes = Object.fromEntries(
    Object.entries(gameData.recipesData)
      .filter(([key, recipe]) => recipe.profession === profession)
  )

  const onChangeRecipe = (recipeName) => {
    console.log('recipeName', recipeName);
    setRecipeName(recipeName);
  }

  return (
    <Container maxWidth="md">
      <Box display='flex' flexDirection='row'>
        <RecipeSelector
          recipeMap={professionRecipes}
          onChange={onChangeRecipe}
          
        />
        {recipeName && <CraftingCard 
          profession={profession}
          recipeName={recipeName}
        />}
      </Box>

    </Container>
  );
};

export default CraftingOverview;
