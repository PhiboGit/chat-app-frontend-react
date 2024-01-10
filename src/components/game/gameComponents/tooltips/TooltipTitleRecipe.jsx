import React, { useContext, useState, useMemo } from 'react';
import Typography from '@mui/material/Typography';

import { CharacterDataContext } from '../../dataProviders/CharacterDataProvider';
import { GameDataContext } from '../../dataProviders/GameDataProvider';


const TooltipTitleRecipe = ({recipe, profession, recipeName}) => {

  const { gameData } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const skillData = characterData.skills[profession]

  return (
    <React.Fragment>
      <Typography color="inherit">{recipe.amount} x {recipeName}</Typography>
      <hr/>
      <b>
        <span style={{ color: recipe.level > skillData.level ? 'red' : 'green' }}>
          {`Level: ${recipe.level}`}
        </span>
      </b>
      <br/>
      <b>{`Exp: ${recipe.exp}`}</b>
      <br/>
      <b>{`Exp Char: ${recipe.expChar}`}</b>
      <br/>
      <b>{`Time: ${recipe.time}ms`}</b>
      <br/>
      
    </React.Fragment>
  )
}

export default TooltipTitleRecipe