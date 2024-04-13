import React, { useContext, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import ExpBar from '../ExpBar';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';

import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import GatheringIcon from '../gameComponents/icons/GatheringIcon';
import GatheringProfessionIcon from './GatheringProfessionIcon';
import { Paper, Typography } from '@mui/material';
import StartActionController from '../gameComponents/StartActionController';


const GatheringOverview = () => {
  const { gameData, send } = useContext(GameDataContext);

  const [profession, setProfession] = useState('mining');
  const [iterations, setIterations] = useState(1);
  const [tier, setTier] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [limit, setLimit] = React.useState(false);
  
  function handleSelection(identifier, profession, tier){
    console.log('selected node:', identifier)
    if (selectedItem === identifier) {
      setSelectedItem(null)
    }else{
      setSelectedItem(identifier)
    }
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
        >
      <Container maxWidth="md">
      
        {Object.keys(gameData.gatheringResourcesData).map((profession) =>(
          <Paper key={profession} >
            <Box 
              display="flex"
              flexDirection='row'
              alignItems={"center"}
              margin={2}
              >
              
              <Box width={'40%'} sx={{ margin: 1  }}>
                <Typography>{profession}: </Typography>
                <GatheringProfessionIcon profession={profession}/>
                <ExpBar profession={profession}></ExpBar> 
              </Box>
            <Grid key={profession} container spacing={1}>
              {gameData.gatheringResourcesData[profession].tiers.map((nodeData, index) => {
                const tier = index +1
                const identifier = nodeData.lootTable
                return(
                <Grid item key={identifier}>
                  <GatheringIcon
                    profession={profession}
                    tier={tier}
                    onClick={() => handleSelection(identifier, profession, tier)}
                    selected={selectedItem == identifier}
                  />
                </Grid>
              )})}          
            </Grid>
          </Box>
        </Paper>
        ))}
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