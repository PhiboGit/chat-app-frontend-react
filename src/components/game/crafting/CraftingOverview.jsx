import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';


import Container from '@mui/material/Container';
import RecipeCard from './CraftingCard';
import CraftingCard from './CraftingCard';
import { Box, Grid } from '@mui/material';
import RecipeSelector from '../gameComponents/RecipeSelector';
import RecipeSelectorList from './RecipeSelectorList';

const CraftingOverview = ({craftingActionState, dispatch}) => {
  const { gameData } = useContext(GameDataContext);

  const professionRecipes = Object.fromEntries(
    Object.entries(gameData.recipesData)
      .filter(([key, recipe]) => recipe.profession === craftingActionState.profession)
  )

  const onChangeRecipe = (recipeName) => {
    console.log('recipeName', recipeName);
    dispatch({ type: 'changed_recipeName', recipeName: recipeName })
  }

  return (
    <Box maxWidth="md" sx={{ paddingTop: 2, paddingBottom: 2}}>
      <Grid container direction='row'>
        <Grid item xs={3} sx={{ justifyContent: "start", display: "flex"}}>
          <RecipeSelectorList
            recipeMap={professionRecipes}
            selectedRecipe={craftingActionState.recipeName}
            onChange={onChangeRecipe}
          />
        </Grid>
        <Grid item xs={9} sx={{ justifyContent: "center", display: 'block'}}>
          <CraftingCard 
            craftingActionState={craftingActionState}
            dispatch={dispatch}
          />
        </Grid>
      </Grid>

    </Box>
  );
};

export default CraftingOverview;
