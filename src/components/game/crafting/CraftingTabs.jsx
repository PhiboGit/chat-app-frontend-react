import { Container, Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FavoriteIcon from '@mui/icons-material/Favorite';

import React, { useContext } from 'react';
import CraftingOverview from './CraftingOverview';
import { craftingActionReducer, initialState } from './craftingActionReducer';
import { GameDataContext } from '../dataProviders/GameDataProvider';

const CraftingTabs = () => {
  const { gameData } = useContext(GameDataContext);
  const [craftingActionState, dispatch] = React.useReducer(craftingActionReducer, {...initialState, gameData});

  const handleChange = (event, newValue) => {
    dispatch({ type: 'changed_profession', profession: newValue });
  };
  
  return (
   <Container maxWidth="md">
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs variant="scrollable" scrollButtons="auto" value={craftingActionState.profession} onChange={handleChange}>
        <Tab value={"toolsmith"} label="Toolsmith" icon={<FavoriteIcon />} iconPosition="start" />
        <Tab value={"armorer"} label="Armorsmith"  />
      </Tabs>
    </Box>

    <Box flex={1} overflow="auto">
      <CraftingOverview craftingActionState={craftingActionState} dispatch={dispatch}/>
    </Box>
  </Container>
  );
}

export default CraftingTabs