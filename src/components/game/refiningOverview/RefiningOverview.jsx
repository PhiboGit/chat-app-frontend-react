import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import IngredientSelector from '../gameComponents/IngredientSelector';
import RecipeInfo from '../gameComponents/RecipeInfo';
import RecipeSelector from '../gameComponents/RecipeSelector';
import StartActionController from '../gameComponents/StartActionController';
import { Grid } from '@mui/material';

const RefiningOverview = ({profession}) => {
  const { gameData, send } = useContext(GameDataContext);

  const professionRecipes = Object.fromEntries(
    Object.entries(gameData.recipesData)
      .filter(([key, recipe]) => recipe.profession === profession)
  )
  
  const [recipeName, setRecipe] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [limit, setLimit] = useState(true);
  const [iterations, setIterations] = useState(1);

  const changeRecipe = (recipeName) => {
    setRecipe(recipeName);
    setSelectedIngredients(professionRecipes[recipeName].ingredients.map((ingredientSlot) => ingredientSlot.required ? ingredientSlot.slot[0].resource : "null"));
  }

  const handleLimit = (checked) => {
    console.log('limit', checked);
    setLimit(checked);
    setIterations(1);
  };

  
  const handleStart = () =>{
    const crafting = {
      "type": "action",
      "actionType": profession,
      "task": "crafting",
      "limit": limit,
      "iterations": parseInt(iterations),
      "args": {
          "recipe": recipeName,
          "ingredients": selectedIngredients.filter((value) => value !== "null")
      }
    }
    console.log("crafting: ", crafting);
    send(crafting)
  }

  return (
    <Container maxWidth="md">
      
      <RecipeSelector
        recipeMap={professionRecipes}
        onChange={changeRecipe}
      />
        
      {recipeName && 
      <Box 
        display="flex"
        flexDirection='column'
        alignItems="center"
        sx={{ bgcolor: 'rgba(169, 223, 110, 0.8)'}}
      >
        <RecipeInfo recipe={professionRecipes[recipeName]}/>
        <IngredientSelector
          recipeName={recipeName}
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
        />
      
        <StartActionController
          hasLimit={limit}
          onChangeLimit={handleLimit}
          iterations={iterations}
          setIterations={setIterations}
          startDisabled={selectedIngredients.length < 1}
          onClickStart={handleStart}
        />
      </Box>
      }
    </Container>
  );
};

export default RefiningOverview;
