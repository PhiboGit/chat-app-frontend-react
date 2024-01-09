import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import HtmlTooltip from '../../../common/HtmlToolTip';


const ClickableIcon = ({ icon:IconComponent, onClick, tooltipTitle, borderColor, bottomRightText, topLeftText }) => {
  const [isHovered, setIsHovered] = useState(false)

  const paperStyle = {
    position: 'relative',
    width:  50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s ease', // Adjust the transition property
    cursor: 'pointer',
    border: `4px solid ${borderColor || "black"}`, // Border style based on rarity
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

  const topLeftTextStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '2px 4px',
    borderRadius: '4px',
    fontSize: '12px',
  };

  const bottomRightTextStyle = {
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

  const handleClick = (event) => {
    console.log(`Clicked Icon!`);
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <HtmlTooltip
      placement="top"
      title={ tooltipTitle }
      >
      <Paper
        style={paperStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={handleClick}
      >
        <div style={overlayStyle}/>
        <IconComponent style={{ width: '100%', height: '100%' }}/>
        {bottomRightText && <div style={bottomRightTextStyle}>{bottomRightText}</div>}
        {topLeftText && <div style={topLeftTextStyle}>{topLeftText}</div>}
      </Paper>
    </HtmlTooltip>
  );
};

export default ClickableIcon;
