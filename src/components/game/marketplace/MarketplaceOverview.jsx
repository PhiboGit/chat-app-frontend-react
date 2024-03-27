import React, { useContext, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import ItemListings from './itemMarketplace/ItemListings';
import MyItemOrders from './itemMarketplace/MyItemOrders';
import Listings from './resourceMarketplace/Listings';
import MyOrders from './resourceMarketplace/MyOrders';




const MarketplaceOverview = () => {
  const { gameData, send } = useContext(GameDataContext);

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