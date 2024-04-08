import { Container, Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FavoriteIcon from '@mui/icons-material/Favorite';

import React from 'react';
import RefiningOverview from './RefiningOverview';

function TabPanel(props) {
  const { children, value, index} = props;
  return (
      value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )
  );
}

const RefiningTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
   <Container maxWidth="md">
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs variant="scrollable" scrollButtons="auto" value={value} onChange={handleChange}>
        <Tab label="Woodworking" icon={<FavoriteIcon />} iconPosition="start" />
        <Tab label="Smelting"  />
        <Tab label="Weaving"  />
      </Tabs>
    </Box>

    <Box flex={1} overflow="auto">
      <TabPanel value={value} index={0}>
        <RefiningOverview profession={"woodworking"}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RefiningOverview profession={"smelting"}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RefiningOverview profession={"weaving"}/>
      </TabPanel>
    </Box>
  </Container>
  );
}

export default RefiningTabs