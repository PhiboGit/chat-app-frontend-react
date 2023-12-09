import React, { useContext, useMemo } from 'react';

import ActionQueue from './ActionQueue';
import CurrentAction from './CurrentAction';

const actionOverview = () => {
  return (
    <>
      <CurrentAction />
      <ActionQueue />
    </>
  );
};

export default actionOverview;