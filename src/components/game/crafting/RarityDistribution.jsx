import React from 'react';
import Typography from '@mui/material/Typography';

const RarityDistribution = ({ values }) => {
  const sum = values.reduce((acc, val) => acc + val, 0);

  const getColor = (index) => {
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

  return (
    <div>
      {values.map((value, index) => {
        const percentage = (value / sum) * 100;
        const color = getRarityColor(getColor(index));

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
    </div>
  );
};

export default RarityDistribution;
