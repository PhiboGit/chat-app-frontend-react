import React from 'react';

import Grid from '@mui/material/Grid';


import ClickAwayPopper from '../../common/ClickAwayPopper';
import { useItemIdMapStore } from '../dataProviders/ItemProvider';
import ItemIcon from '../gameComponents/icons/ItemIcon';
import ItemActionMenu from './ItemActionMenu';


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