import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from './dataProviders/GameDataProvider';
import { CharacterDataContext } from './dataProviders/CharacterDataProvider';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function ExpBar({ profession }) {
  const { gameData } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const [exp, setExp] = useState(getExp(profession));
  const [nextExp, setNextExp] = useState(getNextExp(profession));

  useEffect(() => {
    setExp(getExp(profession));
    setNextExp(getNextExp(profession));
    
  }, [characterData, profession]);

  function getLevel(profession) {
    if (profession === 'character'){
      return characterData.level;
    }
    return characterData.skills[profession].level
  }

  function getExp(profession) {
    const currentLevel = getLevel(profession);
    if (profession === 'character') {
      return characterData.exp - gameData.expTable.Exp[`${currentLevel}`]
    }
    return characterData.skills[profession].exp - gameData.expTable.Exp[`${currentLevel}`]
  }

  function getNextExp(profession) {
    const currentLevel = getLevel(profession);
    return gameData.expTable.Exp[`${currentLevel + 1}`] - gameData.expTable.Exp[`${currentLevel}`]
  }

  return (
    <div>
      <h3>{profession} {getLevel(profession)}</h3>
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={(exp/nextExp) * 100} />
      </Box>
    </div>
  );
}