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

  const [limit, setLimit] = useState(false);
  const [iterations, setIterations] = useState(1);

  const changeRecipe = (recipeName) => {
    setRecipe(recipeName);
    setSelectedIngredients(professionRecipes[recipeName].ingredients.map((ingredientSlot) => ingredientSlot.required ? ingredientSlot.slot[0].resource : "null"));
  }

  
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
        <RecipeInfo recipeName={recipeName}/>
        <IngredientSelector
          recipeName={recipeName}
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
        />
      </Box>
      }
      
      <StartActionController
        limit={limit}
        setLimit={setLimit}
        iterations={iterations}
        setIterations={setIterations}
        startDisabled={selectedIngredients.length < 1}
        onClickStart={handleStart}
      />
    </Container>
  );
};

export default RefiningOverview;
