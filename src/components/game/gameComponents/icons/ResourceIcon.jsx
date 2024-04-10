import React, { useContext } from 'react';

import { GameDataContext } from '../../dataProviders/GameDataProvider';

import Icon from '@mui/material/Icon';
import TooltipTitleResource from '../tooltips/TooltipTitleResource';
import ClickableIcon from './ClickableIcon';
import {getRarityColor} from './iconUtils';
import CustomSvgIcon from './CustomSvgIcon';

const ResourceIcon = ({ amount, name , onClick}) => {
  const { gameData, send } = useContext(GameDataContext);
  const info = gameData.resourcesInfo[name]

  const rarity = info.rarity
  const borderColor = rarity ? getRarityColor(rarity) : 'transparent';
  const IconComponent = CustomSvgIcon(name)

  return (
    <ClickableIcon 
      icon={IconComponent} 
      onClick={onClick} 
      tooltipTitle={<TooltipTitleResource name={name} amount={amount}/>}
      borderColor={borderColor}
      bottomRightText={amount}
    />
  );
};

export default ResourceIcon;