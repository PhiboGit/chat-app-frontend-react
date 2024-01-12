import React, { Fragment, useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import ProfessionSelector from '../gameComponents/ProfessionSelector';
import RecipeSelector from '../gameComponents/RecipeSelector';
import RecipeInfo from '../gameComponents/RecipeInfo';
import IngredientSelector from '../gameComponents/IngredientSelector';
import StartActionController from '../gameComponents/StartActionController';

import adjustWeights from './Wheights';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import RarityDistribution from './RarityDistribution';

const CraftingOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

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
    setAllRecipes(gameData.recipesData[newProfession]);
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

  const [rarityWeights, setRarityWeights] = useState([0,0,0,0,0])

  useEffect(() => {
    if (selectedIngredients.length > 0){
      calculateRarityWeights();
    }
  }, [selectedIngredients]);

  function calculateRarityWeights() {
    const skillLevel = characterData.skills[profession].level
    const itemLevel = allRecipes[recipeName].level
    const table = gameData.craftingTable.equipments

    const rarityWeights = table.rarityWeights
    const defaultWindow = table.defaultWindow

    let startBonus = 0
    let endBonus = 0
    
    for (const selectedItem of selectedIngredients) {
      const item = gameData.craftingMaterials[selectedItem]
      if (!item) continue
      if (item["craftingBonus"]){
        startBonus += item["craftingBonus"]
      }
    }
  
    let startWindow = defaultWindow[0] + (skillLevel * table.professionLevel.start) + (itemLevel * table.itemLevel.start) + startBonus
    let endWindow = defaultWindow[1] + (skillLevel * table.professionLevel.end) + (itemLevel * table.itemLevel.end) + endBonus

    const weights = adjustWeights(rarityWeights, startWindow, endWindow)

    console.log("Weights: ", weights)
    setRarityWeights(weights)
  }

  function init(){
    const selectedProfession = 'toolsmith'

    setProfession(selectedProfession)
    setRecipe('');
    setIngredients([]);
    setSelectedIngredients([]);
    setAllRecipes(gameData.recipesData[selectedProfession]);
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

        {recipeName &&(<Container maxWidth="xs">
          <Box 
            display="flex"
            flexDirection='column'
            alignItems="center"
            sx={{ bgcolor: 'rgba(91, 91, 200, 0.8)'}}>
            <h3>Rarity chances:</h3>
            <RarityDistribution values={rarityWeights} />
          </Box>
        </Container>)}
      
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
