import React, { useContext, useState, useMemo } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import ResourceIcon from './ResourceIcon';
import ItemIcon from './ItemIcon';
import { Button, Container, Typography } from '@mui/material';
import ClickAwayPopper from '../../common/ClickAwayPopper';


const InventoryOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const resources = useMemo(() => characterData.resources,[characterData.resources])
  const items = useMemo(() => characterData.items,[characterData.items])

  const idToItemMap = items.reduce((map, item) => {
    map[item._id] = item;
    return map;
  }, {});

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openPopover = (event) => {
    console.log('openPopper')
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    console.log('closePopper')
    setAnchorEl(null);
  };

  const handleEquip = (item, skill) => {
    const equip = {
      "type": "equip",
      "args": {
        "itemId": item._id,
        "skill": skill,
        "slot": item.type
      }
    }
    send(equip)
    closePopover()
  }

  const handleSell = (item) => {
    const sell = {
      "type": "sell",
      "args": {
        "itemId": item._id,
      }
    }
    send(sell)
    closePopover()
  }


  return (
    <>
    <Typography>
      {characterData.characterName} {characterData.level}
      Gold: {characterData.currency.gold}
    </Typography>
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
      {Object.entries(idToItemMap).map(([itemId, item]) => {
        return(
        <Grid item key={itemId}>
          <ItemIcon
            item={idToItemMap[itemId]}
            onClick={openPopover}
          />
          <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
            <Container maxWidth="xs">
              <Box
                sx={{
                  bgcolor: 'rgba(160, 177, 186, 0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center', // Optional: Align items in the center horizontally
                }}
              >
                <Button onClick={() => handleSell(item)} key={"sell"} variant="contained">Sell</Button>
                {item.skills.map((skill) => (
                  <Button onClick={() => handleEquip(item, skill)} key={skill} variant="contained">Equip {skill}</Button>
                ))}
              </Box>
            </Container>
          </ClickAwayPopper>
        </Grid>
      )})}          
    </Grid>
    </>
  );
};

export default InventoryOverview;