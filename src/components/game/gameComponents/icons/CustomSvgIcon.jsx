import Icon from '@mui/material/Icon';

import {getSvg} from './iconUtils.js'

const CustomSvgIcon = (svgIconName) => (
  ({...props}) => (
    <Icon {...props}>
      <img src={getSvg(svgIconName)} />
    </Icon>
  )
)

export default CustomSvgIcon