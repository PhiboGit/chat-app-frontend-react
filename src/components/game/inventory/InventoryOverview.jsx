import React, { useContext, useState, useMemo } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';
import ExpBar from '../ExpBar';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import CarpenterIcon from '@mui/icons-material/Carpenter';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import GrassIcon from '@mui/icons-material/Grass';
import ForestIcon from '@mui/icons-material/Forest';
import TerrainIcon from '@mui/icons-material/Terrain';

import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';


const Item = ({ icon: IconComponent, value, name }) => {
  const [backgroundColor, setBackgroundColor] = useState('white');

  const paperStyle = {
    position: 'relative',
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    backgroundColor: backgroundColor,
  };

  const iconStyle = {
    width: '100%',
    height: '100%',
  };

  const valueStyle = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '2px 4px',
    borderRadius: '4px',
    fontSize: '12px',
  };

  const handleHover = () => {
    setBackgroundColor('lightgray');
  };

  const handleLeave = () => {
    setBackgroundColor('white');
  };

  return (
    <Paper
      title={name}
      style={paperStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div style={iconStyle}>
        {IconComponent && <IconComponent style={{ width: '100%', height: '100%' }} />}
      </div>
      {value && <div style={valueStyle}>{value}</div>}
    </Paper>
  );
};

const InventoryOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const resources = useMemo(() => characterData.resources,[characterData.resources])

  const idToItemMap = characterData.items.reduce((map, item) => {
    map[item._id] = item;
    return map;
  }, {});

  
  const getIcon = (profession) => {
    switch (profession) {
      case 'mining': return TerrainIcon
      case 'woodcutting': return ForestIcon
      case 'harvesting': return GrassIcon
      default:
        return CarpenterIcon
    }
  }


  return (
    <>
    Resources: 
    <Box>
      <Grid container spacing={1}>
        {Object.entries(resources).map(([name, value]) => {
          if (resources[name] > 0) return(
          <Grid item key={name}>
            <Item
              icon={getIcon(name)}
              value={value}
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
            <Item
              icon={getIcon(itemId)}
              name={itemId}
            />
          </Grid>
        )})}          
      </Grid>
    </>
  );
};

export default InventoryOverview;