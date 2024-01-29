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
import MyOrders from './MyOrders';




const MarketplaceOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const [view, setView] = useState('listing')

  

  const resourcesInfo = gameData.resourcesInfo

  const [resource, setResource] = React.useState(null);

  return (
    <Container maxWidth="lg">
      <Button variant='contained' onClick={() => setView('listing')}>Marketplace Listing</Button>
      <Button variant='contained' onClick={() => setView('my_orders')}>My Orders</Button>
      {view == 'listing' &&<Box 
        display="flex"
        flexDirection='column'
        alignItems="center"
        sx={{ bgcolor: 'rgba(169, 223, 251, 0.8)'}}>
        {!resource &&<Container maxWidth="md">
          <Box sx={{ bgcolor: 'rgba(169, 150, 230, 0.8)' }}>
            <Grid container spacing={0.2}>
              {Object.keys(resourcesInfo).map((key) => 
                <Grid item key={key}>
                  <ResourceIcon name={key} onClick={() => setResource(key)}/>
                </Grid>
              )}
            </Grid>
          </Box>
        </Container>}

        {resource &&<Container maxWidth="md">
          <Box sx={{ bgcolor: 'rgba(169, 150, 230, 0.8)' }}>
            <Button variant='contained' onClick={() => setResource(null)}>View all Resources</Button>
            <OrderBook resource={resource}/>
          </Box>
        </Container>}
      </Box>}

      {view == 'my_orders' && <Box>
        <MyOrders/>

      </Box>}
    </Container>
  );
};

export default MarketplaceOverview;