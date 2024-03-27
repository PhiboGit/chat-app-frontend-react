import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from './dataProviders/GameDataProvider';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useCharacterStore } from './dataProviders/CharacterProvider';

export default function ExpBar({ profession }) {
  const { gameData } = useContext(GameDataContext);
  const [currentLevel] = useCharacterStore((char) => char.skills[profession].level)
  const [currentExp] = useCharacterStore((char) => char.skills[profession].exp)

  const exp = currentExp - gameData.expTable.Exp[`${currentLevel}`]
  const nextExp = gameData.expTable.Exp[`${currentLevel + 1}`] - gameData.expTable.Exp[`${currentLevel}`]

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={(exp/nextExp) * 100} />
      </Box>
    </div>
  );
}