import React from "react"
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const StartActionController = ({hasLimit, onChangeLimit, iterations, onChangeIterations, startDisabled, onClickStart }) => {

  return (
    <Container maxWidth="xs">
      <Box 
          display="flex"
          flexDirection='column'
          alignItems="center"
          sx={{ bgcolor: 'rgba(91, 91, 91, 0.8)'}}
        >
          <FormControlLabel control={<Switch checked={hasLimit} onChange={(event) => onChangeLimit(event.target.checked)}/>} label="Limit" />
        
        {hasLimit && (<TextField
          label="Iterations"
          id="outlined-size-small"
          defaultValue= {iterations}
          size="small"
          onChange={(event) => onChangeIterations(parseInt(event.target.value))}
        />)}
        <Button disabled={startDisabled} onClick={onClickStart} variant="contained">Start</Button>
      </Box>
    </Container>
  )
}

export default StartActionController