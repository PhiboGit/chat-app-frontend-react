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


const ItemIcon = ({ item, onClick, equippable }) => {
  const { gameData, send } = useContext(GameDataContext);

  const [isHovered, setIsHovered] = useState(false);

  
  const rarity = item.rarity
  const borderColor = rarity ? getRarityColor(rarity) : 'transparent';

  const paperStyle = {
    position: 'relative',
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s ease', // Adjust the transition property
    cursor: 'pointer',
    border: `4px solid ${borderColor}`, // Border style based on rarity
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
    console.log("Clicked Item!")
    if(onClick){
      onClick(event);
      return
    } 
  }


  const title = (item) => {
    if (item.type === "tool" && item.skills.some(skill => ["woodcutting", "mining", "harvesting"].includes(skill))) {
      return <TooltipTitleGatheringTool item={item}/>
    } else if (["head", "chest", "hands", "legs", "feet"].includes(item.type)) {
      return <TooltipTitleArmor item={item}/>
    }
  }

  return (
    <HtmlTooltip
      placement="top"
      title={ title(item) }
      >
      <Paper
        style={paperStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={handleClick}
      >
        <div style={overlayStyle}/>
        
        <Icon style={{ width: '100%', height: '100%' }}>
          <img src={getIcon(item.name)} />
        </Icon>
        
        {item.enchantingLevel >0 && <div style={enchantingStyle}>+{item.enchantingLevel}</div>}
      </Paper>    
    </HtmlTooltip>
  );
};

export default ItemIcon;