import React, { useContext, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
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
import StartActionController from '../gameComponents/StartActionController';


const GatheringOverview = () => {
  const { gameData, send } = useContext(GameDataContext);

  const [profession, setProfession] = useState('mining');
  const [iterations, setIterations] = useState(1);
  const [tier, setTier] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [limit, setLimit] = React.useState(false);
  
  function handleSelection(identifier, profession, tier){
    setSelectedItem(identifier)
    setProfession(profession)
    setTier(tier)
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
            display="flex"
            flexDirection='row'
            alignItems={"center"}
            key={profession} 
            sx={{  bgcolor: 'rgba(169, 183, 200, 0.8)', margin: 2  }}>
            <Container >
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
      <StartActionController
        limit={limit}
        setLimit={setLimit}
        iterations={iterations}
        setIterations={setIterations}
        startDisabled={selectedItem == null}
        onClickStart={startAction}
      />
    </Box>
    </Container>
  );
};

export default GatheringOverview;