import React, { useContext, useState, useMemo} from 'react';
import { CharacterDataContext } from './dataProviders/CharacterDataProvider';
import { GameDataContext } from './dataProviders/GameDataProvider';


import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Icon from '@mui/material/Icon';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import MiningSvg from '../../assets/svg/mining.svg'
import HerbsSvg from '../../assets/svg/herbs-bundle.svg'
import LoggingSvg from '../../assets/svg/logging.svg'




import RandomSvg from '../../assets/svg/random.svg'
import ItemIcon from './inventory/ItemIcon';


const iconMappings = {
  'mining': MiningSvg,
  'harvesting': HerbsSvg,
  'woodcutting': LoggingSvg,
  
};

const getIcon = (profession) => {
  

  const icon = iconMappings[profession]
  if(icon){
    return icon
  }

  return RandomSvg;
};

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));


const CustomChip = ({gatheringData}) => {
  return (
    <Stack direction="row" spacing={1}>
      {/* Small Chip with custom color */}
      

    </Stack>
  );
};

const ProfessionTitle = ({ profession, skillData }) => {
  const { gameData } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const idToItemMap = characterData.items.reduce((map, item) => {
    map[item._id] = item;
    return map;
  }, {});

  const expLevel = skillData.exp - gameData.expTable.Exp[`${skillData.level}`]
  const nextExpLevel = gameData.expTable.Exp[`${skillData.level + 1}`] - gameData.expTable.Exp[`${skillData.level}`]

  return (
    <React.Fragment>
      <Typography color="inherit">{profession}</Typography>
      <hr/>
      <b>{`Exp: ${skillData.exp}`}</b>
      <br/>
      <b>{`Level Up: ${expLevel}/${nextExpLevel} Exp`}</b>
      <hr/>
      <b>{`Luck: ${skillData.luck}`}</b>
      <br/>
      <b>{`Speed: ${skillData.speed * 100}%`}</b>
      <hr/>
      <b>{`Equipment: `}</b>
      <Grid key={profession} container spacing={1}>
      {Object.keys(skillData.equipment).map((slot) => {
        const itemId = skillData.equipment[slot]
        if(itemId) return(
        <Grid item key={itemId}>
          <ItemIcon
            style={{ width: '35px', height: '35px' }} // Adjust size as needed
            item={idToItemMap[itemId]}
          />
        </Grid>
            )})}
      </Grid>
    </React.Fragment>
  )
}

const ProfessionIcon = ({ profession }) => {
  
  const { characterData } = useContext(CharacterDataContext);
  const skillData = characterData.skills[profession]

  const [isHovered, setIsHovered] = useState(false);

  const paperStyle = {
    position: 'relative',
    width: 70,
    height: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s ease', // Adjust the transition property
    cursor: 'pointer',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(169, 169, 169, 0.4)', // Light gray with 0.3 opacity
    opacity: isHovered ? 1 : 0, // Show overlay on hover
    transition: 'opacity 0.3s ease', // Adjust the transition property
  };

  const LevelStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    fontSize: '60px',
  };

  const iconStyle = {
    width: '100%',
    height: '100%',
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <HtmlTooltip
      placement="right"
      title={
        <ProfessionTitle profession={profession} skillData={skillData}/>
      }
      >
      <Paper
        style={paperStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <div style={overlayStyle}></div>
        <div style={iconStyle}>
          <Icon style={{ width: '100%', height: '100%' }}>
            <img src={getIcon(profession)} />
          </Icon>
        </div>
        <div style={LevelStyle}>{skillData.level}</div>
      </Paper>
        
    </HtmlTooltip>
  );
};

export default ProfessionIcon;