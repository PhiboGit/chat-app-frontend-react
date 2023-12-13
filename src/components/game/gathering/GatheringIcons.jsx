import React, { useContext, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';

import CarpenterIcon from '@mui/icons-material/Carpenter';
import GrassIcon from '@mui/icons-material/Grass';
import ForestIcon from '@mui/icons-material/Forest';
import TerrainIcon from '@mui/icons-material/Terrain';

import './GatheringOverview.css';

const gatheringIcon = {
  "mining": TerrainIcon,
  "woodcutting": ForestIcon,
  "harvesting": GrassIcon
}

const GatheringIcons = ({profession, selectGathering, selected}) => {
  const { gameData } = useContext(GameDataContext);

  const gatheringData = gameData.gatheringResourcesData[profession].tiers
  const tiers = Object.keys(gatheringData);
  const Icon = gatheringIcon[profession]
  
  function getGatheringData(tier){
    const tierData = gatheringData[tier]
    const exp = tierData.exp
    const expChar = tierData.expChar
    const level = tierData.level
    const time = tierData.time
    const amountMin = tierData.amountMin
    const amountMax = tierData.amountMax
    
    return {exp, expChar, level, time, amountMin, amountMax}
  }
  
  const [showTooltip, setShowTooltip] = useState({});
  

  return (
    <div className="profession-container">
      {tiers.map((value) => { 
        const tier = parseInt(value);
        const key = `${profession}-${tier}`
        return(
      
      <div
        key={key}
        onClick={() => selectGathering(profession, tier, key)}
        onMouseEnter={() => setShowTooltip(prevState => ({ ...prevState, [tier]: true }))}
        onMouseLeave={() => setShowTooltip(prevState => ({ ...prevState, [tier]: false }))}
        className={`icon-container ${selected === key ? 'selected' : ''}`}>
        <Icon sx={{ fontSize: 100 }}/>

        {showTooltip[tier] && (
          <div className="tooltip">
            <div className="tooltip-text">
              <span>{profession} T{tier+1}</span>
              <div className="loot-text">
                <div>Level: {getGatheringData(tier).level}</div>
                <div>Exp-Char: {getGatheringData(tier).expChar}</div>
                <div>{profession}-Exp: {getGatheringData(tier).exp}</div>
                <div>Amount: {getGatheringData(tier).amountMin}-{getGatheringData(tier).amountMax}</div>
                <div>Duration: {Math.round(getGatheringData(tier).time/100)/10}s</div>
              </div>
            </div>
          </div>
        )}
      </div>
      )})}
    </div>
  );

}

export default GatheringIcons;