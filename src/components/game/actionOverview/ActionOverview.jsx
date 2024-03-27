import React from 'react';

import { Box } from '@mui/material';
import ActionQueue from './ActionQueue';
import CurrentAction from './CurrentAction';

const actionOverview = () => {
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <Box flex={1} >
        <CurrentAction />

      </Box>
      <Box flex={1} >
        <ActionQueue />

      </Box>
    </Box>
  );
};

export default actionOverview;