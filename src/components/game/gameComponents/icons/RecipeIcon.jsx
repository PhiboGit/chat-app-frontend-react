import React from 'react';

import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';

import TooltipTitleRecipe from '../tooltips/TooltipTitleRecipe';
import ClickableIcon from './ClickableIcon';
import CustomSvgIcon from './CustomSvgIcon';

const RecipeIcon = ({disableTitle, recipe, onClick}) => {

  const IconComponent = () => CustomSvgIcon(recipe ? recipe.name : "scroll")

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