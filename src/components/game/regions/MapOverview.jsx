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


import { Typography } from '@mui/material';
import ProfessionIcon from './ProfessionIcon';
import NodeIcon from './NodeIcon';
import RegionOverview from './RegionOverview';
import ReactFlowMap from './ReactFlowMap';


const MapOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);
  const regionData = gameData.regionData;

  const [selectedRegion, setSetlectedRegion] = useState()

  return (
    <Container maxWidth="lg">
      <Box 
        display="flex"
        flexDirection='column'
        alignItems="center"
        sx={{ bgcolor: 'rgba(169, 223, 251, 0.8)'}}
      >
        <Grid container 
          spacing={3} 
          justifyContent="center" 
          sx={{ bgcolor: 'rgba(169, 150, 230, 0.8)' }}
        >
          {Object.keys(gameData.gatheringResourcesData).map((profession) =>(
            <Grid item key={profession}>
              <ProfessionIcon profession={profession}/>
            </Grid>
          ))}
        </Grid>

        <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={1} sx={{ bgcolor: 'rgba(130, 150, 230, 0.8)' }}>
          {Object.entries(regionData).map(([regionName, regionInfo]) => (
            <Button key={regionName} variant='contained' onClick={() => setSetlectedRegion(regionName)}>{regionName}</Button>
            ))}
        </Grid>
        {selectedRegion && <RegionOverview regionName={selectedRegion}/>}
      <ReactFlowMap></ReactFlowMap>
    </Box>
  </Container>
  );
};

export default MapOverview;