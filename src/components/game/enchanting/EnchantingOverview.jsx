import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import ExpBar from '../ExpBar';

import CarpenterIcon from '@mui/icons-material/Carpenter';

import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

  const handleItem = (event) => {
    const itemId = event.target.value;

    const item = idToItemMap[itemId]
    console.log("selected Item: ", item)

    const validItems = Object.keys(characterData.resources).filter((resource) => resource.includes(`${item.subtype}T${item.tier}`))

    // Set the selected recipe and its ingredients
    setItemId(itemId);
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

  return (
    <div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="item-label">Item</InputLabel>
          <Select
            labelId="item-label"
            id="item"
            value={itemId}
            label="Item"
            onChange={handleItem}
          >
            {Object.keys(idToItemMap).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <p>Enchanting Resource:</p>        
          <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="resource-label">Resource</InputLabel>
          <Select
            labelId="resource-label"
            id="resource"
            value={selectedEnchantingResource}
            label="Resource"
            onChange={handleSelectingResource}
          >
            {validEnchantingResources.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TextField
          label="LevelLimit"
          id="levelLimit"
          defaultValue= {enchantingLimit}
          size="small"
          onChange={handleEnchantingLimit}
        />
      <div>
        <Switch checked={limit} onChange={handleLimit} inputProps={{ 'aria-label': 'controlled' }}/>
        {limit && (<TextField
          label="Iterations"
          id="outlined-size-small"
          defaultValue= {iterations}
          size="small"
          onChange={handleIterations}
        />)}
        <Button onClick={handleStart} variant="contained">Start</Button>
      </div>
    </div>
  );
};

export default EnchantingOverview;
