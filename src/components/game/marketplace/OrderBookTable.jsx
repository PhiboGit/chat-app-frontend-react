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




const OrderBookTable = ({orderBook}) => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  return (
    <TableContainer component={Paper} >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell>Total Units</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderBook.map((order) => (
            <TableRow key={order.price}>
              <TableCell>{order.price}</TableCell>
              <TableCell>{order.totalUnits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>         
  );
};

export default OrderBookTable;