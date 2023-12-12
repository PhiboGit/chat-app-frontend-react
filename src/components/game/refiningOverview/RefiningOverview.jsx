import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import ExpBar from '../ExpBar';

import CarpenterIcon from '@mui/icons-material/Carpenter';

import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const RefiningOverview = () => {
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
    console.log("selected Ingredients: ", newSelectedIngredients);
    setSelectedIngredients(newSelectedIngredients);
  };

  const [limit, setLimit] = React.useState(true);

  const handleLimit = (event) => {
    setLimit(event.target.checked);
    if (event.target.checked) {
      setIterations(1);
    } else {
      setIterations(1);
    }
  };

  const [iterations, setIterations] = useState(1);
  const handleIterations = (event) => {
    setIterations(parseInt(event.target.value))
  }
  
  function handleStart(){
    const crafting = {
      "type": "action",
      "actionType": profession,
      "task": "crafting",
      "limit": limit,
      "iterations": parseInt(iterations),
      "args": {
          "recipe": recipe,
          "ingredients": selectedIngredients.filter((value) => value !== "")
      }
    }
    console.log("crafting: ", crafting);
    send(crafting)
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
                {value.amount}   {value.resource}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        ))}
      </div>
      <div>
        <Switch checked={limit} onChange={handleLimit} inputProps={{ 'aria-label': 'controlled' }}/>
        {limit && (<TextField
          label="Iterations"
          id="outlined-size-small"
          defaultValue= {iterations}
          size="small"
          onChange={handleIterations}
        />)}
        <Button disabled={selectedIngredients.filter((value) => value !== "").length < 1} onClick={handleStart} variant="contained">Start</Button>
      </div>
    </div>
  );
};

export default RefiningOverview;
