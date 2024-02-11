import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GatheringOverview from '../gathering/GatheringOverview';
import RefiningOverview from '../refiningOverview/RefiningOverview';
import CraftingOverview from '../crafting/CraftingOverview';
import AugmentationOverview from '../augmentation/AugmentationOverview';
import EnchantingOverview from '../enchanting/EnchantingOverview';
import EquipmentOverview from '../equipment/EquipmentOverview';
import MarketplaceOverview from '../marketplace/MarketplaceOverview';
import RegionOverview from '../regions/RegionOverview';
import MapOverview from '../regions/MapOverview';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Map" {...a11yProps(0)} />
          <Tab label="Gathering" {...a11yProps(1)} />
          <Tab label="Refining" {...a11yProps(2)} />
          <Tab label="Crafting" {...a11yProps(3)} />
          <Tab label="Augmentation" {...a11yProps(4)} />
          <Tab label="Enchanting" {...a11yProps(5)} />
          <Tab label="Equipment" {...a11yProps(6)} />
          <Tab label="Market" {...a11yProps(7)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <MapOverview />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GatheringOverview />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <RefiningOverview />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <CraftingOverview/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <AugmentationOverview/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <EnchantingOverview/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <EquipmentOverview/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
        <MarketplaceOverview/>
      </CustomTabPanel>
    </Box>
  );
}