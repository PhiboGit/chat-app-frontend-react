import React, { useContext } from 'react';

import { GameDataContext } from '../../dataProviders/GameDataProvider';

import Icon from '@mui/material/Icon';
import TooltipTitleResource from '../tooltips/TooltipTitleResource';
import ClickableIcon from './ClickableIcon';
import getIcon from './iconSvgMapping';

const getRarityColor = (rarity) => {
  switch (rarity) {
    case 'common':
      return '#b0b0b0';
    case 'uncommon':
      return '#4caf50';
    case 'rare':
      return '#2196f3';
    case 'epic':
      return '#a335ee';
    case 'legendary':
      return '#ff9800';
    default:
      return 'rgba(0, 0, 0, 0.87)';
  }
};

const ResourceIcon = ({ amount, name , onClick}) => {
  const { gameData, send } = useContext(GameDataContext);
  const info = gameData.resourcesInfo[name]

  const rarity = info.rarity
  const borderColor = rarity ? getRarityColor(rarity) : 'transparent';


  const IconComponent = () => (
    <Icon sx={{width:'100%', height:'100%'}}>
      <img src={getIcon(name)} />
    </Icon>
  )

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