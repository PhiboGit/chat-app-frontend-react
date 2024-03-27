import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const OrderBookTable = ({orderBook}) => {

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