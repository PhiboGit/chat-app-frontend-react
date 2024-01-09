import React, { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';

const ClickAwayPopper = ({ children, anchorEl, setAnchorEl }) => {

  const open = Boolean(anchorEl);

  const closePopper = () => {
    console.log('ClickAwayPopper closePopper')
    setAnchorEl(null);
  };
  

  return (
    <Box>
      {open && <ClickAwayListener onClickAway={closePopper}>
        <Popper id="click-away-popper" open={open} anchorEl={anchorEl} placement="bottom">
          {children}
        </Popper>
      </ClickAwayListener>}
    </Box>
  );
};

export default ClickAwayPopper;
