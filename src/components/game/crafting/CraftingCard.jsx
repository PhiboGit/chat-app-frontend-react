import React, { useState, useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RecipeIcon from '../gameComponents/icons/RecipeIcon';

import { GameDataContext } from '../dataProviders/GameDataProvider';
import RecipeSelector from '../gameComponents/RecipeSelector';
import RecipeInfo from '../gameComponents/RecipeInfo';
import StartActionController from '../gameComponents/StartActionController';
import IngredientSelector from '../gameComponents/IngredientSelector';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import StartActionControllerCard from '../gameComponents/StartActionControllerCard';



export default function CraftingCard({profession, recipeName}) {
  const { gameData, send } = useContext(GameDataContext);
  

  const [expanded, setExpanded] = React.useState(true);

  const [selectedIngredients, setSelectedIngredients] = useState(gameData.recipesData[recipeName].ingredients
    .map((ingredientSlot) => ingredientSlot.required ? ingredientSlot.slot[0].resource : ""));

  useEffect(() => {
    setSelectedIngredients(gameData.recipesData[recipeName].ingredients
      .map((ingredientSlot) => ingredientSlot.required ? ingredientSlot.slot[0].resource : ""));
  }, [recipeName])

  const [limit, setLimit] = useState(false);
  const [iterations, setIterations] = useState(1);



  function handleStart(){
    const crafting = {
      "type": "action",
      "actionType": profession,
      "task": "crafting",
      "limit": limit,
      "iterations": parseInt(iterations),
      "args": {
          "recipe": recipeName,
          "ingredients": selectedIngredients.filter((value) => value !== "")
      }
    }
    console.log("crafting: ", crafting);
    //send(crafting)
  }

  return (
    <Card sx={{ maxWidth: 345 }}>     
      <CardHeader
        avatar={
          <Avatar>
            P
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <Collapse in={expanded} timeout={600} unmountOnExit>
        <CardContent>
          <RecipeInfo recipeName={recipeName}/>
          <IngredientSelector
            recipeName={recipeName}
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
          />
        </CardContent>
      </Collapse>
      <Divider/>
      <CardContent>
        <StartActionControllerCard
          limit={limit}
          setLimit={setLimit}
          iterations={iterations}
          setIterations={setIterations}
          startDisabled={selectedIngredients.length < 1}
          onClickStart={handleStart}
        />
      </CardContent>
    </Card>
  );
}
