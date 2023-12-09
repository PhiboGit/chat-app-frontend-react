import React, { useContext, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';
import ExpBar from '../ExpBar';
import GatheringIcons from './GatheringIcons';

import CarpenterIcon from '@mui/icons-material/Carpenter';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import './GatheringOverview.css';
import Button from '@mui/material/Button';

const GatheringOverview = () => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  
  const [iterations, setIterations] = useState(1);
  const [profession, setProfession] = useState();
  const [tier, setTier] = useState();

  const [selected, setSelected] = useState(null);

  function selectGathering(profession, tier, key){
    console.log(`selectGathering: ${key}`);
    setSelected(key)
    setProfession(profession)
    setTier(tier)
  }

  const [limit, setLimit] = React.useState(false);

  const handleLimit = (event) => {
    setLimit(event.target.checked);
    if (event.target.checked) {
      setIterations(100);
    } else {
      setIterations(1);
    }
  };

  const handleIterations = (event) => {
    setIterations(parseInt(event.target.value))
  }

  const startAction = () => {
    const action = {
      "type": "action",
      "actionType": profession,
      "task": "gathering",
      "limit": limit,
      "iterations": parseInt(iterations),
      "args": {
          "tier": tier + 1
        }
    }
    console.log("Starting action: ", action)
    send(action);
  };

  return (
    <>
      <div className="gathering-container">
        <ExpBar profession={"mining"}/>
        <GatheringIcons profession={"mining"} selectGathering={selectGathering} selected={selected}/>
        <ExpBar profession={"woodcutting"}/>
        <GatheringIcons profession={"woodcutting"} selectGathering={selectGathering} selected={selected}/>
        <ExpBar profession={"harvesting"}/>
        <GatheringIcons profession={"harvesting"} selectGathering={selectGathering} selected={selected}/>
      </div>
      {selected &&(<div className="startGathering-container">
        <Switch checked={limit} onChange={handleLimit} inputProps={{ 'aria-label': 'controlled' }}/>
        {limit && (<TextField
          label="Iterations"
          id="outlined-size-small"
          defaultValue= {iterations}
          size="small"
          onChange={handleIterations}
        />)}
        <Button onClick={startAction} variant="contained">Start</Button>
    </div>)}
    </>
  );
};

export default GatheringOverview;