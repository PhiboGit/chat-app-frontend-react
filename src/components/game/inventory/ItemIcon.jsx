import React, { useContext, useState, useMemo } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Icon from '@mui/material/Icon';

import { GameDataContext } from '../dataProviders/GameDataProvider';
import HtmlTooltip from '../../common/HtmlToolTip';
import TooltipTitleGatheringTool from '../gameComponents/TooltipTitleGatheringTool';
import TooltipTitleArmor from '../gameComponents/TooltipTitleArmor';
import getIcon from '../gameComponents/Icons/iconSvgMapping';
import ClickableIcon from '../gameComponents/Icons/ClickableIcon';


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


const ItemIcon = ({ item, onClick }) => {
  const rarity = item.rarity
  const borderColor = rarity ? getRarityColor(rarity) : 'transparent';

  const title = (item) => {
    if (item.type === "tool" && item.skills.some(skill => ["woodcutting", "mining", "harvesting"].includes(skill))) {
      return <TooltipTitleGatheringTool item={item}/>
    } else if (["head", "chest", "hands", "legs", "feet"].includes(item.type)) {
      return <TooltipTitleArmor item={item}/>
    }
  }

  const IconComponent = () => (
    <Icon style={{ width: '100%', height: '100%' }}>
      <img src={getIcon(item.name)} />
    </Icon>
  )

  return (
    <ClickableIcon 
      icon={IconComponent} 
      onClick={onClick} 
      tooltipTitle={title(item)}
      borderColor={borderColor}
      topLeftText={item.enchantingLevel >0 ? `+${item.enchantingLevel}` : ''}
    />
  );
};

export default ItemIcon;