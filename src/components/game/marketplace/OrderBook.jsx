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
import OrderBookTable from './OrderBookTable';




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
  const buy = () => {

  }
  const sell = () => {

  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <Box sx={{ bgcolor: 'rgba(169, 150, 230, 0.8)' }}>
          <Typography variant="h6">Order Book for {resource}</Typography>
          <Button variant='contained' onClick={refresh}>Refresh</Button>
          <Button variant='contained' onClick={buy}>Buy</Button>
          <Button variant='contained' onClick={sell}>Sell</Button>
        </Box>
        {orderBook && <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start">
          {/* Order Book Selling Table */}
          <OrderBookTable orderBook={orderBook.orderBookSelling}/>

          {/* Order Book Buying Table */}
          <OrderBookTable orderBook={orderBook.orderBookBuying}/>
        </Box>}
      </Paper>
    </Container>
  );
};

export default OrderBook;