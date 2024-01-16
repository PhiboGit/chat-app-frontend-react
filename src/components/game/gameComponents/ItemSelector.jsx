import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import ItemIcon from './icons/ItemIcon';
import BasicIcon from './icons/BasicIcon';
import ClickAwayPopper from '../../common/ClickAwayPopper';

const ItemSelector = ({ selectedItem, items, hasNullValue, onChange }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openPopper = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopper = () => {
    setAnchorEl(null);
  };

  const onChangeItem = (recipeName) => {
    closePopper()
    onChange(recipeName)
  }

  return (
    <>
     {(selectedItem ? 
      <ItemIcon
      item={selectedItem}
      onClick={(event) => openPopper(event)}
      />
      :
      <BasicIcon
      iconName={"placeholder Text"}
      onClick={(event) => openPopper(event)}
      />)}
      <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
        <Container maxWidth="xs">
          <Box sx={{ bgcolor: 'rgba(160, 157, 146, 0.8)' }}>
            <Grid container spacing={1}>
              {hasNullValue && <Grid item key={"null"}>
                <BasicIcon iconName={"null"} onClick={() => onChangeItem("null")}/>
              </Grid>}
              {items.map((item) => (
                <Grid item key={item._id}>
                  <ItemIcon item={item} onClick={() => onChangeItem(item._id)}/>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </ClickAwayPopper>
    </>
  );
};

export default ItemSelector;
