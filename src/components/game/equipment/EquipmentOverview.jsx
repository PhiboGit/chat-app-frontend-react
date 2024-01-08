import React, { useContext, useEffect, useState, useMemo } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import ExpBar from '../ExpBar';
import ItemIcon from '../inventory/ItemIcon';

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
import BasicIcon from '../gameComponents/Icons/BasicIcon';


const EquipmentOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const skills = characterData.skills
  
  const [profession, setProfession] = React.useState("");
  const [equipmentSlot, setEquipmentSlot] = React.useState("")
  
  const idToItemMap = characterData.items.reduce((map, item) => {
    map[item._id] = item;
    return map;
  }, {});
  
  const getEquipItem =(profession, slot) => {
    return idToItemMap[skills[profession].equipment[slot]]
  }

  const filteredItems = () => {
    const filter = 
      Object.entries(idToItemMap)
      .filter(([id, item]) => item.skills.includes(profession) && item.type == equipmentSlot)
      .map(([id,item]) => item)
    console.log('Filtered items', filter)
    return filter
  }

  const handleItem = (itemId) => {
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
    handleClose()
  };

  
  const [anchorEl, setAnchorEl] = React.useState(null);

  function openItemSelector(event, profession, slot){
    console.log('Clicked', profession, slot);
    setProfession(profession)
    setEquipmentSlot(slot)
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
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
                {(getEquipItem(profession, slot) ?
                <ItemIcon
                item={getEquipItem(profession, slot)}
                onClick={(event) => openItemSelector(event, profession, slot)}
                />
                :
                <BasicIcon
                  iconName={slot}
                  onClick={(event) => openItemSelector(event, profession, slot)}
                />)}
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
        <ItemSelector items={filteredItems()} hasNullValue={true} onItemClick={handleItem}/>
      </ClickAwayPopper>
    </Box>
    </Container>
  );
};

export default EquipmentOverview;
