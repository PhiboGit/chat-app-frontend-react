import React from 'react';

import Icon from '@mui/material/Icon';

import TooltipTitleArmor from '../tooltips/TooltipTitleArmor';
import TooltipTitleGatheringTool from '../tooltips/TooltipTitleGatheringTool';
import ClickableIcon from './ClickableIcon';
import {getRarityColor} from './iconUtils';
import CustomSvgIcon from './CustomSvgIcon';



const ItemIcon = ({ item, onClick }) => {
  const rarity = item.rarity
  const borderColor = rarity ? getRarityColor(rarity) : 'transparent';

  const title = (item) => {
    if (item.equipmentType === "tool" && item.equipmentSkills.some(skill => ["woodcutting", "mining", "harvesting"].includes(skill))) {
      return <TooltipTitleGatheringTool item={item}/>
    } else if (["head", "chest", "hands", "legs", "feet"].includes(item.equipmentType)) {
      return <TooltipTitleArmor item={item}/>
    }
  }

  const IconComponent = CustomSvgIcon(item.name)

  return (
    <ClickableIcon 
      icon={IconComponent} 
      onClick={onClick} 
      tooltipTitle={title(item)}
      borderColor={borderColor}
      topLeftText={item.enchantingLevel >0 ? `+${item.enchantingLevel}` : ''}
      bottomRightText={`GS: ${item.properties.totalGearScore}`}
    />
  );
};

export default ItemIcon;