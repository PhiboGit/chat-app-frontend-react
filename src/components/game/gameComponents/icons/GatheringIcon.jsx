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
  padding: 5,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  width:  90,
  height: 90,
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'rgba(150, 150, 150, 0.4)'
  },
}));

const GatheringIcon = ({ profession, tier, onClick, selected}) => {
  const { gameData } = useContext(GameDataContext);
  const nodeData = gameData.gatheringResourcesData[profession].tiers[tier -1]

  const handleClick = (event) => {
    if(onClick) onClick(event);
  }

  const IconComponent = CustomSvgIcon(nodeData.lootTable)

  return (
    <HtmlTooltip
      placement="top"
      title={
        <TooltipGatheringNode profession={profession} tier={tier}/>
      }
      >
      <StyledPaper
        elevation={selected? 0 : 6}
        sx={{ boxShadow: selected ? 'inset 1px 1px 6px -1px black': undefined }} // undefined to use elevation
        onClick={handleClick}
      >
        <Typography fontSize={10} > {nodeData.displayName} </Typography>
        <IconComponent sx={{width: '75%', height: '75%'}}/>
      </StyledPaper>
        
    </HtmlTooltip>
  );
};

export default GatheringIcon;