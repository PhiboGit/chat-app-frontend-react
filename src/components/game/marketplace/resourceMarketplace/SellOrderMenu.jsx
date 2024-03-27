import React, { useContext, useState } from 'react';
import { GameDataContext } from '../../dataProviders/GameDataProvider';

import ClickAwayPopper from '../../../common/ClickAwayPopper';

import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

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