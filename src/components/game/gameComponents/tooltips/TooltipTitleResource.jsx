import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../../dataProviders/GameDataProvider';
import Typography from '@mui/material/Typography';

import ChipStack from "../ChipStack"

const TooltipTitleResource = ({name, amount}) => {
  const { gameData } = useContext(GameDataContext);

  const info = gameData.resourcesInfo[name]

  const matchResult = name.match(/^(.*?)(T(\d))?(_(.*))?$/);
   // "woodT1_common"
   //matchResult[0] "woodT1_common"
   //matchResult[1] "wood"
   //matchResult[2] "T1"
   //matchResult[3] "1"
   //matchResult[4] "_common"
   //matchResult[5] "common"

  const resourceName = info.displayName || name
  const tier = info.tier || 0
  const rarity = info.rarity || "undef"

  return (
    <React.Fragment>
      <Typography color="inherit">{resourceName}</Typography>
      {amount && <b>Amount: {amount}</b>} 
      <ChipStack rarity={rarity} tier={tier}/>
      <hr/>
      {JSON.stringify(info)}
    </React.Fragment>
  )
}

export default TooltipTitleResource;