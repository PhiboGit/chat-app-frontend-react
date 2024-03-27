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
import { useCharacterStore } from '../dataProviders/CharacterProvider';
import { useItemIdMapStore } from '../dataProviders/ItemProvider';


const InventoryItemGridItem = ({itemId}) => {
    
  const [item] = useItemIdMapStore((map) => map.get(itemId))

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openPopper = (event) => {
    console.log('openPopper')
    setAnchorEl(event.currentTarget);
  };

  const closePopper = () => {
    console.log('closePopper')
    setAnchorEl(null);
  };

  return(
    item && <Grid item key={item._id}>
      <ItemIcon
        item={item}
        onClick={(event) => openPopper(event)}
      />
      <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
        <ItemActionMenu item={item} closeMenu={closePopper}/>
      </ClickAwayPopper>
    </Grid>

  )
          
};

export default InventoryItemGridItem;