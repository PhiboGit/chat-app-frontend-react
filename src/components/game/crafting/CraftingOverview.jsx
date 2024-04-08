import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';

import IngredientSelector from '../gameComponents/IngredientSelector';
import ProfessionSelector from '../gameComponents/ProfessionSelector';
import RecipeInfo from '../gameComponents/RecipeInfo';
import RecipeSelector from '../gameComponents/RecipeSelector';
import StartActionController from '../gameComponents/StartActionController';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import RarityDistribution from './RarityDistribution';

const CraftingOverview = () => {
  const { gameData, send } = useContext(GameDataContext);

  const [profession, setProfession] = useState('');
  const [allRecipes, setAllRecipes] = useState({});
  const [recipeName, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleProfession = (newProfession) => {
    console.log('selected Profession', newProfession)
    // Reset recipe and ingredients when the profession changes
    setProfession(newProfession);
    setRecipe('');
    setIngredients([]);
    setSelectedIngredients([]);
    setAllRecipes(gameData.recipesData.filter((recipe) => recipe.profession === newProfession));
  };

  const handleRecipe = (newRecipeName) => {
    console.log("selected Recipe: ", newRecipeName)
    setRecipe(newRecipeName);
    setIngredients(allRecipes[newRecipeName]?.ingredients || []);
    const newSelectedIngredients = allRecipes[newRecipeName]?.ingredients.map((value) => value.required ? value.slot[0].resource : "") || []
    setSelectedIngredients(newSelectedIngredients);
    console.log("selected Ingredients: ", newSelectedIngredients)
  };

  const handleIngredients = (ingredientName, slotIndex) => {
    const newSelectedIngredients = [...selectedIngredients];
    newSelectedIngredients[slotIndex] = ingredientName
    console.log("selected Ingredients: ", newSelectedIngredients);
    setSelectedIngredients(newSelectedIngredients);
  };
  
  function init(){
    const selectedProfession = 'toolsmith'

    setProfession(selectedProfession)
    setRecipe('');
    setIngredients([]);
    setSelectedIngredients([]);
    setAllRecipes(gameData.recipesData.filter((recipe) => recipe.profession ===selectedProfession));
  } 
  
  useEffect(() => {
    init();
  }, []);

  const [limit, setLimit] = React.useState(true);

  const handleLimit = (checked) => {
    console.log('limit', checked);
    setLimit(checked);
    setIterations(1);
  };

  const [iterations, setIterations] = useState(1);
  const handleIterations = (number) => {
    setIterations(number)
  }
  
  function handleStart(){
    const crafting = {
      "type": "action",
      "actionType": profession,
      "task": "crafting",
      "limit": limit,
      "iterations": parseInt(iterations),
      "args": {
          "recipe": recipeName,
          "ingredients": selectedIngredients.filter((value) => value !== "")
      }
    }
    console.log("crafting: ", crafting);
    send(crafting)
  }


  return (
    <Container maxWidth="sm">
      <Box 
        display="flex"
        flexDirection='column'
        alignItems="center"
        sx={{ bgcolor: 'rgba(169, 223, 251, 0.8)'}}>

        <ProfessionSelector 
          professions={['toolsmith', 'armorer']}
          selectedProfession={profession}
          onChange={handleProfession} 
        />

        <RecipeSelector
          selectedRecipeName={recipeName}
          recipeMap={allRecipes}
          onChange={handleRecipe}
        />

        {recipeName && <RecipeInfo recipe={allRecipes[recipeName]}/>}

        <IngredientSelector
          selectedIngredients={selectedIngredients}
          ingredients={ingredients}
          onChange={handleIngredients}
        />

        {recipeName &&(<RarityDistribution recipe={allRecipes[recipeName]} selectedIngredients={selectedIngredients}/>)}
      
        <StartActionController
          hasLimit={limit}
          onChangeLimit={handleLimit}
          iterations={iterations}
          onChangeIterations={handleIterations}
          startDisabled={selectedIngredients.filter((value) => value !== "").length < 1}
          onClickStart={handleStart}
        />

      </Box>
    </Container>
  );
};

export default CraftingOverview;
