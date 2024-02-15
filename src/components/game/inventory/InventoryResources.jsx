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


const InventoryResources = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const resources = useMemo(() => characterData.resources,[characterData.resources])
  const [selectedResource, setSelectedResource] = useState()

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openPopperResource = (event, resourceName) => {
    console.log('openPopper')
    setSelectedResource(resourceName)
    setAnchorEl(event.currentTarget);
  };

  const closePopper = () => {
    console.log('closePopper')
    setSelectedResource(null)
    setAnchorEl(null);
  };

  return (
    <Box>
    Resources: 
      <Grid container spacing={1}>
        {Object.entries(resources).map(([name, value]) => {
          if (resources[name] > 0) return(
          <Grid item key={name}>
            <ResourceIcon
              amount={value}
              name={name}
              onClick={(event) => openPopperResource(event, name)}
            />
          </Grid>
        )})}          
      </Grid>
      <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
        {selectedResource && <ResourceActionMenu resource={selectedResource} closeMenu={closePopper}/>}
      </ClickAwayPopper>
    </Box>
  );
};

export default InventoryResources;