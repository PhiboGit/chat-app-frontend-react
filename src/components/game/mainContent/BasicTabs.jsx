import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import FavoriteIcon from '@mui/icons-material/Favorite';

import GatheringOverview from '../gathering/GatheringOverview';
import CraftingOverview from '../crafting/CraftingOverview';
import AugmentationOverview from '../augmentation/AugmentationOverview';
import EnchantingOverview from '../enchanting/EnchantingOverview';
import MarketplaceOverview from '../marketplace/MarketplaceOverview';
import RefiningTabs from '../refiningOverview/RefiningTabs';

function CustomTabPanel(props) {
  const { children, value, index} = props;
  return (
      value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )
  );
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant="scrollable" scrollButtons="auto" value={value} onChange={handleChange}>
          <Tab label="Gathering" icon={<FavoriteIcon />} iconPosition="start" />
          <Tab label="Refining"  />
          <Tab label="Crafting"  />
          <Tab label="Augmentation"  />
          <Tab label="Enchanting"  />
          <Tab label="Market"  />
        </Tabs>
      </Box>
      <Box flex={1} overflow="auto">
        <CustomTabPanel value={value} index={0}>
          <GatheringOverview />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <RefiningTabs/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <CraftingOverview/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <AugmentationOverview/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <EnchantingOverview/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <MarketplaceOverview/>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}