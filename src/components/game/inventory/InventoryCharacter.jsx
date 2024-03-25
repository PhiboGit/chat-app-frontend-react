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
import { useCharacterStore } from '../dataProviders/CharacterProvider';


const CharacterInfoDisplay = ({displayName, selector}) => {
  const [value] = useCharacterStore(selector)
  return(
    <Typography>
      {displayName}: {value}
    </Typography>
  )
}

const InventoryCharacter = () => {
  return (
    <Box>
      <CharacterInfoDisplay displayName={"Character"} selector={(char) => char.characterName}/>
      <CharacterInfoDisplay displayName={"Level"} selector={(char) => char.level}/>
      <CharacterInfoDisplay displayName={"Exp"} selector={(char) => char.exp}/>
      <CharacterInfoDisplay displayName={"Gold"} selector={(char) => char.currency.gold}/>
    </Box>
  );
};

export default InventoryCharacter;