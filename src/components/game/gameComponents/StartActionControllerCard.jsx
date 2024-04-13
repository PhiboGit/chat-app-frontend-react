import React, { useState } from "react"
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import HtmlTooltip from "../../common/HtmlToolTip";
import { Paper } from "@mui/material";

const StartActionControllerCard = ({limit, setLimit, iterations, setIterations, startDisabled, onClickStart }) => {

  const [value, setValue] = useState(iterations);
  const handleInput = (event) => {
    const inputValue = event.target.value;
    if (/^\d*$/.test(inputValue)) {
      setValue(inputValue)
      setIterations(parseInt(inputValue) || 1);
    } else {
      event.target.value = value
    }
  }

  return (
      <Box 
          display="flex"
          flexDirection='row'
          justifyContent={'space-between'}
        >
          <Stack direction="row" alignItems={"center"} spacing={1}>
            <HtmlTooltip title="unlimted iterations">
              <AllInclusiveIcon fontSize="small" />
            </HtmlTooltip>
            <FormControlLabel control={<Switch checked={limit} onChange={(event) => setLimit(event.target.checked)}/>}/>
            <VerticalAlignTopIcon fontSize="small" />
          </Stack>
        
        {limit && (<TextField
          label="Iterations"
          id="outlined-size-small"
          value= {value}
          size="small"
          onChange={handleInput}          
        />)}
        <Button 
          disabled={startDisabled} 
          onClick={onClickStart} 
          variant="contained"
          
          >
            Start
          </Button>
      </Box>
  )
}

export default StartActionControllerCard