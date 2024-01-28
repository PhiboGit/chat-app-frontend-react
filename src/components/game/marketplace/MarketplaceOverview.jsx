import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import ResourceIcon from '../gameComponents/icons/ResourceIcon';
import OrderBook from './OrderBook';




const MarketplaceOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const [resource, setResource] = React.useState(null);

  return (
    <Container maxWidth="lg">
      <Box 
        display="flex"
        flexDirection='column'
        alignItems="center"
        sx={{ bgcolor: 'rgba(169, 223, 251, 0.8)'}}>
        <Container maxWidth="md">
          <Box sx={{ bgcolor: 'rgba(169, 150, 230, 0.8)' }}>
            <Grid container spacing={0.2}>
              <Grid item key={"woodT1"}>
                <ResourceIcon name={"woodT1"} onClick={() => setResource("woodT1")}/>
              </Grid>
              <Grid item key={"oreT1"}>
                <ResourceIcon name={"oreT1"} onClick={() => setResource("oreT1")}/>
              </Grid>
              <Grid item key={"fiberT1"}>
                <ResourceIcon name={"fiberT1"} onClick={() => setResource("fiberT1")}/>
              </Grid>
              <Grid item key={"plankT1"}>
                <ResourceIcon name={"plankT1"} onClick={() => setResource("plankT1")}/>
              </Grid>
            </Grid>
          </Box>
        </Container>

        {resource &&<Container maxWidth="md">
          <Box sx={{ bgcolor: 'rgba(169, 150, 230, 0.8)' }}>
            <OrderBook resource={resource}/>
          </Box>
        </Container>}
      </Box>
    </Container>
  );
};

export default MarketplaceOverview;