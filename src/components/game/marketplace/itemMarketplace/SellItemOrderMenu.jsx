import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../../dataProviders/CharacterDataProvider';

import ClickAwayPopper from '../../../common/ClickAwayPopper';
import ItemSelector from '../../gameComponents/ItemSelector';

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
import { TextField } from '@mui/material';

const SellItemOrderMenu = ({itemName, anchorEl, setAnchorEl}) => {

  const { gameData, send } = useContext(GameDataContext);
  const { characterData, idToItemMap } = useContext(CharacterDataContext);

  const [price, setPrice] = useState(20)
  const [itemId, setItemId] = useState("")
  const [item, setItem] = useState()

  const sell = () => {
    const sellOrder = {
      "type": "item_marketplace/sellOrder",
      "args": {
          "itemId": itemId,
          "price": price,
          "days": 2
      }
    }
    send(sellOrder)
    setAnchorEl(null)
  }

  const onItemSelect = (itemId) =>{
    setItem(idToItemMap[itemId])
    setItemId(itemId)
  }

  return (
    <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
      <Paper elevation={3} sx={{ padding: 1, margin: 1 }}>
        <Container maxWidth="xs">
          <Box
            sx={{ bgcolor: 'rgba(160, 177, 186, 0.8)'}}
          >
            <ItemSelector selectedItem={item} items={Object.values(idToItemMap)} onChange={onItemSelect}/>
            <TextField
            label="Price per Unit"
            id="outlined-size-small"
            defaultValue= {price}
            size="small"
            onChange={(event) => setPrice(parseInt(event.target.value))}
            />
            <Typography>You get {price} gold!</Typography>
            <Button onClick={sell} variant="contained">Sell</Button>
          </Box>
        </Container>
      </Paper>
    </ClickAwayPopper>
  )
}

export default SellItemOrderMenu;