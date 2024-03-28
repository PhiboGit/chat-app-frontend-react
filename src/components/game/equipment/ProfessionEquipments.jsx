import React, { useContext } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { useCharacterStore } from '../dataProviders/CharacterProvider';
import { useItemIdMapStore } from '../dataProviders/ItemProvider';
import ItemSelector from '../gameComponents/ItemSelector';
import ProfessionEquipmentSlot from './ProfessionEquipmentSlot';


const ProfessionEquipments = ({ profession }) => {
  const [professionEquipments] = useCharacterStore((char) => char.skills[profession].equipment)

  return (
    <Box key={profession} margin={1} sx={{ flexGrow: 1, bgcolor: 'rgba(169, 203, 251, 0.8)' }}>
      <>{profession}</>
      <Grid key={profession} container spacing={1}>
        {Object.keys(professionEquipments).map((slot) => (
          <ProfessionEquipmentSlot key={slot} profession={profession} equipmentSlot={slot} />
        ))}
      </Grid>
    </Box>
  );
};

export default ProfessionEquipments;
