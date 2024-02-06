import React from 'react';
import Typography from '@mui/material/Typography';

import ChipStack from "../ChipStack"

const TooltipTitleGatheringTool = ({ item }) => {
  const renderStat = (stat, label) => {
    if (item.properties.gearScores && item.properties.gearScores[stat]) {
      return (
        <React.Fragment key={stat}>
          <b>{`${label}: ${item.properties.gearScores[stat]}`}</b>
          <br/>
        </React.Fragment>
      );
    }
    return null;
  };

  const renderGearScoreStats = (type) => {
    const stats = ['speed', 'luck', 'yieldMax', 'exp'];
    return stats.map(stat => renderStat(`${stat}_${type}`, `${type.charAt(0).toUpperCase()}${type.slice(1)} ${stat.charAt(0).toUpperCase()}${stat.slice(1)}`));
  };

  return (
    <React.Fragment>
      <Typography color="inherit">{item.name}</Typography>
      {`${item.equipmentType} - ${item.equipmentSkills}`}
      <ChipStack rarity={item.rarity} tier={item.tier} soulbound={item.soulbound} />
      <hr/>
      <b>{`Level: ${item.level}`}</b>
      <br/>
      <b>{`Enchanting: +${item.enchantingLevel}`}</b>
      <hr/>

      <b>{`GearScore: ${item.properties.totalGearScore}`}</b>
      <br/>

      {renderGearScoreStats('mining')}
      {renderGearScoreStats('woodcutting')}
      {renderGearScoreStats('harvesting')}

      {renderStat('str', 'STR')}
      {renderStat('con', 'CON')}
      {renderStat('int', 'INT')}
      {renderStat('dex', 'DEX')}
      {renderStat('foc', 'FOC')}
      <hr/>
      <b>{`Id: ${item._id}`}</b>
    </React.Fragment>
  );
};

export default TooltipTitleGatheringTool;