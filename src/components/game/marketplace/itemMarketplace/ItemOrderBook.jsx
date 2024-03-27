import React, { useContext, useEffect, useState } from 'react';
import { CharacterDataContext } from '../../dataProviders/CharacterDataProvider';
import { GameDataContext } from '../../dataProviders/GameDataProvider';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import ItemOrderBookTable from './ItemOrderBookTable';
import SellItemOrderMenu from './SellItemOrderMenu';




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