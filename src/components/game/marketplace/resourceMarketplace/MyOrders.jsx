import React, { useContext, useMemo } from 'react';
import { CharacterDataContext } from '../../dataProviders/CharacterDataProvider';
import { GameDataContext } from '../../dataProviders/GameDataProvider';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MyOrdersTable from './MyOrdersTable';

const MyOrders = ({}) => {

  const { gameData, send } = useContext(GameDataContext);
  const { characterData, idToOrderMap } = useContext(CharacterDataContext);

  const orders = useMemo(() => idToOrderMap,[idToOrderMap])

  return (
    <Container maxWidth="xl">
      <Box sx={{ bgcolor: 'rgba(169, 150, 230, 0.8)' }}>

        <Box display="flex" flexDirection="row" alignItems="flex-start">
          <Box sx={{ bgcolor: 'rgba(169, 150, 230, 0.8)', padding: 1, margin: 1 }}>
            <Typography variant="h6">Your Sell-Orders</Typography>
            <MyOrdersTable orders={Object.values(orders).filter(order => order.orderType === "sellOrder")} />
          </Box>
          <Box sx={{ bgcolor: 'rgba(169, 150, 230, 0.8)', padding: 1, margin: 1 }}>
            <Typography variant="h6">Your Buy-Orders</Typography>
            <MyOrdersTable orders={Object.values(orders).filter(order => order.orderType === "buyOrder")} />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default MyOrders