import React from 'react';
import Typography from '@mui/material/Typography';

import ChipStack from "../ChipStack"

const TooltipTitleGatheringTool = ({ item }) => {
  
  return (
    <React.Fragment>
      <Typography color="inherit">{item.name}</Typography>
      {item.type} {' - '} {item.skills}
      <ChipStack rarity={item.rarity} tier={item.tier} soulbound={item.soulbound} />
      <hr/>
      <b>{`Level: ${item.level}`}</b>
      <br/>
      <b>{`Enchanting: +${item.enchantingLevel}`}</b>
      <hr/>
      <b>{`BaseSpeed: ${item.properties.baseSpeed}%`}</b>
      <br/>
      <b>{`Speed: ${item.properties.speed}%`}</b>
      <br/>
      <b>{`Exp: ${item.properties.exp}%`}</b>
      <br/>
      <b>{`Luck: ${item.properties.luck}`}</b>
      <br/>
      <b>{`YieldMax: ${item.properties.yieldMax }`}</b>
      <br/>
      <hr/>
      <b>{`STR: ${item.properties.str}`}</b>   
      <br/>
      <b>{`CON: ${item.properties.con}`}</b>   
      <br/>
      <b>{`INT: ${item.properties.int}`}</b>   
      <br/>
      <b>{`DEX: ${item.properties.dex}`}</b>   
      <br/>
      <b>{`FOC: ${item.properties.foc}`}</b>   
      <br/>
      <hr/>
      <b>{`Id: ${item._id }`}</b>
      
    </React.Fragment>
  )
}

export default TooltipTitleGatheringTool;