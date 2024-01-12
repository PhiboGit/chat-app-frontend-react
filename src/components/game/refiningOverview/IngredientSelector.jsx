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