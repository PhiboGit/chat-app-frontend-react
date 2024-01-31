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
import OrderBook from './resourceMarketplace/OrderBook';
import MyOrders from './resourceMarketplace/MyOrders';
import Listings from './resourceMarketplace/Listings';
import ItemListings from './itemMarketplace/ItemListings';
import MyItemOrders from './itemMarketplace/MyItemOrders';




const MarketplaceOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const [view, setView] = useState('listing')

  

  const resourcesInfo = gameData.resourcesInfo

  const [resource, setResource] = React.useState(null);

  return (
    <Container maxWidth="lg">
      <Button variant='contained' onClick={() => setView('listing')}>Marketplace Listing</Button>
      <Button variant='contained' onClick={() => setView('item_listing')}>Marketplace Item Listing</Button>
      <Button variant='contained' onClick={() => setView('my_orders')}>My Orders</Button>
      <Button variant='contained' onClick={() => setView('my_item_orders')}>My Item Orders</Button>
      {view == 'listing' && <Listings/>}
      {view == 'item_listing' && <ItemListings/>}

      {view == 'my_orders' && <MyOrders/>}
      {view == 'my_item_orders' && <MyItemOrders/>}
    </Container>
  );
};

export default MarketplaceOverview;