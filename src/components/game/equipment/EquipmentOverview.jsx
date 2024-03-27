import React, { useContext, useEffect, useState, useMemo } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import ItemSelector from '../gameComponents/ItemSelector';
import { useItemIdMapStore } from '../dataProviders/ItemProvider';
import { useCharacterStore } from '../dataProviders/CharacterProvider';


const EquipmentOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const [skills] = useCharacterStore((char) => char.skills)
  const [items] = useCharacterStore((char) => char.items)
  const [idToItemMap] = useItemIdMapStore((map) => map)
  
  const getEquipItem =(profession, equipmentSlot) => {
    const itemId = skills[profession].equipment[equipmentSlot]
    return idToItemMap.get(itemId)
  }

  const filteredItems = (profession, equipmentSlot) => {
    const filter = Array.from(items.map(id => idToItemMap.get(id)))
      .filter((item) => item.equipmentSkills.includes(profession) && item.equipmentType === equipmentSlot)
    //console.log('Filtered items', filter)
    return filter
  }

  const handleItem = (itemId, profession, equipmentSlot) => {
    // can also be "null", then it is unequip
    const item = idToItemMap.get(itemId)
    console.log("selected Item: ", item)
    
    const equip = {
      "type": "equip",
      "args": {
        "itemId": itemId,
        "skill": profession,
        "slot": equipmentSlot
      }
    }
    send(equip)
  };

  return (
    <Container maxWidth="sm">
      <Box 
        display="flex"
        flexDirection='column'
        alignItems="center"
        sx={{ bgcolor: 'rgba(169, 223, 251, 0.8)'}}>
      
      {Object.keys(skills).map((profession) => (
        <Box key={profession} margin={1} sx={{ flexGrow: 1, bgcolor: 'rgba(169, 203, 251, 0.8)' }}>
          <>{profession}</>
          <Grid key={profession} container spacing={1}>
            {Object.keys(skills[profession].equipment).map((slot) => (
              <Grid key={slot} item >
                <Box
                  sx={{
                    border: '2px dashed #000', // Adjust the border styles
                    padding: 0.3, // Optional: Add padding to the box
                  }}
                >
                  <ItemSelector 
                    selectedItem={getEquipItem(profession, slot)}
                    items={filteredItems(profession, slot)} 
                    hasNullValue={true} 
                    onChange={(itemId) => handleItem(itemId, profession, slot)}
                  />                
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      
      
    </Box>
    </Container>
  );
};

export default EquipmentOverview;
