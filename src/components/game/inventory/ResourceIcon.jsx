import React, { useContext, useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Icon from '@mui/material/Icon';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import OreSvg from '../../../assets/svg/ore.svg'
import PlankSvg from '../../../assets/svg/wood-beam.svg'
import LogSvg from '../../../assets/svg/log.svg'
import RockSvg from '../../../assets/svg/rock.svg'
import FlaxSvg from '../../../assets/svg/flax.svg'
import ClothSvg from '../../../assets/svg/rolled-cloth.svg'
import IngotSvg from '../../../assets/svg/metal-bar.svg'

import PickaxeSvg from '../../../assets/svg/war-pick.svg'
import SickleSvg from '../../../assets/svg/sickle.svg'
import GlovesSvg from '../../../assets/svg/gloves.svg'
import BootsSvg from '../../../assets/svg/boots.svg'
import HatSvg from '../../../assets/svg/pointy-hat.svg'
import ShirtSvg from '../../../assets/svg/shirt.svg'
import PantsSvg from '../../../assets/svg/trousers.svg'
import AxeSvg from '../../../assets/svg/wood-axe.svg'
import RandomSvg from '../../../assets/svg/random.svg'
import ClickableIcon from '../gameComponents/Icons/ClickableIcon';
import TooltipTitleResource from '../gameComponents/TooltipTitleResource';


const iconMappings = {
  'ore': OreSvg,
  'wood': LogSvg,
  'plank': PlankSvg,
  'coal':RockSvg,
  'fiber': FlaxSvg,
  'linen': ClothSvg,
  'ingot': IngotSvg,

  'pickaxe': PickaxeSvg,
  'sickle': SickleSvg,
  'axe':AxeSvg,

  'hat': HatSvg,
  'chestpiece':ShirtSvg,
  'gloves':GlovesSvg,
  'pants':PantsSvg,
  'boots': BootsSvg
  // Add more mappings as needed
};

const getIcon = (resourceName) => {
  const icon = iconMappings[resourceName]
  if(icon){
    return icon
  }

  for (const key in iconMappings) {
    if (resourceName.startsWith(key)) {
      return iconMappings[key];
    }
  }

  return RandomSvg;
};

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
  const matchResult = name.match(/^(.*?)(T(\d))?(_(.*))?$/);
   // "woodT1_common"
   //matchResult[0] "woodT1_common"
   //matchResult[1] "wood"
   //matchResult[2] "T1"
   //matchResult[3] "1"
   //matchResult[4] "_common"
   //matchResult[5] "common"

  const rarity = matchResult[5]
  const borderColor = rarity ? getRarityColor(rarity) : 'transparent';


  const IconComponent = () => (
    <Icon style={{ width: '100%', height: '100%' }}>
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