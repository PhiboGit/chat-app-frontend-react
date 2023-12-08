import React, { useContext, useEffect, useState } from 'react';
import { GameDataContext } from './dataProviders/GameDataProvider';
import { CharacterDataContext } from './dataProviders/CharacterDataProvider';

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
      <p>{profession}</p>
      <progress value={exp} max={nextExp} title={`${exp} / ${nextExp} : ${nextExp-exp}`} />
    </div>
  );
}