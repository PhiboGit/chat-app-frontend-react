import React from 'react';

import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';

import TooltipTitleRecipe from '../tooltips/TooltipTitleRecipe';
import ClickableIcon from './ClickableIcon';
import getIcon from './iconSvgMapping';

const RecipeIcon = ({disableTitle, recipe, onClick}) => {

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