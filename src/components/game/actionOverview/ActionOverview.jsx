import React, { useContext, useMemo } from 'react';

import ActionQueue from './ActionQueue';
import CurrentAction from './CurrentAction';
import { Box } from '@mui/material';

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