import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import ProfessionSelector from '../gameComponents/ProfessionSelector';
import RecipeSelector from '../gameComponents/RecipeSelector';
import RecipeInfo from '../gameComponents/RecipeInfo';
import IngredientSelector from '../gameComponents/IngredientSelector';
import StartActionController from '../gameComponents/StartActionController';


const AugmentationOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const [profession, setProfession] = useState('');
  const [allRecipes, setAllRecipes] = useState({});
  const [recipeName, setRecipe] = useState('');
  const [upgrades, setUpgrades] = useState([]);
  const [selectedUpgrades, setSelectedUpgrades] = useState([]);

  const [limit, setLimit] = React.useState(true);
  const [iterations, setIterations] = useState(1);
  
  function init(){
    const selectedProfession = 'toolsmith'

    setProfession(selectedProfession)
    setRecipe('');
    setUpgrades([]);
    setSelectedUpgrades([]);
    setAllRecipes(Object.fromEntries(
      Object.entries(gameData.recipesData[selectedProfession]).filter(([key, value]) => value.upgrades.length > 0)
    ))
  } 
  
  useEffect(() => {
    init();
  }, []);


  const handleProfession = (newProfession) => {
    console.log('selected Profession', newProfession)
    setProfession(newProfession);
    // Reset recipe and ingredients when the profession changes
    setRecipe('');
    setUpgrades([]);
    setSelectedUpgrades([]);
    setAllRecipes(Object.fromEntries(
      Object.entries(gameData.recipesData[newProfession]).filter(([key, value]) => value.upgrades.length > 0)
    ));
  };

  const handleRecipe = (newRecipeName) => {
    console.log("selected Recipe: ", newRecipeName)
    setRecipe(newRecipeName);
    // find the ingredients
    const recipeIngredients = allRecipes[newRecipeName]?.upgrades || []
    setUpgrades(recipeIngredients);
    // and pre-select the ingredient
    const newSelectedIngredients = recipeIngredients.map((value) => value.required ? value.slot[0].resource : "")
    setSelectedUpgrades(newSelectedIngredients);
    console.log("selected Ingredients: ", newSelectedIngredients)
  };

  const handleUpgrades = (ingredientName, slotIndex) => {
    const newSelectedIngredients = [...selectedUpgrades];
    newSelectedIngredients[slotIndex] = ingredientName
    console.log("selected Ingredients: ", newSelectedIngredients);
    setSelectedUpgrades(newSelectedIngredients);
  };

  const handleLimit = (checked) => {
    console.log('limit', checked);
    setLimit(checked);
    setIterations(1);
  };

  const handleIterations = (number) => {
    setIterations(number)
  }
  
  function handleStart(){
    const upgrading = {
      "type": "action",
      "actionType": profession,
      "task": "upgrading",
      "limit": limit,
      "iterations": parseInt(iterations),
      "args": {
          "recipe": recipeName,
          "upgrades": selectedUpgrades.filter((value) => value !== "")
      }
    }
    console.log("crafting: ", upgrading);
    send(upgrading)
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
          selectedIngredients={selectedUpgrades}
          ingredients={upgrades}
          onChange={handleUpgrades}
        />
      
        <StartActionController
          hasLimit={limit}
          onChangeLimit={handleLimit}
          iterations={iterations}
          onChangeIterations={handleIterations}
          startDisabled={selectedUpgrades.filter((value) => value !== "").length < 1}
          onClickStart={handleStart}
        />
      </Box>
    </Container>
  );
};

export default AugmentationOverview;
