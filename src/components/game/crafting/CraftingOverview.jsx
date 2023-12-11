import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import ExpBar from '../ExpBar';

import CarpenterIcon from '@mui/icons-material/Carpenter';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CraftingOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const [profession, setProfession] = useState('');
  const [allRecipes, setAllRecipes] = useState({});
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleProfession = (event) => {
    const newProfession = event.target.value;

    // Reset recipe and ingredients when the profession changes
    setProfession(newProfession);
    setRecipe('');
    setIngredients([]);
    setSelectedIngredients([]);
    setAllRecipes(gameData.recipesData[newProfession]);
  };

  const handleRecipe = (event) => {
    const newRecipe = event.target.value;

    // Set the selected recipe and its ingredients
    setRecipe(newRecipe);
    setIngredients(allRecipes[newRecipe]?.ingredients || []);
    setSelectedIngredients(allRecipes[newRecipe]?.ingredients.map((value) => value.required ? value.slot[0].resource : "") || [] );
  };

  const handleIngredients = (event, index) => {
    const newSelectedIngredients = [...selectedIngredients];
    newSelectedIngredients[index] = event.target.value;
    console.log("selected Ingredients: ", selectedIngredients);
    setSelectedIngredients(newSelectedIngredients);
  };
  
  function handleStart(){
    const crafting = {
      "type": "action",
      "actionType": profession,
      "task": "crafting",
      "limit": false,
      "iterations": 100,
      "args": {
          "recipe": recipe,
          "ingredients": selectedIngredients.filter((value) => value !== "")
      }
    }
    console.log("crafting: ", crafting);
  }

  return (
    <div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="profession-label">Profession</InputLabel>
          <Select
            labelId="profession-label"
            id="profession"
            value={profession}
            label="Profession"
            onChange={handleProfession}
          >
            <MenuItem value={'woodworking'}>Woodworking</MenuItem>
            <MenuItem value={'smelting'}>Smelting</MenuItem>
            <MenuItem value={'weaving'}>Weaving</MenuItem>
            <MenuItem value={'toolsmith'}>Toolsmith</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="recipe-label">Recipe</InputLabel>
          <Select
            labelId="recipe-label"
            id="recipe"
            value={recipe}
            label="Recipe"
            onChange={handleRecipe}
          >
            {Object.keys(allRecipes).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <p>Required Ingredients:</p>
        {ingredients.map((value, index) => (
          
          <FormControl key={index} sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="ingredient-label">Ingredient</InputLabel>
          <Select
            labelId="ingredient-label"
            id="ingredient"
            value={selectedIngredients[index] || (value.required ? value.slot[0].resource : "")}
            label="Ingredient"
            onChange={(event) => handleIngredients(event, index)}
          >
            {value.slot.map((value, index) => (
              <MenuItem key={index} value={value.resource}>
                {value.resource} - {value.amount}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        ))}
      </div>
      <Button onClick={handleStart} variant="contained">Start</Button>
    </div>
  );
};

export default CraftingOverview;
