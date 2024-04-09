import Icon from '@mui/material/Icon';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React, { useState, useContext } from 'react';
import CustomSvgIcon from './CustomSvgIcon';

import { GameDataContext } from '../../dataProviders/GameDataProvider';
import TooltipGatheringNode from '../tooltips/TooltipGatheringNode';
import HtmlTooltip from '../../../common/HtmlToolTip';

const StyledPaper = styled (Paper)(() => ({
  width:  50,
  height: 50,
  '&:hover': {
    cursor: 'pointer',
  },
}));

const GatheringIcon = ({ profession, tier, onClick, selected}) => {
  const { gameData } = useContext(GameDataContext);
  const nodeData = gameData.gatheringResourcesData[profession].tiers[tier -1]

  const handleClick = (event) => {
    if(onClick) onClick(event);
  }

  const IconComponent = () => CustomSvgIcon(nodeData.lootTable)

  return (
    <HtmlTooltip
      placement="top"
      title={
        <TooltipGatheringNode profession={profession} tier={tier}/>
      }
      >
      <StyledPaper
        elevation={selected? 0 : 6}
        sx={{ border: selected ? '2px solid white' : '2px solid black' }}
        onClick={handleClick}
      >
        <IconComponent/>
      </StyledPaper>
        
    </HtmlTooltip>
  );
};

export default GatheringIcon;