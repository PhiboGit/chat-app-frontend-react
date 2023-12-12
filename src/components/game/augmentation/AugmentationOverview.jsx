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

const AugmentationOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const [profession, setProfession] = useState('');
  const [allRecipes, setAllRecipes] = useState({});
  const [recipe, setRecipe] = useState('');
  const [upgrades, setUpgrades] = useState([]);
  const [selectedUpgrades, setSelectedUpgrades] = useState([]);

  const handleProfession = (event) => {
    const newProfession = event.target.value;

    // Reset recipe and ingredients when the profession changes
    setProfession(newProfession);
    setRecipe('');
    setUpgrades([]);
    setSelectedUpgrades([]);
    setAllRecipes(Object.fromEntries(
      Object.entries(gameData.recipesData[newProfession]).filter(([key, value]) => value.upgrades.length > 0)
    ))
  };

  const handleRecipe = (event) => {
    const newRecipe = event.target.value;

    // Set the selected recipe and its ingredients
    setRecipe(newRecipe);
    setUpgrades(allRecipes[newRecipe]?.upgrades || []);
    setSelectedUpgrades(allRecipes[newRecipe]?.upgrades.map((value) => value.required ? value.slot[0].resource : "") || [] );
  };

  const handleUpgrades = (event, index) => {
    const newSelectedUpgrades = [...selectedUpgrades];
    newSelectedUpgrades[index] = event.target.value;
    console.log("selected Upgrades: ", newSelectedUpgrades);
    setSelectedUpgrades(newSelectedUpgrades);
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
    const upgrading = {
      "type": "action",
      "actionType": profession,
      "task": "upgrading",
      "limit": limit,
      "iterations": parseInt(iterations),
      "args": {
          "recipe": recipe,
          "upgrades": selectedUpgrades.filter((value) => value !== "")
      }
    }
    console.log("crafting: ", upgrading);
    send(upgrading)
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
            <MenuItem value={'toolsmith'}>Toolsmith</MenuItem>
            <MenuItem value={'woodworking'}>Woodworking</MenuItem>
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
        <p>Required Augments:</p>
        {upgrades.map((value, index) => (
          
          <FormControl key={index} sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="ingredient-label">Ingredient</InputLabel>
          <Select
            labelId="ingredient-label"
            id="ingredient"
            value={selectedUpgrades[index] || (value.required ? value.slot[0].resource : "")}
            label="Ingredient"
            onChange={(event) => handleUpgrades(event, index)}
          >
            {!value.required && (
              <MenuItem value="">
                empty
              </MenuItem>
            )}
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
        <Button disabled={selectedUpgrades.filter((value) => value !== "").length < 1} onClick={handleStart} variant="contained">Start</Button>
      </div>
    </div>
  );
};

export default AugmentationOverview;
