import React, { useContext, useEffect, useState, useMemo } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import ExpBar from '../ExpBar';
import ItemIcon from '../inventory/ItemIcon';

import Container from '@mui/material/Container';
import Popover from '@mui/material/Popover';



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

const Item = ({ icon: IconComponent, onClick  }) => {
  const [backgroundColor, setBackgroundColor] = useState('white');

  const paperStyle = {
    width: 60,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    backgroundColor: backgroundColor,
  };

  const iconStyle = {
    width: '100%',
    height: '100%',
  };

  const handleHover = () => {
    setBackgroundColor('lightgray');
  };

  const handleLeave = () => {
    setBackgroundColor('white');
  };

  return (
    <Paper
      style={paperStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      <div style={iconStyle}>
        {IconComponent && <IconComponent style={{ width: '100%', height: '100%' }} />}
      </div>
    </Paper>
  );
};


const EquipmentOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const skills = characterData.skills

  const [profession, setProfession] = React.useState("");
  const [equipmentSlot, setEquipmentSlot] = React.useState("")
  const [itemId, setItemId] = useState("null")

  const idToItemMap = characterData.items.reduce((map, item) => {
    map[item._id] = item;
    return map;
  }, {});

  const getIcon = (slot) => {
    switch (slot) {
      case 'tool': return HelpCenterIcon
      default:
        return HelpCenterIcon
    }
  }

  const mapFiltered = () => {
    
    const filter = new Map(
      Object.entries(idToItemMap)
      .filter(([id, item]) => item.skills.includes(profession) && item.type == equipmentSlot )
    );
    
    return filter
  }

  const handleItem = (itemId) => {

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
    handleClose()
  };

  const getEquipItem =(profession, slot) => {
    return idToItemMap[skills[profession].equipment[slot]]
  }
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  function equipItem(event, profession, slot){
    setProfession(profession)
    setEquipmentSlot(slot)
    setItemId(skills[profession].equipment[slot] ? skills[profession].equipment[slot] : "null" )
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
                onClick={(event) => equipItem(event, profession, slot)}
                />
                :
                <Item
                  icon={getIcon(slot)}
                  onClick={(event) => equipItem(event, profession, slot)}
                />)}
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    
    <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            slotProps={{
              paper: {
                sx: {
                  width: 'auto',
                  height: 'auto', // Set a fixed height or adjust as needed
                  overflowY: 'auto', // Allow vertical overflow
                },
              },
            }}
          >
          <Container maxWidth="xs">
            <Box
              sx={{ bgcolor: 'rgba(160, 177, 186, 0.8)'}}
            >
            <Grid container spacing={1}>
              {[...mapFiltered()].map(([itemId, item]) => (
                  <Grid item key={itemId}>
                    <ItemIcon item={item} onClick={() => handleItem(itemId)}/>
                  </Grid>
                ))}
            </Grid>
            </Box>
          </Container>
        </Popover>
    </Box>
    </Container>
  );
};

export default EquipmentOverview;
