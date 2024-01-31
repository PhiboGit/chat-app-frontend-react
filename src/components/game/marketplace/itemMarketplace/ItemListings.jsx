import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../../dataProviders/CharacterDataProvider';

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

import ResourceIcon from '../../gameComponents/icons/ResourceIcon';
import ItemOrderBook from './ItemOrderBook';




const ItemListings = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext)
  
  const resourcesInfo = gameData.resourcesInfo

  const filteredResources = Object.fromEntries(
    Object.entries(resourcesInfo).filter(([key, value]) => value.tags.includes("Item") && value.rarity == "common")
  );

  const [itemName, setItemName] = React.useState(null);

  return (
    <Container maxWidth="lg">
      <Box 
        display="flex"
        flexDirection='column'
        alignItems="center"
        sx={{ bgcolor: 'rgba(169, 223, 251, 0.8)'}}>
        {!itemName &&<Container maxWidth="md">
          <Box sx={{ bgcolor: 'rgba(169, 150, 230, 0.8)' }}>
            <Grid container spacing={0.2}>
              {Object.keys(filteredResources).map((key) => 
                <Grid item key={key}>
                  <ResourceIcon name={key} onClick={() => setItemName(resourcesInfo[key].itemName)}/>
                </Grid>
              )}
            </Grid>
          </Box>
        </Container>}

        {itemName &&<Container maxWidth="md">
          <Box sx={{ bgcolor: 'rgba(169, 150, 230, 0.8)' }}>
            <Button variant='contained' onClick={() => setItemName(null)}>View all Items</Button>
            <ItemOrderBook itemName={itemName}/>
          </Box>
        </Container>}
      </Box>
    </Container>
  );
};

export default ItemListings;