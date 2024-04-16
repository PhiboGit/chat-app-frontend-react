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
import { Box, Divider, Skeleton, Tab, Tabs } from '@mui/material';
import StartActionControllerCard from '../gameComponents/StartActionControllerCard';
import CustomSvgIcon from '../gameComponents/icons/CustomSvgIcon';
import CraftingInfoText from './CraftingInfoText';

const SkeletonCard = () => {
  return (
    <Card sx={{ maxWidth: 500 }}>     
        <CardContent sx={{ display: 'flex', flexDirection: 'row'}}>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
          <Skeleton width="100%" sx={{ marginLeft: 2 }}>
              <Typography>.</Typography>
            </Skeleton>
        </CardContent>
        <CardContent>
          <Skeleton variant="rectangular" width="100%">
            <div style={{ paddingTop: '57%' }} />
          </Skeleton>
        </CardContent>
    </Card>
  )
}
  


export default function CraftingCard({ craftingActionState, dispatch }) {
  const { gameData, send } = useContext(GameDataContext);
  const recipe = gameData.recipesData[craftingActionState.recipeName]
  const resourceInfoDict = gameData.resourcesInfo

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let timeoutId = null;
    // changed recipe from a selected one
    if(expanded && craftingActionState.recipeName) {
      setExpanded(false);
      timeoutId = setTimeout(() => {
        setExpanded(true);
      }, 600); 
    } 
    // when non was previously selected, eg. first time
    if (!expanded && craftingActionState.recipeName) {
      setExpanded(true);
    }
    // when non is selected, eg. profession changed
    if (!craftingActionState.recipeName) {
      setExpanded(false);
    }

    return () => clearTimeout(timeoutId);
  }, [craftingActionState.recipeName]);

  function handleStart(){
    const crafting = {
      "type": "action",
      "actionType": craftingActionState.profession,
      "task": "crafting",
      "limit": craftingActionState.limit,
      "iterations": parseInt(craftingActionState.iterations),
      "args": {
          "recipe": craftingActionState.recipeName,
          "ingredients": craftingActionState.selectedIngredients.filter((value) => value !== "")
      }
    }
    console.log("crafting: ", crafting);
    send(crafting)
  }

  const CustomIcon = CustomSvgIcon(craftingActionState.recipeName)

  return (
    <>
    { !craftingActionState.recipeName ? 
      <SkeletonCard/>
      :
      
      <Card sx={{ maxWidth: 500 }}>     
      <Collapse in={expanded} timeout={600} unmountOnExit>
        <CardHeader
          avatar={
            <Avatar>
              <CustomIcon fontSize='large'/>
            </Avatar>
          }
          title={resourceInfoDict[recipe.name].displayName}
          subheader={resourceInfoDict[recipe.name].description}
          />
        <CardContent>
          <CraftingInfoText recipeName={craftingActionState.recipeName}/>
        </CardContent>
        <CardContent>
          <IngredientSelector
              recipeName={craftingActionState.recipeName}
              selectedIngredients={craftingActionState.selectedIngredients}
              setSelectedIngredients={() => null}
              dispatch={dispatch}
              />
        </CardContent>
      </Collapse>
      <Divider/>
      <CardContent>
        <StartActionControllerCard
          limit={craftingActionState.limit}
          setLimit={(limit) => dispatch({ type: 'changed_limit', limit: limit })}
          iterations={craftingActionState.iterations}
          setIterations={(iterations) => dispatch({ type: 'changed_iterations', iterations: iterations })}
          startDisabled={craftingActionState.selectedIngredients.length < 1}
          onClickStart={handleStart}
          />
      </CardContent>
    </Card>}
    </>
  );
}
