import React, { useContext, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';
import ExpBar from '../ExpBar';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';

import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import GatheringIcon from './GatheringIcon';
import GatheringProfessionIcon from './GatheringProfessionIcon';
import { Typography } from '@mui/material';


const GatheringOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const [profession, setProfession] = useState('mining');
  const [iterations, setIterations] = useState(1);
  const [tier, setTier] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [limit, setLimit] = React.useState(false);
  

  const gatheringData = gameData.gatheringResourcesData[profession].tiers[tier-1]

  function handleSelection(identifier, profession, tier){
    setSelectedItem(identifier)
    setProfession(profession)
    setTier(tier)
  }

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
    <Container maxWidth="lg">
      <Box 
        display="flex"
        flexDirection='column'
        alignItems="center"
        sx={{ bgcolor: 'rgba(169, 223, 251, 0.8)'}}>
      <Container maxWidth="md">
      <Box sx={{ 
        
        bgcolor: 'rgba(169, 150, 230, 0.8)' 
        }}>
        {Object.keys(gameData.gatheringResourcesData).map((profession) =>(
          <Box 
          key={profession} 
          sx={{  bgcolor: 'rgba(169, 183, 200, 0.8)', margin: 2  }}>
          <Container maxWidth="xs">
          <Box key={profession} sx={{  bgcolor: 'rgba(139, 183, 200, 0.8)', margin: 1  }}>
          <Typography>{profession}: </Typography>
          <GatheringProfessionIcon profession={profession}/>
          <ExpBar profession={profession}></ExpBar> 
          </Box>
          </Container>
          <Grid key={profession} container spacing={1}>
            {gameData.gatheringResourcesData[profession].tiers.map((value, index) => {
              const tier = index +1
              const identifier = `${profession}-${tier}`
              return(
              <Grid item key={identifier}>
                <GatheringIcon
                  selected ={selectedItem == identifier}
                  onClick={() => handleSelection(identifier, profession, tier)}
                  gatheringData={gameData.gatheringResourcesData[profession].tiers[index]}
                />
              </Grid>
            )})}          
          </Grid>
        </Box>
        ))}
      </Box>
      </Container>
      <Container maxWidth="xs">
      <Box 
        display="flex"
        flexDirection='column'
        alignItems="center"
        sx={{ bgcolor: 'rgba(169, 223, 151, 0.8)'}}>
        <Switch checked={limit} onChange={handleLimit} inputProps={{ 'aria-label': 'controlled' }}/>
        {limit && (<TextField
          label="Iterations"
          id="outlined-size-small"
          defaultValue= {iterations}
          size="small"
          onChange={handleIterations}
        />)}
        <Button disabled={!selectedItem} onClick={startAction} variant="contained">Start</Button>
        {selectedItem}       
    </Box>
    </Container>
    </Box>
    </Container>
  );
};

export default GatheringOverview;