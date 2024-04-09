import React, { useContext } from 'react'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import Icon from '@mui/material/Icon';

import {getSvg ,getRarityColor} from './icons/iconUtils';
import { GameDataContext } from '../dataProviders/GameDataProvider';


export default function ResourceIconChip({name}) {
  const {gameData} = useContext(GameDataContext);
  const info = gameData.resourcesInfo[name]

  const IconComponent = () => (
    <Icon fontSize='small'> 
      <img src={getSvg(svgIconName)} />    
    </Icon>
  )

  return (
    <Chip size='small' icon={<IconComponent/>} label={info.displayName} variant='outlined'/>
  );
}