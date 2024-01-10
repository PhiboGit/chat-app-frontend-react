import React from 'react';
import Typography from '@mui/material/Typography';

import ChipStack from "../ChipStack"

const TooltipTitleResource = ({name, amount}) => {
  const matchResult = name.match(/^(.*?)(T(\d))?(_(.*))?$/);
   // "woodT1_common"
   //matchResult[0] "woodT1_common"
   //matchResult[1] "wood"
   //matchResult[2] "T1"
   //matchResult[3] "1"
   //matchResult[4] "_common"
   //matchResult[5] "common"

  const resourceName = matchResult[1]
  const tier = parseInt(matchResult[3]) ? parseInt(matchResult[3]) : undefined
  const rarity = matchResult[5]

  return (
    <React.Fragment>
      <Typography color="inherit">{resourceName}</Typography>
      {amount && <b>Amount: {amount}</b>} 
      <ChipStack rarity={rarity} tier={tier}/>
      <hr/>
      <u>{'amazing content'}</u>.
      {"It's very engaging. Right?"}
    </React.Fragment>
  )
}

export default TooltipTitleResource;