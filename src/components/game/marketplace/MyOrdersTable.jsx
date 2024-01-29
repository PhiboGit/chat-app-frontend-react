import React, { useContext, useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, styled } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check'; 
import CancelIcon from '@mui/icons-material/Cancel';
import { GameDataContext } from '../dataProviders/GameDataProvider';

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

const MyOrdersTable = ({ orders }) => {

  const { gameData, send } = useContext(GameDataContext);


  const handleCollectClick = (order) => {
    // Add logic for handling collect click
    console.log('Collect clicked for order:', order._id);

    const collectOrder = {
      "type": "marketplace/collect",
      "args": {
          "orderId": order._id
      }
    }
    send(collectOrder)
  };

  const handleCancelClick = (order) => {
    // Add logic for handling collect click
    console.log('Cancel clicked for order:', order._id);

    const cancelOrder = {
      "type": "marketplace/cancel",
      "args": {
          "orderId": order._id
      }
    }
    send(cancelOrder)
  };

  return (
    <TableContainer component={Paper}>
      <CompactTable>
        <TableHead>
          <TableRow>
            <CompactTableCell>Resource</CompactTableCell>
            <CompactTableCell>Price</CompactTableCell>
            <CompactTableCell>Progress</CompactTableCell>
            <CompactTableCell>Collect Units</CompactTableCell>
            <CompactTableCell>Collect Gold</CompactTableCell>
            <CompactTableCell>Status</CompactTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(orders).map((order) => (
            <TableRow key={order._id}>
              <CompactTableCell>{order.resource}</CompactTableCell>
              <CompactTableCell>{order.price}</CompactTableCell>
              <CompactTableCell>{order.units} / {order.unitsInit}</CompactTableCell>
              <CompactTableCell>
                {order.unitsToCollect}
                {order.unitsToCollect > 0 && (
                  <CollectButton onClick={() => handleCollectClick(order)}>
                    <CheckIcon fontSize="small" color="primary" />
                  </CollectButton>
                )}
              </CompactTableCell>
              <CompactTableCell>
                {order.goldToCollect}
                {order.goldToCollect > 0 && (
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

export default MyOrdersTable;
