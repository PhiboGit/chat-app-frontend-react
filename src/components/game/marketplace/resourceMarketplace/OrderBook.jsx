import React, { useContext, useEffect, useState } from 'react';
import { CharacterDataContext } from '../../dataProviders/CharacterDataProvider';
import { GameDataContext } from '../../dataProviders/GameDataProvider';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import BuyOrderMenu from './BuyOrderMenu';
import OrderBookTable from './OrderBookTable';
import SellOrderMenu from './SellOrderMenu';


const OrderBook = ({resource}) => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData, marketplaceOrderBook } = useContext(CharacterDataContext);

  const [orderBook, setOrderBook] = useState()

  useEffect(() => {
    console.log(marketplaceOrderBook)
    if(marketplaceOrderBook){
      setOrderBook(marketplaceOrderBook)
    }
  },[marketplaceOrderBook])

  useEffect(() => {
    if(!resource) return
    setOrderBook(null)
    getOrderBook()
  },[resource])

  useEffect(() => {
    
  }, []); // Run once when the component mounts

  const getOrderBook = () => {
    const marketplaceRequest = {
      "type": "marketplace/orderBook",
      "args": {
          "resource": resource
        }
    }
    send(marketplaceRequest)
  }

  const refresh = () => {
    getOrderBook()
  }

  const [anchorElBuy, setAnchorElBuy] = React.useState(null);
  const [anchorElSell, setAnchorElSell] = React.useState(null);

  const openBuy = (event) => {
    setAnchorElBuy(event.target)
  }
  const openSell = (event) => {
    setAnchorElSell(event.target)
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <Box sx={{ bgcolor: 'rgba(169, 150, 230, 0.8)' }}>
          <Typography variant="h6">Order Book for {resource}</Typography>
          <Button variant='contained' onClick={refresh}>Refresh</Button>
          <Button variant='contained' onClick={openBuy}>Buy</Button>
          <Button variant='contained' onClick={openSell}>Sell</Button>
        </Box>
        <SellOrderMenu resource={resource} anchorEl={anchorElSell} setAnchorEl={setAnchorElSell}/>
        <BuyOrderMenu resource={resource} anchorEl={anchorElBuy} setAnchorEl={setAnchorElBuy}/>
        {orderBook && <Box display="flex" flexDirection="row" alignItems="flex-start">
          <Box sx={{ bgcolor: 'rgba(169, 150, 230, 0.8)', padding: 2, margin: 2 }}>
            <Typography variant="h6">Order Book Selling</Typography>
            <OrderBookTable orderBook={orderBook.orderBookSelling}/>
          </Box>
          <Box sx={{ bgcolor: 'rgba(169, 150, 230, 0.8)', padding: 2, margin: 2 }}>
            <Typography variant="h6">Order Book Buying</Typography>
            <OrderBookTable orderBook={orderBook.orderBookBuying}/>
          </Box>
        </Box>}
      </Paper>
    </Container>
  );
};

export default OrderBook;