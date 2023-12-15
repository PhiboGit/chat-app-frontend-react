import React, { useContext, useState, useMemo } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';
import ExpBar from '../ExpBar';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

import CarpenterIcon from '@mui/icons-material/Carpenter';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import GrassIcon from '@mui/icons-material/Grass';
import ForestIcon from '@mui/icons-material/Forest';
import TerrainIcon from '@mui/icons-material/Terrain';

import ResourceIcon from './ResourceIcon';
import ItemIcon from './ItemIcon';


const InventoryOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const resources = useMemo(() => characterData.resources,[characterData.resources])

  const idToItemMap = characterData.items.reduce((map, item) => {
    map[item._id] = item;
    return map;
  }, {});

  


  return (
    <>
    Resources: 
    <Box>
      <Grid container spacing={1}>
        {Object.entries(resources).map(([name, value]) => {
          if (resources[name] > 0) return(
          <Grid item key={name}>
            <ResourceIcon
              amount={value}
              name={name}
            />
          </Grid>
        )})}          
      </Grid>
    </Box>
    Items:
    <Grid container spacing={1}>
        {Object.entries(idToItemMap).map(([itemId, value]) => {
         return(
          <Grid item key={itemId}>
            <ItemIcon
              item={idToItemMap[itemId]}
            />
          </Grid>
        )})}          
      </Grid>
    </>
  );
};

export default InventoryOverview;