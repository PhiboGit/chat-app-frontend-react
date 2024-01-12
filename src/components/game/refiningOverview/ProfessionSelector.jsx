import React from 'react';

import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const ProfessionSelector = ({selectedProfession, professions, onChange}) => {

  const professionLabels = {
    woodworking: 'Woodworking',
    smelting: 'Smelting',
    weaving: 'Weaving',
    toolsmith: 'Toolsmith',
    armorer: 'Armorer',
  };

return (
  <Container maxWidth="xs">
    <Box 
      display="flex"
      flexDirection='column'
      alignItems="center"
      sx={{ bgcolor: 'rgba(198, 221, 233, 0.8)'}}>
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <InputLabel id="profession-label">Profession</InputLabel>
      <Select
        labelId="profession-label"
        id="profession"
        value={selectedProfession}
        label="Profession"
        onChange={onChange}
      >
        {professions.map(profession => (
          <MenuItem key={profession} value={profession}>
            {professionLabels[profession] || profession}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </Box>
  </Container>
  )
}

export default ProfessionSelector