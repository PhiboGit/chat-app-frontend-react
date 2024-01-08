import React, { useState } from 'react';
import Paper from '@mui/material/Paper'

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import BlockIcon from '@mui/icons-material/Block';



const getIcon = (iconName) => {
  switch (iconName) {
    case 'null': return BlockIcon
    default:
      return QuestionMarkIcon
  }
}

const BasicIcon = ({ iconName, onClick  }) => {
  const [backgroundColor, setBackgroundColor] = useState('white');

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
    border: `4px solid black`, // Border style rgba(0, 0, 0, 0.0)
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

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (event) => {
    console.log("Clicked BasicIcon!")
    if(onClick){
      onClick(event);
      return
    }
  }

  
  const IconComponent = getIcon(iconName);
  return (
    <Paper
      style={paperStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <div style={overlayStyle}/>
      <IconComponent style={{ width: '100%', height: '100%' }} />
      
    </Paper>
  );
};

export default BasicIcon;
