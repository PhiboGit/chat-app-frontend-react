import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import ItemIcon from './icons/ItemIcon';
import BasicIcon from './icons/BasicIcon';

const ItemSelector = ({ items, hasNullValue, onItemClick }) => {
  return (
    <Container maxWidth="xs">
      <Box sx={{ bgcolor: 'rgba(160, 157, 146, 0.8)' }}>
        <Grid container spacing={1}>
          {hasNullValue && <Grid item key={"null"}>
            <BasicIcon iconName={"null"} onClick={() => onItemClick("null")}/>
          </Grid>}
          {items.map((item) => (
            <Grid item key={item._id}>
              <ItemIcon item={item} onClick={() => onItemClick(item._id)}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ItemSelector;
