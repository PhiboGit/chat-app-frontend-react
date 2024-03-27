import React from 'react';

import Grid from '@mui/material/Grid';


import ClickAwayPopper from '../../common/ClickAwayPopper';
import { useCharacterStore } from '../dataProviders/CharacterProvider';
import ResourceIcon from '../gameComponents/icons/ResourceIcon';
import ResourceActionMenu from './ResourceActionMenu';


// each Item obersves its own state. 
// now the grid only re-renders the item that changed, not the whole grid.
const InventoryResourceGridItem = ({name}) => {
    
  const [value] = useCharacterStore((char) => char.resources[name])

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openPopperResource = (event) => {
    console.log('openPopper')
    setAnchorEl(event.currentTarget);
  };

  const closePopper = () => {
    console.log('closePopper')
    setAnchorEl(null);
  };

  return(
    value > 0 && <Grid item key={name}>
      <ResourceIcon
        amount={value}
        name={name}
        onClick={(event) => openPopperResource(event, name)}
        />
      <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
        <ResourceActionMenu resource={name} closeMenu={closePopper}/>
      </ClickAwayPopper>
    </Grid>

  )
          
};

export default InventoryResourceGridItem;