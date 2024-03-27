import React, { Fragment, useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';

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
import StartActionController from '../gameComponents/StartActionController';
import ClickAwayPopper from '../../common/ClickAwayPopper';
import ItemSelector from '../gameComponents/ItemSelector';
import { useItemIdMapStore } from '../dataProviders/ItemProvider';
import { useCharacterStore } from '../dataProviders/CharacterProvider';

const EnchantingOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const [resources] = useCharacterStore(char => char.resources)
  const [idToItemMap] = useItemIdMapStore((map) => map)

  const [itemId, setItemId] = useState('')
  const [validEnchantingResources, setValidEnchantingResources] = useState([])
  const [selectedEnchantingResource, setSelectedEnchantingResource] = useState('')
  const [enchantingLimit, setEnchantingLimit] = useState(1)

  const [limit, setLimit] = React.useState(true);
  const [iterations, setIterations] = useState(1);


  const handleItem = (newItemId) => {
    const item = idToItemMap.get(newItemId)
    console.log("selected Item: ", item)

    const validItems = Object.keys(resources).filter((resource) => resource.includes(`${item.name}`))


    // Set the selected recipe and its ingredients
    setItemId(newItemId);
    setValidEnchantingResources(validItems);
    setSelectedEnchantingResource(validItems[0]);
    setEnchantingLimit(item.enchantingLevel)
  };

  const handleEnchantingLimit = (event) => {
    setEnchantingLimit(parseInt(event.target.value));
  };
  const handleSelectingResource = (event) => {
    setSelectedEnchantingResource(event.target.value);
  };

  const handleLimit = (checked) => {
    console.log('limit', checked);
    setLimit(checked);
    setIterations(1);
  };

  const handleIterations = (number) => {
    setIterations(number)
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
          
          <Box
            sx={{
              border: '2px dashed #000', // Adjust the border styles
              padding: 0.3, // Optional: Add padding to the box
            }}
          >
            <ItemSelector 
              selectedItem={idToItemMap.get(itemId)} 
              items={Array.from(idToItemMap.values())} 
              onChange={handleItem}
            />
          </Box>
        </Box>
      </Container>

      <Container maxWidth="xs">
        <Box 
          display="flex"
          flexDirection='column'
          alignItems="center"
          sx={{ bgcolor: 'rgba(160, 160, 186, 0.8)'}}
        >
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
            <InputLabel id="ingredient-label">Consumed Precursor</InputLabel>
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
      <StartActionController
          hasLimit={limit}
          onChangeLimit={handleLimit}
          iterations={iterations}
          onChangeIterations={handleIterations}
          startDisabled={!selectedEnchantingResource}
          onClickStart={handleStart}
        />
      </Box>
    </Container>
  );
};

export default EnchantingOverview;
