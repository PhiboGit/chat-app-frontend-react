import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { GameDataContext } from '../../dataProviders/GameDataProvider';

const TooltipGatheringNode = ({ profession, tier}) => {
  const { gameData } = useContext(GameDataContext);
  const nodeData = gameData.gatheringResourcesData[profession].tiers[tier-1]

  return (
    <React.Fragment>
      <Typography color="inherit">{nodeData.displayName}</Typography>
    </React.Fragment>
  )
}

export default TooltipGatheringNode;