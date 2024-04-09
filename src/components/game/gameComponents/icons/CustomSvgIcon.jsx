import Icon from '@mui/material/Icon';

import {getSvg} from './iconUtils.js'

const CustomSvgIcon = (SvgIconName) => (
  <Icon style={{ width: '100%', height: '100%'}}>
    <img src={getSvg(SvgIconName)} />
  </Icon>
)

export default CustomSvgIcon