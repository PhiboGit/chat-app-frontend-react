import React, { useContext, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';
import ExpBar from '../ExpBar';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import CarpenterIcon from '@mui/icons-material/Carpenter';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import GrassIcon from '@mui/icons-material/Grass';
import ForestIcon from '@mui/icons-material/Forest';
import TerrainIcon from '@mui/icons-material/Terrain';

import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import GatheringIcon from './GatheringIcon';


const Item = ({ icon: IconComponent, selected, onClick  }) => {
  const [backgroundColor, setBackgroundColor] = useState('white');

  const paperStyle = {
    width: 60,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    backgroundColor: selected ? 'lightgreen' : backgroundColor,
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

const GatheringOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const [profession, setProfession] = useState('mining');
  const [iterations, setIterations] = useState(1);
  const [tier, setTier] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [limit, setLimit] = React.useState(false);
  

  const gatheringData = gameData.gatheringResourcesData[profession].tiers[tier-1]
  
  function getGatheringData(profession, tier){
    const tierData = gatheringData[tier]
    const exp = tierData.exp
    const expChar = tierData.expChar
    const level = tierData.level
    const time = tierData.time
    const amountMin = tierData.amountMin
    const amountMax = tierData.amountMax
    
    return {exp, expChar, level, time, amountMin, amountMax}
  }
  
  const getIcon = (profession) => {
    switch (profession) {
      case 'mining': return TerrainIcon
      case 'woodcutting': return ForestIcon
      case 'harvesting': return GrassIcon
      default:
        return CarpenterIcon
    }
  }

  const handleItemClick = (itemIndex, profession, tier) => {
    console.log(`selectGathering: ${itemIndex}`);
    setSelectedItem(itemIndex);
    setProfession(profession)
    setTier(tier)
  };

  const handleLimit = (event) => {
    setLimit(event.target.checked);
    if (event.target.checked) {
      setIterations(100);
    } else {
      setIterations(1);
    }
  };

  const handleIterations = (event) => {
    setIterations(parseInt(event.target.value))
  }

  const startAction = () => {
    const action = {
      "type": "action",
      "actionType": profession,
      "task": "gathering",
      "limit": limit,
      "iterations": parseInt(iterations),
      "args": {
          "tier": tier
        }
    }
    console.log("Starting action: ", action)
    send(action);
  };


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {Object.keys(gameData.gatheringResourcesData).map((profession) =>(
        <Box key={profession} sx={{ flexGrow: 1 }}>
        <ExpBar profession={profession}></ExpBar> 
        <Grid key={profession} container spacing={1}>
          {gameData.gatheringResourcesData[profession].tiers.map((value, index) => {
            const tier = index +1
            const identifier = `${profession}-${tier}`
            return(
            <Grid item key={identifier}>
              <GatheringIcon
              gatheringData={gameData.gatheringResourcesData[profession].tiers[index]}
            />
            </Grid>
          )})}          
        </Grid>
        </Box>
        ))}
      </Box>
      {selectedItem &&(<div className="startGathering-container">
        <Switch checked={limit} onChange={handleLimit} inputProps={{ 'aria-label': 'controlled' }}/>
        {limit && (<TextField
          label="Iterations"
          id="outlined-size-small"
          defaultValue= {iterations}
          size="small"
          onChange={handleIterations}
        />)}
        <Button onClick={startAction} variant="contained">Start</Button>
        <div>
          {JSON.stringify(gatheringData, null, '\t')}
        </div>
    </div>)}
    </>
  );
};

export default GatheringOverview;