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
import RandomSvg from '../../../assets/svg/random.svg'


const iconMappings = {
  'ore': OreSvg,
  'wood': LogSvg,
  'plank': PlankSvg,
  'coal':RockSvg,
  'fiber': FlaxSvg,
  'linen': ClothSvg,
  'ingot': IngotSvg,

  'pickaxe': PickaxeSvg
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

const getRarityColor = (rarity) => {
  switch (rarity) {
    case 'common':
      return '#b0b0b0';
    case 'uncommon':
      return '#4caf50';
    case 'rare':
      return '#2196f3';
    case 'epic':
      return '#ff9800';
    case 'legendary':
      return '#ff5722';
    default:
      return 'rgba(0, 0, 0, 0.87)';
  }
};

const CustomChip = ({rarity, tier}) => {
  return (
    <Stack direction="row" spacing={1}>
      {/* Small Chip with custom color */}
      {tier && <Chip label={`T${tier}`} size="small" style={{ backgroundColor: 'rgba(220, 220, 220, 1)',  color: 'black', }} />}
      {rarity && <Chip label={rarity} size="small" style={{ backgroundColor: getRarityColor(rarity),  color: 'white', }} />}

    </Stack>
  );
};

const ResourceTitle = ({name, amount}) => {
  const matchResult = name.match(/^(.*?)(T(\d))?(_(.*))?$/);
   // "woodT1_common"
   //matchResult[0] "woodT1_common"
   //matchResult[1] "wood"
   //matchResult[2] "T1"
   //matchResult[3] "1"
   //matchResult[4] "_common"
   //matchResult[5] "common"

  const resourceName = matchResult[1]
  const tier = parseInt(matchResult[3]) ? parseInt(matchResult[3]) : undefined
  const rarity = matchResult[5]

  return (
    <React.Fragment>
      <Typography color="inherit">{resourceName}</Typography>
      {amount && <b>Amount: {amount}</b>} 
      <CustomChip rarity={rarity} tier={tier}/>
      <hr/>
      <u>{'amazing content'}</u>.
      {"It's very engaging. Right?"}
    </React.Fragment>
  )
}

const ResourceIcon = ({ amount, name }) => {
  const [isHovered, setIsHovered] = useState(false);

  const paperStyle = {
    position: 'relative',
    width: 50,
    height: 50,
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

  const valueStyle = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '2px 4px',
    borderRadius: '4px',
    fontSize: '12px',
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <HtmlTooltip
      placement="top"
      title={
        <ResourceTitle name={name} amount={amount}/>
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
            <img src={getIcon(name)} />
          </Icon>
        </div>
        {amount && <div style={valueStyle}>{amount}</div>}
      </Paper>
        
    </HtmlTooltip>
  );
};

export default ResourceIcon;