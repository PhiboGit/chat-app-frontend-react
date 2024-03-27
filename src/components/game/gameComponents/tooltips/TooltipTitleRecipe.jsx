import Typography from '@mui/material/Typography';
import React from 'react';

import { useCharacterStore } from '../../dataProviders/CharacterProvider';

const TooltipTitleRecipe = ({recipe}) => {

  const [professionLevel] = useCharacterStore(char => char.skills[recipe.profession].level)

  return (
    <React.Fragment>
      <Typography color="inherit">{recipe.amount} x {recipe.name}</Typography>
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