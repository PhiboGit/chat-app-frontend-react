import React, { useContext, useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, styled } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check'; 
import CancelIcon from '@mui/icons-material/Cancel';
import { GameDataContext } from '../../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../../dataProviders/CharacterDataProvider';

import ItemIcon from '../../gameComponents/icons/ItemIcon';
import ResourceIcon from '../../gameComponents/icons/ResourceIcon';

const CompactTable = styled(Table)({
  minWidth: 400,
});

const CompactTableCell = styled(TableCell)({
  padding: '5px',
  fontSize: '0.6rem',
});

const CollectButton = styled(IconButton)({
  '&:hover': {
    backgroundColor: 'grey', // Adjust as needed
  },
});

const MyItemOrdersTable = ({ orders }) => {

  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);



  const handleCollectClick = (order) => {
    // Add logic for handling collect click
    console.log('Collect clicked for order:', order._id);

    const collectOrder = {
      "type": "item_marketplace/collect",
      "args": {
          "item_orderId": order._id
      }
    }
    send(collectOrder)
  };

  const handleCancelClick = (order) => {
    // Add logic for handling collect click
    console.log('Cancel clicked for order:', order._id);

    const cancelOrder = {
      "type": "item_marketplace/cancel",
      "args": {
          "item_orderId": order._id
      }
    }
    send(cancelOrder)
  };

  const ableToCollect = (order) => {
    if(order.sellerCharacter == characterData.characterName && order.status == 'complete' && !order.goldCollected){
      return true
    }
    if(order.buyerCharacter == characterData.characterName && order.status == 'complete' && !order.itemCollected){
      return true
    }
    if(order.sellerCharacter == characterData.characterName && order.status == 'canceled' && !order.itemCollected){
      return true
    }
    return false
  }

  return (
    <TableContainer component={Paper}>
      <CompactTable>
        <TableHead>
          <TableRow>
            <CompactTableCell>Item</CompactTableCell>
            <CompactTableCell>Price</CompactTableCell>
            <CompactTableCell>Collect</CompactTableCell>
            <CompactTableCell>Status</CompactTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(orders).map((order) => (
            <TableRow key={order._id}>
              <CompactTableCell>
                {order.item ?<ItemIcon item={order.item}/> : order.itemName}
              </CompactTableCell>
              <CompactTableCell>{order.price}</CompactTableCell>
              <CompactTableCell>
                {ableToCollect(order) && (
                  <CollectButton onClick={() => handleCollectClick(order)}>
                    <CheckIcon fontSize="small" color="primary" />
                  </CollectButton>
                )}
              </CompactTableCell>
              <CompactTableCell>
                {order.status}
                {order.status == 'active' && (
                  <CollectButton onClick={() => handleCancelClick(order)}>
                    <CancelIcon fontSize="small" color="primary" />
                  </CollectButton>
                )}
              </CompactTableCell>
            </TableRow>
          ))}
        </TableBody>
      </CompactTable>
    </TableContainer>
  );
};

export default MyItemOrdersTable;
