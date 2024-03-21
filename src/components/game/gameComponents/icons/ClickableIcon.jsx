import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import HtmlTooltip from '../../../common/HtmlToolTip';
import { styled } from '@mui/material';

const StyledPaper = styled (Paper)(({bordercolor}) => ({
  position: 'relative',
  width:  50,
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `4px solid ${bordercolor || "black"}`,
  '&:hover': {
    cursor: 'pointer',
    zIndex: 2,
    border: '4px solid pink',
    backgroundColor: 'rgba(169, 169, 169, 0.4)', // Light gray with 0.3 opacity
    opacity: 1, // Show overlay on hover
    transition: 'opacity 0.3s ease', // Adjust the transition property
  }
}));

const ClickableIcon = ({ icon:IconComponent, onClick, tooltipTitle, borderColor, bottomRightText, topLeftText }) => {

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
      <StyledPaper
        bordercolor={borderColor}
        onClick={handleClick}
      >
        <IconComponent/>
        {bottomRightText && <div style={bottomRightTextStyle}>{bottomRightText}</div>}
        {topLeftText && <div style={topLeftTextStyle}>{topLeftText}</div>}
      </StyledPaper>
    </HtmlTooltip>
  );
};

export default ClickableIcon;
