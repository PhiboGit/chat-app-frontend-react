import React, { useContext, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';
import ExpBar from '../ExpBar';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import GatheringIcon from './GatheringIcon';
import ProfessionIcon from '../ProfessionIcon';
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
          <Typography>{profession}: </Typography>
          <ProfessionIcon profession={profession}/>
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