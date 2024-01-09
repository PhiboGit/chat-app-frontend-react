import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const getRarityColor = (rarity) => {
  switch (rarity) {
    case 'common':
      return '#b0b0b0';
    case 'uncommon':
      return '#4caf50';
    case 'rare':
      return '#2196f3';
    case 'epic':
      return '#a335ee';
    case 'legendary':
      return '#ff9800';
    default:
      return 'rgba(0, 0, 0, 0.87)';
  }
};

const ChipStack = ({rarity, tier, soulbound}) => {
  return (
    <Stack direction="row" spacing={1}>
      {/* Small Chip with custom color */}
      {rarity && <Chip label={rarity} size="small" style={{ backgroundColor: getRarityColor(rarity),  color: 'white', }} />}
      {tier && <Chip label={`T${tier}`} size="small" style={{ backgroundColor: 'rgba(220, 220, 220, 1)',  color: 'black', }} />}
      {soulbound && <Chip label={`soulbound`} size="small" style={{ backgroundColor: 'red',  color: 'black', }} />}
      {!soulbound && <Chip label={`bind on equip`} size="small" style={{ backgroundColor: 'green',  color: 'black', }} />}

    </Stack>
  );
};

export default ChipStack;