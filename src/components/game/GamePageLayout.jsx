import React from 'react';

import { Grid, Container, Box} from '@mui/material';

import GameHeader from './GameHeader';
import GameContent from './GameContent';

export default function GamePageLayout() {

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      {/* makes it single page that does not scroll the page */}
      {/* header takes 7% view */}
      <Box height={"7vh"} overflow={"hidden"}>
        <GameHeader/>
      </Box>
      {/* the rest of the horizontal space for the gameContent */}
      <Box flex={1} overflow={"hidden"}>
        <GameContent/>
      </Box>
    </Box>
  );
}
