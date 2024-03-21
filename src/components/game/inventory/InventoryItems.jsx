import React, { useContext, useState, useMemo } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import ResourceIcon from '../gameComponents/icons/ResourceIcon';
import { Button, Container, Typography } from '@mui/material';
import ClickAwayPopper from '../../common/ClickAwayPopper';
import ItemActionMenu from './ItemActionMenu';
import ItemIcon from '../gameComponents/icons/ItemIcon';
import ResourceActionMenu from './ResourceActionMenu';


const InventoryItems = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData, idToItemMap } = useContext(CharacterDataContext);

  const items = useMemo(() => characterData.items,[characterData.items])
  const [selectedItem, setSelectedItem] = useState()


  const [anchorEl, setAnchorEl] = React.useState(null);

  const openPopperItem = (event, item) => {
    console.log('openPopper')
    setSelectedItem(item)
    setAnchorEl(event.currentTarget);
  };

  const closePopper = () => {
    console.log('closePopper')
    setSelectedItem(null)
    setAnchorEl(null);
  };

  return (
    <Box>
      Items:
      <Grid container spacing={1}>
        {Object.entries(idToItemMap).map(([itemId, item]) => {
          return(
            <Grid item key={itemId}>
            <ItemIcon
              item={idToItemMap[itemId]}
              onClick={(event) => openPopperItem(event, item)}
              />
          </Grid>
        )})}          
      </Grid>
      <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
        {selectedItem && <ItemActionMenu item={selectedItem} closeMenu={closePopper}/>}
      </ClickAwayPopper>
    </Box>
  );
};

export default InventoryItems;