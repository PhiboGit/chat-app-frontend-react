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
import OrderBookTable from './ItemOrderBookTable';
import ClickAwayPopper from '../../../common/ClickAwayPopper';
import SellOrderMenu from './SellItemOrderMenu';
import SellItemOrderMenu from './SellItemOrderMenu';
import ItemOrderBookTable from './ItemOrderBookTable';




const ItemOrderBook = ({itemName}) => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData, itemMarketplaceOrderBook } = useContext(CharacterDataContext);

  const [orderBook, setOrderBook] = useState()

  useEffect(() => {
    console.log(itemMarketplaceOrderBook)
    if(itemMarketplaceOrderBook){
      setOrderBook(itemMarketplaceOrderBook)
    }
  },[itemMarketplaceOrderBook])

  useEffect(() => {
    if(!itemName) return
    setOrderBook(null)
    getOrderBook()
  },[itemName])

  useEffect(() => {

  }, []); // Run once when the component mounts

  const getOrderBook = () => {
    const marketplaceRequest = {
      "type": "item_marketplace/orderBook",
      "args": {
          "itemName": itemName
        }
    }
    send(marketplaceRequest)
  }

  const refresh = () => {
    getOrderBook()
  }

  const [anchorElSell, setAnchorElSell] = React.useState(null);

  
  const openSell = (event) => {
    setAnchorElSell(event.target)
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <Box sx={{ bgcolor: 'rgba(169, 150, 230, 0.8)' }}>
          <Typography variant="h6">Order Book for {itemName}</Typography>
          <Button variant='contained' onClick={refresh}>Refresh</Button>
          <Button variant='contained' onClick={openSell}>Sell</Button>
        </Box>
        <SellItemOrderMenu itemName={itemName} anchorEl={anchorElSell} setAnchorEl={setAnchorElSell}/>
        {orderBook && <Box display="flex" flexDirection="row" alignItems="flex-start">
          <Box sx={{ bgcolor: 'rgba(169, 150, 230, 0.8)', padding: 2, margin: 2 }}>
            <Typography variant="h6">Order Book Selling</Typography>
            <ItemOrderBookTable orderBook={orderBook.orderBook}/>
          </Box>
        </Box>}
      </Paper>
    </Container>
  );
};

export default ItemOrderBook;