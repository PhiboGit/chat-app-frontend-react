import React, { useContext, useEffect, useState, useMemo } from 'react';

import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { GameDataContext } from '../dataProviders/GameDataProvider';
import ResourceIcon from './icons/ResourceIcon';
import BasicIcon from './icons/BasicIcon';
import ResourceIconChip from './ResourceIconChip';


const IngredientSelector = ({ recipeName, selectedIngredients, setSelectedIngredients}) => {
  const { gameData } = useContext(GameDataContext);
  const infoDict = gameData.resourcesInfo
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
      >
        {ingredients.map((ingredientSlot, slotIndex) => (
          <FormControl key={slotIndex} sx={{ margin: 1, minWidth: 80 }}>
            <InputLabel >Ingredient</InputLabel>
            <Select
              value={selectedIngredients[slotIndex]}
              label="Ingredient"
              onChange={(event) => onChangeIngredient(event.target.value, slotIndex)}
            >
              {!ingredientSlot.required && 
                <MenuItem key={"empty"} value={"null"}>
                  <BasicIcon iconName={"null"}/>
                  <Typography> Empty </Typography>
                </MenuItem>}
              {ingredientSlot.slot.map((ingredient, index) => (
                <MenuItem key={index} value={ingredient.resource}>
                  <ResourceIcon amount={ingredient.amount} name={ingredient.resource}/>
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