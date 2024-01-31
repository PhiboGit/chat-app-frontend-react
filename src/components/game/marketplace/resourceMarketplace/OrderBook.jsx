import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../../dataProviders/CharacterDataProvider';

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

import ResourceIcon from '../../gameComponents/icons/ResourceIcon';
import OrderBookTable from './OrderBookTable';
import ClickAwayPopper from '../../../common/ClickAwayPopper';
import SellOrderMenu from './SellOrderMenu';
import BuyOrderMenu from './BuyOrderMenu';




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