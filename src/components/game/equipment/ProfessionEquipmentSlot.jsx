import React, { useContext } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { useCharacterStore } from '../dataProviders/CharacterProvider';
import { useItemIdMapStore } from '../dataProviders/ItemProvider';
import ItemSelector from '../gameComponents/ItemSelector';


const ProfessionEquipmentSlot = ({ profession, equipmentSlot }) => {
  const { gameData, send } = useContext(GameDataContext);
  const [items] = useCharacterStore((char) => char.items)
  const [idToItemMap] = useItemIdMapStore((map) => map)

  const [equippedItemId] = useCharacterStore((char) => char.skills[profession].equipment[equipmentSlot])
  const equippedItem = idToItemMap.get(equippedItemId)

  // equippable items for this slot
  const filteredItems = Array.from(items.map(id => idToItemMap.get(id)))
  .filter((item) => 
    item.equipmentSkills.includes(profession) && item.equipmentType === equipmentSlot
  )


  const handleItem = (itemId) => {
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
    <Grid item key={equipmentSlot}>
      <Box
        sx={{
          border: '2px dashed #000', // Adjust the border styles
          padding: 0.3, // Optional: Add padding to the box
        }}
      >
        <ItemSelector 
          selectedItem={equippedItem}
          items={filteredItems} 
          hasNullValue={true} 
          onChange={(itemId) => handleItem(itemId)}
        />                
      </Box>
    </Grid>
  );
};

export default ProfessionEquipmentSlot;
