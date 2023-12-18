import React, { useContext, useState, useMemo } from 'react';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Icon from '@mui/material/Icon';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


import PickaxeSvg from '../../../assets/svg/war-pick.svg'
import RandomSvg from '../../../assets/svg/random.svg'


const iconMappings = {
  'pickaxe': PickaxeSvg
  // Add more mappings as needed
};

const getIcon = (itemName) => {
  const icon = iconMappings[itemName]
  if(icon){
    return icon
  }

  for (const key in iconMappings) {
    if (itemName.startsWith(key)) {
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

const CustomChip = ({rarity, tier, soulbound}) => {
  return (
    <Stack direction="row" spacing={1}>
      {/* Small Chip with custom color */}
      {rarity && <Chip label={rarity} size="small" style={{ backgroundColor: getRarityColor(rarity),  color: 'white', }} />}
      {tier && <Chip label={`T${tier}`} size="small" style={{ backgroundColor: 'rgba(220, 220, 220, 1)',  color: 'black', }} />}
      {soulbound && <Chip label={`soulbound`} size="small" style={{ backgroundColor: 'red',  color: 'black', }} />}
      {!soulbound && <Chip label={`bind on equip`} size="small" style={{ backgroundColor: 'green',  color: 'black', }} />}

    </Stack>
  );
};

const ResourceTitle = ({ item }) => {
  
  return (
    <React.Fragment>
      <Typography color="inherit">{item.subtype}</Typography>
      {item.type}
      <CustomChip rarity={item.rarity} tier={item.tier} soulbound={item.soulbound} />
      <hr/>
      <b>{`Level: ${item.level}`}</b>
      <br/>
      <b>{`Enchanting: +${item.enchantingLevel}`}</b>
      <hr/>
      <b>{`Speed: ${item.properties.baseSpeed * 100}%`}</b>
      <br/>
      <b>{`SpeedBonus: ${item.properties.speedBonus * 100}%`}</b>
      <br/>
      <b>{`Exp: ${item.properties.expBonus * 100}%`}</b>
      <br/>
      <b>{`Luck: ${item.properties.luckBonus}`}</b>
      <br/>
      <b>{`Yield: ${item.properties.yieldMax }`}</b>
      <br/>
      
    </React.Fragment>
  )
}

const ItemIcon = ({ item, onClick }) => {
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

  const enchantingStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
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

  const handleClick = (event) => {
    if(onClick) onClick(event);
  }

  return (
    <HtmlTooltip
      placement="top"
      title={
        <ResourceTitle item={item}/>
      }
      >
      <Paper
        style={paperStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={handleClick}
      >
        <div style={overlayStyle}></div>
        <div style={iconStyle}>
          <Icon style={{ width: '100%', height: '100%' }}>
            <img src={getIcon(item.subtype)} />
          </Icon>
        </div>
        {item.enchantingLevel >0 && <div style={enchantingStyle}>+{item.enchantingLevel}</div>}
      </Paper>
        
    </HtmlTooltip>
  );
};

export default ItemIcon;