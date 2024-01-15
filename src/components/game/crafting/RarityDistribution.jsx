import React, { Fragment, useContext, useEffect, useState } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import adjustWeights from './Wheights';


const indexToRarity = (index) => {
  switch (index) {
    case 0:
      return 'common';
    case 1:
      return 'uncommon';
    case 2:
      return 'rare';
    case 3:
      return 'epic';
    case 4:
      return 'legendary';
    default:
      return 'common';
  }
};

const getRarityColor = (rarity) => {
  switch (rarity) {
    case 'common':
      return '#b0b0b0';
    case 'uncommon':
      return '#4caf50';
    case 'rare':
      return '#2196f3';
    case 'epic':
      return '#ff9800';
    case 'legendary':
      return '#ff5722';
    default:
      return 'rgba(0, 0, 0, 0.87)';
  }
};

const getColor = (index) => getRarityColor(indexToRarity(index))


const RarityDistribution = ({ recipe, selectedIngredients }) => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const [rarityWeights, setRarityWeights] = useState([0,0,0,0,0])
  useEffect(() => {
    if (selectedIngredients.length > 0){
      setRarityWeights(calculateRarityWeights())
    }
  }, [selectedIngredients]);

  const sum = rarityWeights.reduce((acc, val) => acc + val, 0);

  const calculateRarityWeights = () => {
    const skillLevel = characterData.skills[recipe.profession].level
    const itemLevel = recipe.level
    const table = gameData.craftingTable.equipments

    const rarityWeights = table.rarityWeights
    const defaultWindow = table.defaultWindow

    let startBonus = 0
    let endBonus = 0
    
    for (const selectedItem of selectedIngredients) {
      const item = gameData.craftingMaterials[selectedItem]
      if (!item) continue
      if (item["craftingBonus"]){
        startBonus += item["craftingBonus"]
      }
    }

    let startWindow = defaultWindow[0] + (skillLevel * table.professionLevel.start) + (itemLevel * table.itemLevel.start) + startBonus
    let endWindow = defaultWindow[1] + (skillLevel * table.professionLevel.end) + (itemLevel * table.itemLevel.end) + endBonus

    const weights = adjustWeights(rarityWeights, startWindow, endWindow)

    console.log("Weights: ", weights)
    return weights
  }

  return (
    <Container maxWidth="xs">
      <Box 
        display="flex"
        flexDirection='column'
        alignItems="center"
        sx={{ bgcolor: 'rgba(91, 91, 200, 0.8)'}}>
        <h3>Rarity chances:</h3>

        <Container maxWidth="xs">
          <Box 
            display="flex"
            flexDirection='row'
            alignItems="center"
            sx={{ bgcolor: 'rgba(91, 91, 200, 0.8)'}}>
            {rarityWeights.map((value, index) => {
              const percentage = (value / sum) * 100;
              const color = getColor(index);
              return (
                <Typography
                key={index}
                  variant="body1"
                  color={color}
                  style={{
                    display: 'inline-block',
                    marginRight: '10px',
                    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)',
                  }}
                  >
                  {percentage.toFixed(3)}%
                </Typography>
              );
            })}
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default RarityDistribution;
