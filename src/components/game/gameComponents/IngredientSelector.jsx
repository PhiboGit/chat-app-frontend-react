import React from 'react';

import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';



const IngredientSelector = ({selectedIngredients, ingredients, onChange}) => {

  const onChangeIngredient = (ingredientName, ingredientSlotIndex) => {

    onChange(ingredientName, ingredientSlotIndex)
  }

  return (
    <Container maxWidth="xs">
        <Box 
          display="flex"
          flexDirection='column'
          alignItems="center"
          sx={{ bgcolor: 'rgba(135, 168, 185, 0.8)'}}
        >
          <Box 
          display="flex"
          flexDirection='row'
          alignItems="center"
          sx={{ bgcolor: 'rgba(135, 168, 185, 0.8)'}}
        >
          {ingredients.map((ingredientSlot, slotIndex) => (
            
          <FormControl key={slotIndex} sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="ingredient-label">Ingredient</InputLabel>
            <Select
              labelId="ingredient-label"
              id="ingredient"
              value={selectedIngredients[slotIndex] || (ingredientSlot.required ? ingredientSlot.slot[0].resource : "")}
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
        </Box>
      </Container>
  )
}

export default IngredientSelector