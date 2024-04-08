import React, { useContext, useEffect, useState, useMemo } from 'react';

import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { GameDataContext } from '../dataProviders/GameDataProvider';
import { IntegrationInstructions } from '@mui/icons-material';


const IngredientSelector = ({ recipeName, profession, selectedIngredients, setSelectedIngredients}) => {
  const { gameData } = useContext(GameDataContext);

  const ingredients = gameData.recipesData[recipeName].ingredients

  const onChangeIngredient = (ingredientName, ingredientSlotIndex) => {
    const newSelectedIngredients = [...selectedIngredients];
    newSelectedIngredients[ingredientSlotIndex] = ingredientName
    console.log("selected Ingredients: ", newSelectedIngredients);
    setSelectedIngredients(newSelectedIngredients)
  }

  return (
    <Container maxWidth="xs">
      <Box 
        display="flex"
        flexDirection='row'
        justifyContent={"center"}
        sx={{ bgcolor: 'rgba(135, 168, 185, 0.8)'}}
      >
        {ingredients.map((ingredientSlot, slotIndex) => (
          <FormControl key={slotIndex} sx={{ m: 1, minWidth: 80 }}>
            <InputLabel >Ingredient</InputLabel>
            <Select
              value={selectedIngredients[slotIndex]}
              label="Ingredient"
              onChange={(event) => onChangeIngredient(event.target.value, slotIndex)}
            >
              {!ingredientSlot.required && 
                <MenuItem key={"empty"} value={""}>
                  empty
                </MenuItem>}
              {ingredientSlot.slot.map((ingredient, index) => (
                <MenuItem key={index} value={ingredient.resource}>
                  {ingredient.amount}   {ingredient.resource}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
      </Box>
    </Container>
  )
}

export default IngredientSelector