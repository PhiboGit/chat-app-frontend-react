import React, { Fragment, useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import ExpBar from '../ExpBar';
import Container from '@mui/material/Container';
import CarpenterIcon from '@mui/icons-material/Carpenter';

import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel'
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import { ClickAwayListener } from '@mui/material';import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ResourceIcon from '../gameComponents/icons/ResourceIcon';
import RecipeIcon from '../gameComponents/icons/RecipeIcon';
import ItemIcon from '../gameComponents/icons/ItemIcon'

const EnchantingOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const [itemId, setItemId] = useState("")
  const [validEnchantingResources, setValidEnchantingResources] = useState([])
  const [selectedEnchantingResource, setSelectedEnchantingResource] = useState("")
  const [enchantingLimit, setEnchantingLimit] = useState(1)

  const idToItemMap = characterData.items.reduce((map, item) => {
    map[item._id] = item;
    return map;
  }, {});

  const handleItem = (newItemId) => {
    const item = idToItemMap[newItemId]
    console.log("selected Item: ", item)

    const validItems = Object.keys(characterData.resources).filter((resource) => resource.includes(`${item.name}T${item.tier}`))

    // Set the selected recipe and its ingredients
    setItemId(newItemId);
    setValidEnchantingResources(validItems);
    setSelectedEnchantingResource(validItems[0]);
    setEnchantingLimit(item.enchantingLevel)
    handleClose()
  };

  const handleEnchantingLimit = (event) => {
    setEnchantingLimit(parseInt(event.target.value));
  };
  const handleSelectingResource = (event) => {
    setSelectedEnchantingResource(event.target.value);
  };

  const [limit, setLimit] = React.useState(true);

  const handleLimit = (event) => {
    setLimit(event.target.checked);
    if (event.target.checked) {
      setIterations(1);
    } else {
      setIterations(1);
    }
  };

  const [iterations, setIterations] = useState(1);
  const handleIterations = (event) => {
    setIterations(parseInt(event.target.value))
  }
  
  function handleStart(){
    const enchanting = {
      "type": "action",
      "actionType": "enchanter",
      "task": "enchanting",
      "limit": limit,
      "iterations": parseInt(iterations),
      "args": {
          "itemId": itemId,
          "enchantingResource": selectedEnchantingResource,
          "enchantingLevelLimit": parseInt(enchantingLimit)
      }
    }
    console.log("enchanting: ", enchanting);
    send(enchanting)
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;


  return (
    <Container maxWidth="sm">
      <Box 
        display="flex"
        flexDirection='column'
        alignItems="center"
        sx={{ bgcolor: 'rgba(169, 223, 251, 0.8)'}}>

      <Container maxWidth="xs">
        <Box 
          display="flex"
          flexDirection='column'
          alignItems="center"
          sx={{ bgcolor: 'rgba(160, 177, 186, 0.8)'}}
        >
          <div>Select an Item:</div>
          
          {<Box
            sx={{
          border: '2px dashed #000', // Adjust the border styles
          padding: 0.3, // Optional: Add padding to the box
          display: 'inline-block', // Make sure the box is inline with the content
          bgcolor: 'rgba(160, 177, 6, 0.8)'
          
          }}
          >
          {itemId ? (
            <ItemIcon item={idToItemMap[itemId]} onClick={handleClick}/>
            ) : (
              <RecipeIcon disableTitle onClick={handleClick} />
            )}
          </Box>
          }
          {open && <ClickAwayListener onClickAway={handleClose}>
            <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            placement='bottom'
          >
          <Container maxWidth="xs">
            <Box
              sx={{ bgcolor: 'rgba(160, 177, 186, 0.8)'}}
            >
            <Grid container spacing={1}>
              {Object.keys(idToItemMap).map((itemId) => (
                  <Grid item key={itemId}>
                    <ItemIcon item={idToItemMap[itemId]} onClick={() => handleItem(itemId)}/>
                  </Grid>
                ))}
            </Grid>
            </Box>
          </Container>
          </Popper>
        </ClickAwayListener>}

        <TextField
              label="Enchanting Limit"
              id="levelLimit"
              defaultValue= {enchantingLimit}
              size="small"
              onChange={handleEnchantingLimit}
            />
      </Box>
      </Container>

      {itemId && (
      <Container maxWidth="xs">
        <Box 
          display="flex"
          flexDirection='column'
          alignItems="center"
          sx={{ bgcolor: 'rgba(135, 168, 155, 0.8)'}}
        >
          <h3>Info:</h3>
          
        </Box>
      </Container>)}

      <Container maxWidth="xs">
        <Box 
          display="flex"
          flexDirection='column'
          alignItems="center"
          sx={{ bgcolor: 'rgba(135, 168, 185, 0.8)'}}
        >
          
          <Box 
          display="flex"
          flexDirection='row'
          alignItems="center"
          sx={{ bgcolor: 'rgba(135, 168, 185, 0.8)'}}
        >
          
            
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="ingredient-label">Consumed Essence</InputLabel>
            <Select
              labelId="ingredient-label"
              id="ingredient"
              value={selectedEnchantingResource}
              label="Essence"
              onChange={handleSelectingResource}
            >
              {validEnchantingResources.map((value, index) => (
                <MenuItem key={index} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          </Box>
        </Box>
      </Container>
      <Container maxWidth="xs">
        <Box 
            display="flex"
            flexDirection='column'
            alignItems="center"
            sx={{ bgcolor: 'rgba(91, 91, 91, 0.8)'}}
          >
            <FormControlLabel control={<Switch checked={limit} onChange={handleLimit}/>} label="Limit" />
          
          {limit && (<TextField
            label="Iterations"
            id="outlined-size-small"
            defaultValue= {iterations}
            size="small"
            onChange={handleIterations}
          />)}
          <Button disabled={!selectedEnchantingResource} onClick={handleStart} variant="contained">Start</Button>
        </Box>
      </Container>
      </Box>
    </Container>
  );
};

export default EnchantingOverview;
