import React, { useContext, useEffect, useState, useMemo } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import ExpBar from '../ExpBar';
import ItemIcon from '../gameComponents/icons/ItemIcon';

import Container from '@mui/material/Container';
import Popper from '@mui/material/Popper';
import { ClickAwayListener } from '@mui/material';


import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import BlockIcon from '@mui/icons-material/Block';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Key } from '@mui/icons-material';

import CarpenterIcon from '@mui/icons-material/Carpenter';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ClickAwayPopper from '../../common/ClickAwayPopper';
import ItemSelector from '../gameComponents/ItemSelector';
import BasicIcon from '../gameComponents/icons/BasicIcon';


const EquipmentOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const skills = characterData.skills
  
  const idToItemMap = characterData.items.reduce((map, item) => {
    map[item._id] = item;
    return map;
  }, {});
  
  const getEquipItem =(profession, equipmentSlot) => {
    return idToItemMap[skills[profession].equipment[equipmentSlot]]
  }

  const filteredItems = (profession, equipmentSlot) => {
    const filter = 
      Object.entries(idToItemMap)
      .filter(([id, item]) => item.equipmentSkills.includes(profession) && item.equipmentType == equipmentSlot)
      .map(([id,item]) => item)
    //console.log('Filtered items', filter)
    return filter
  }

  const handleItem = (itemId, profession, equipmentSlot) => {
    // can also be "null", then it is unequip
    const item = idToItemMap[itemId]
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
