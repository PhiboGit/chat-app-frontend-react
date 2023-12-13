import React, { useContext, useEffect, useState, useMemo } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import ExpBar from '../ExpBar';


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



import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Key } from '@mui/icons-material';

import CarpenterIcon from '@mui/icons-material/Carpenter';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

const Item = styled(Paper)(({ theme, icon }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  width: 60,
  height: 60,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));


const EquipmentOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const skills = characterData.skills

  const [open, setOpen] = React.useState(false);

  const [profession, setProfession] = React.useState("");
  const [equipmentSlot, setEquipmentSlot] = React.useState("")
  const [itemId, setItemId] = useState("null")

  const idToItemMap = characterData.items.reduce((map, item) => {
    map[item._id] = item;
    return map;
  }, {});

  function equipItem(profession, slot){
    setProfession(profession)
    setEquipmentSlot(slot)
    setItemId(skills[profession].equipment[slot] ? skills[profession].equipment[slot] : "null" )
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setItemId("null")
  };

  const handleItem = (event) => {
    const itemId = event.target.value;

    const item = idToItemMap[itemId]
    console.log("selected Item: ", item)

    
    setItemId(itemId);
    
    const equip = {
      "type": "equip",
      "args": {
        "itemId": itemId,
        "skill": profession,
        "slot": equipmentSlot
      }
    }
    send(equip)
    setItemId("null")
    setOpen(false)
  };
  

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      {Object.keys(skills).map((profession) => (
        <div key={profession}>
          <h3>{profession}</h3>
          <div>{JSON.stringify(skills[profession])}</div>
          <Grid key={profession} container spacing={1}>
            {Object.keys(skills[profession].equipment).map((slot) => (
              <Grid key={slot} item >
                <Item 
                
                onClick={() => equipItem(profession, slot)}
                >
                  <HelpCenterIcon sx={{ fontSize: 90 }}/>
                </Item>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </Box>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Select ${equipmentSlot} for ${profession}: `}
        </DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="item-label">Item</InputLabel>
            <Select
              labelId="item-label"
              id="item"
              value={itemId}
              label="Item"
              onChange={handleItem}
            >
              <MenuItem key="null" value="null">
                "null"
              </MenuItem>
              {Object.keys(idToItemMap).map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EquipmentOverview;
