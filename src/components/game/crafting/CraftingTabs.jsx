import { Container, Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FavoriteIcon from '@mui/icons-material/Favorite';

import React from 'react';
import CraftingOverview from './CraftingOverview';

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

const CraftingTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
   <Container maxWidth="md">
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs variant="scrollable" scrollButtons="auto" value={value} onChange={handleChange}>
        <Tab label="Toolsmith" icon={<FavoriteIcon />} iconPosition="start" />
        <Tab label="Armorsmith"  />
      </Tabs>
    </Box>

    <Box flex={1} overflow="auto">
      <TabPanel value={value} index={0}>
        <CraftingOverview profession={"toolsmith"}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CraftingOverview profession={"armorer"}/>
      </TabPanel>
    </Box>
  </Container>
  );
}

export default CraftingTabs