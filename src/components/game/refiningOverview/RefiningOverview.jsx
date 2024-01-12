import React, { Fragment, useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import ExpBar from '../ExpBar';
import Container from '@mui/material/Container';
import CarpenterIcon from '@mui/icons-material/Carpenter';

import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel'
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import { ClickAwayListener } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ResourceIcon from '../gameComponents/icons/ResourceIcon';
import RecipeIcon from '../gameComponents/icons/RecipeIcon';

import ClickAwayPopper from '../../common/ClickAwayPopper'
import ProfessionSelector from './ProfessionSelector';
import RecipeSelector from './RecipeSelector';
import RecipeInfo from './RecipeInfo';

const RefiningOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const refiningRecipes = gameData.refiningRecipes

  const [profession, setProfession] = useState('');
  const [allRecipes, setAllRecipes] = useState({});
  const [recipeName, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleProfession = (event) => {
    const newProfession = event.target.value;

    // Reset recipe and ingredients when the profession changes
    setProfession(newProfession);
    setRecipe('');
    setIngredients([]);
    setSelectedIngredients([]);
    setAllRecipes(refiningRecipes[newProfession]);
  };

  const handleRecipe = (eventOrRecipeName) => {
    let newRecipe
    // Check if it's an event (coming from the Select component)
    if (eventOrRecipeName instanceof Event) {
      newRecipe = eventOrRecipeName.target.value;
      setRecipe(newRecipe);
    } else {
      // It's a recipe name (coming from the ResourceIcon)
      newRecipe = eventOrRecipeName
      setRecipe(eventOrRecipeName);
    }
    setIngredients(allRecipes[newRecipe]?.ingredients || []);
    setSelectedIngredients(allRecipes[newRecipe]?.ingredients.map((value) => value.required ? value.slot[0].resource : "") || [] );
  };

  const handleIngredients = (event, index) => {
    const newSelectedIngredients = [...selectedIngredients];
    newSelectedIngredients[index] = event.target.value;
    console.log("selected Ingredients: ", newSelectedIngredients);
    setSelectedIngredients(newSelectedIngredients);
  };

  function init(){
    const selectedProfession = 'woodworking'

    setProfession(selectedProfession)
    setRecipe('');
    setIngredients([]);
    setSelectedIngredients([]);
    setAllRecipes(refiningRecipes[selectedProfession]);
  } 
  
  useEffect(() => {
    init();
  }, []);

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
          professions={['woodworking', 'smelting', 'weaving']}
          selectedProfession={profession}
          onChange={handleProfession} 
        />
        <RecipeSelector
          selectedRecipeName={recipeName}
          recipeMap={allRecipes}
          onChange={handleRecipe}
        />

      {recipeName && <RecipeInfo recipe={allRecipes[recipeName]}/>}

      <Container maxWidth="xs">
        <Box 
          display="flex"
          flexDirection='column'
          alignItems="center"
          sx={{ bgcolor: 'rgba(135, 168, 185, 0.8)'}}
        >
          <p>Required Ingredients:</p>
          <Box 
          display="flex"
          flexDirection='row'
          alignItems="center"
          sx={{ bgcolor: 'rgba(135, 168, 185, 0.8)'}}
        >
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
          </Box>
        </Box>
      </Container>
      <Container maxWidth="xs">
        <Box 
            display="flex"
            flexDirection='column'
            alignItems="center"
            sx={{ bgcolor: 'rgba(91, 91, 91, 0.8)'}}
          >
            <FormControlLabel control={<Switch checked={limit} onChange={handleLimit}/>} label="Limit" />
          
          {limit && (<TextField
            label="Iterations"
            id="outlined-size-small"
            defaultValue= {iterations}
            size="small"
            onChange={handleIterations}
          />)}
          <Button disabled={selectedIngredients.filter((value) => value !== "").length < 1} onClick={handleStart} variant="contained">Start</Button>
        </Box>
      </Container>
      </Box>
    </Container>
  );
};

export default RefiningOverview;
