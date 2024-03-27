import React, { useContext, useState } from 'react';
import { CharacterDataContext } from '../../dataProviders/CharacterDataProvider';
import { GameDataContext } from '../../dataProviders/GameDataProvider';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ItemIcon from '../../gameComponents/icons/ItemIcon';




const ItemOrderBookTable = ({orderBook}) => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const [price, setPrice] = useState(20)
  const [units, setUnits] = useState(1)

  const buy = (orderId) => {
    const buyOrder = {
      "type": "item_marketplace/buyOrder",
      "args": {
        "item_orderId": orderId
      }
    }
    send(buyOrder)
  }

  return (
    <TableContainer component={Paper} >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderBook.map((order) => (
            <TableRow key={order._id}>
              <TableCell>
                <ItemIcon item={order.item}/>
              </TableCell>
              <TableCell>{order.price}</TableCell>
              <TableCell>
                <Button variant='contained' onClick={() => buy(order._id)}>Buy</Button>  
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>         
  );
};

export default ItemOrderBookTable;