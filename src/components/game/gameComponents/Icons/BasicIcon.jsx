import React, { useState } from 'react';
import Paper from '@mui/material/Paper'

import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import BlockIcon from '@mui/icons-material/Block';



const getIcon = (iconName) => {
  switch (iconName) {
    case 'null': return BlockIcon
    default:
      return HelpCenterIcon
  }
}

const BasicIcon = ({ iconName, onClick  }) => {
  const [backgroundColor, setBackgroundColor] = useState('white');

  const paperStyle = {
    width: 60,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    backgroundColor: backgroundColor,
  };

  const handleHover = () => {
    setBackgroundColor('lightgray');
  };

  const handleLeave = () => {
    setBackgroundColor('white');
  };

  const IconComponent = () => {
    return getIcon(iconName)
  }

  return (
    <Paper
      style={paperStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      
      <IconComponent style={{ width: '100%', height: '100%' }} />
      
    </Paper>
  );
};

export default BasicIcon;
