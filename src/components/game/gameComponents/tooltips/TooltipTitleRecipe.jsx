import Typography from '@mui/material/Typography';
import React , { useContext } from 'react';

import { useCharacterStore } from '../../dataProviders/CharacterProvider';
import { GameDataContext } from '../../dataProviders/GameDataProvider';

const TooltipTitleRecipe = ({recipeName}) => {

  const { gameData } = useContext(GameDataContext);
  const recipe = gameData.recipesData[recipeName]
  const resourceInfo = gameData.resourcesInfo[recipe.name]


  const [professionLevel] = useCharacterStore(char => char.skills[recipe.profession].level)

  return (
    <React.Fragment>
      <Typography color="inherit">{resourceInfo.displayName}{recipe.amount > 1 ? ` x${recipe.amount}` : ""}</Typography>
      <hr/>
      <b>
        <span style={{ color: recipe.level > professionLevel ? 'red' : 'green' }}>
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