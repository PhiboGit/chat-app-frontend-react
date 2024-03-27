import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../../dataProviders/GameDataProvider';

import ClickAwayPopper from '../../../common/ClickAwayPopper';

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

const SellOrderMenu = ({resource, anchorEl, setAnchorEl}) => {

  const { gameData, send } = useContext(GameDataContext);

  const [price, setPrice] = useState(20)
  const [units, setUnits] = useState(1)

  const sell = () => {
    const sellOrder = {
      "type": "marketplace/sellOrder",
      "args": {
          "resource": resource,
          "units": units,
          "price": price,
          "days": 2
      }
    }
    send(sellOrder)
    setAnchorEl(null)
  }

  return (
    <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
      <Paper elevation={3} sx={{ padding: 1, margin: 1 }}>
        <Container maxWidth="xs">
          <Box
            sx={{ bgcolor: 'rgba(160, 177, 186, 0.8)'}}
          >
            <TextField
            label="Units"
            id="outlined-size-small"
            defaultValue= {units}
            size="small"
            onChange={(event) => setUnits(parseInt(event.target.value))}
            />
            <TextField
            label="Price per Unit"
            id="outlined-size-small"
            defaultValue= {price}
            size="small"
            onChange={(event) => setPrice(parseInt(event.target.value))}
            />
            <Typography>You get {price * units} gold!</Typography>
            <Button onClick={sell} variant="contained">Sell</Button>
          </Box>
        </Container>
      </Paper>
    </ClickAwayPopper>
  )
}

export default SellOrderMenu;