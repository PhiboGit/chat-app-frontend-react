import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { GameDataContext } from '../../dataProviders/GameDataProvider';

import ChipStack from "../ChipStack";

const TooltipTitleResource = ({name, amount}) => {
  const { gameData } = useContext(GameDataContext);

  const info = gameData.resourcesInfo[name]

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