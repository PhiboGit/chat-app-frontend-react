import React, { useContext, useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Icon from '@mui/material/Icon';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import BaobabSvg from '../../../assets/svg/baobab.svg'
import BirchSvg from '../../../assets/svg/birch-trees.svg'
import BeechSvg from '../../../assets/svg/beech.svg'
import DeadTreeSvg from '../../../assets/svg/dead-wood.svg'
import HolyOakSvg from '../../../assets/svg/holy-oak.svg'
import OakSvg from '../../../assets/svg/oak.svg'
import PineSvg from '../../../assets/svg/pine-tree.svg'
import WillowSvg from '../../../assets/svg/willow-tree.svg'



import RandomSvg from '../../../assets/svg/random.svg'


const iconMappings = {
  'TreeT1': PineSvg,
  'TreeT2': BeechSvg,
  'TreeT3': BaobabSvg,
  'TreeT4': DeadTreeSvg,
  'TreeT5': WillowSvg
  
};

const getIcon = (gatheringData) => {
  const name = gatheringData.lootTable

  const icon = iconMappings[name]
  if(icon){
    return icon
  }

  return RandomSvg;
};

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));


const CustomChip = ({gatheringData}) => {
  return (
    <Stack direction="row" spacing={1}>
      {/* Small Chip with custom color */}
      

    </Stack>
  );
};

const ResourceTitle = ({ gatheringData }) => {
  
  

  return (
    <React.Fragment>
      <Typography color="inherit">{gatheringData.lootTable}</Typography>
      <CustomChip gatheringData={gatheringData}/>
      <hr/>
      <b>{`Level: ${gatheringData.level}`}</b>
      <br/>
      <b>{`Time: ${gatheringData.time}ms`}</b>
      <hr/>
      <b>{`${gatheringData.resourceName}: ${gatheringData.amountMin} - ${gatheringData.amountMax}`}</b>
      <br/>
      <b>{`Exp: ${gatheringData.exp}`}</b>
      <br/>
      <b>{`Exp Character: ${gatheringData.expChar}`}</b>
      
    </React.Fragment>
  )
}

const GatheringIcon = ({ gatheringData }) => {
  const [isHovered, setIsHovered] = useState(false);

  const paperStyle = {
    position: 'relative',
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s ease', // Adjust the transition property
    cursor: 'pointer',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(169, 169, 169, 0.4)', // Light gray with 0.3 opacity
    opacity: isHovered ? 1 : 0, // Show overlay on hover
    transition: 'opacity 0.3s ease', // Adjust the transition property
  };

  const iconStyle = {
    width: '100%',
    height: '100%',
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <HtmlTooltip
      placement="right"
      title={
        <ResourceTitle gatheringData={gatheringData}/>
      }
      >
      <Paper
        style={paperStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <div style={overlayStyle}></div>
        <div style={iconStyle}>
          <Icon style={{ width: '100%', height: '100%' }}>
            <img src={getIcon(gatheringData)} />
          </Icon>
        </div>
      </Paper>
        
    </HtmlTooltip>
  );
};

export default GatheringIcon;