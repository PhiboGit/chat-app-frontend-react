import React from 'react';

import Box from '@mui/material/Box';


import { Typography } from '@mui/material';
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