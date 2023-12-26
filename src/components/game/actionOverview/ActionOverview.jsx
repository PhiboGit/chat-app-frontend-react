import React, { useContext, useMemo } from 'react';

import ActionQueue from './ActionQueue';
import CurrentAction from './CurrentAction';
import { Box } from '@mui/material';

const actionOverview = () => {
  return (
    <Box >
      <CurrentAction />
      <ActionQueue />
    </Box>
  );
};

export default actionOverview;