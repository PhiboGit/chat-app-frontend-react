import React, { useContext, useState, useMemo } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import ResourceIcon from '../gameComponents/icons/ResourceIcon';
import { Button, Container, Typography } from '@mui/material';
import ClickAwayPopper from '../../common/ClickAwayPopper';
import ItemActionMenu from './ItemActionMenu';
import ItemIcon from '../gameComponents/icons/ItemIcon';
import ResourceActionMenu from './ResourceActionMenu';


const InventoryCharacter = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  return (
    <Box>
    <Typography>
      {characterData.characterName} 
      <br />
      Level: {characterData.level}
      <br />
      Gold: {characterData.currency.gold}
    </Typography>
    </Box>
  );
};

export default InventoryCharacter;