import React, { useContext } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { useCharacterStore } from '../dataProviders/CharacterProvider';
import { useItemIdMapStore } from '../dataProviders/ItemProvider';
import ItemSelector from '../gameComponents/ItemSelector';
import ProfessionEquipments from './ProfessionEquipments';


const EquipmentOverview = () => {
  const [skills] = useCharacterStore((char) => char.skills)

  return (
    <Container maxWidth="sm">
      <Box 
        display="flex"
        flexDirection='column'
        alignItems="center"
        sx={{ bgcolor: 'rgba(169, 223, 251, 0.8)'}}>
      
      {Object.keys(skills).map((profession) => (
        <ProfessionEquipments key={profession} profession={profession} />
      ))}
    </Box>
    </Container>
  );
};

export default EquipmentOverview;
