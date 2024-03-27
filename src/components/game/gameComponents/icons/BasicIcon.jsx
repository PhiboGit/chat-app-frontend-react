import React from 'react';

import BlockIcon from '@mui/icons-material/Block';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Typography } from '@mui/material';
import ClickableIcon from './ClickableIcon';



const getIcon = (iconName) => {
  switch (iconName) {
    case 'null': return BlockIcon
    default:
      return QuestionMarkIcon
  }
}

const BasicIcon = ({ iconName, onClick  }) => {
  const IconComponent = getIcon(iconName);
  return (
    <ClickableIcon 
      icon={IconComponent} 
      onClick={onClick} 
      tooltipTitle={<React.Fragment><Typography>{iconName}</Typography></React.Fragment>}
      borderColor="black"
    />
  );
};

export default BasicIcon;
