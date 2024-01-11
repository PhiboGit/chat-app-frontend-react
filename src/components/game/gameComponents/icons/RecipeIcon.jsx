import React, { useContext, useState, useMemo } from 'react';
import { CharacterDataContext } from '../../dataProviders/CharacterDataProvider';
import { GameDataContext } from '../../dataProviders/GameDataProvider';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Icon from '@mui/material/Icon';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


import getIcon from './iconSvgMapping';
import TooltipTitleRecipe from '../tooltips/TooltipTitleRecipe';
import ClickableIcon from './ClickableIcon';


const getRarityColor = (rarity) => {
  switch (rarity) {
    case 'common':
      return '#b0b0b0';
    case 'uncommon':
      return '#4caf50';
    case 'rare':
      return '#2196f3';
    case 'epic':
      return '#ff9800';
    case 'legendary':
      return '#ff5722';
    default:
      return 'rgba(0, 0, 0, 0.87)';
  }
};



const RecipeIcon = ({disableTitle, recipe, onClick}) => {
  const { gameData } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const IconComponent = () => (
    <Icon style={{ width: '100%', height: '100%' }}>
      <img src={getIcon(recipe ? recipe.name : "scroll")} />
    </Icon>
  )

  return (
    <ClickableIcon 
      icon={IconComponent} 
      onClick={onClick} 
      tooltipTitle={!disableTitle ? 
        <TooltipTitleRecipe recipe={recipe}/> 
        : <React.Fragment><Typography>{"Select Recipe!"}</Typography></React.Fragment>}
    />
  );
};

export default RecipeIcon;