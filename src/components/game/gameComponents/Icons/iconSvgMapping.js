
import PickaxeSvg from '../../../../assets/svg/war-pick.svg'
import SickleSvg from '../../../../assets/svg/sickle.svg'
import AxeSvg from '../../../../assets/svg/wood-axe.svg'

import GlovesSvg from '../../../../assets/svg/gloves.svg'
import BootsSvg from '../../../../assets/svg/boots.svg'
import HatSvg from '../../../../assets/svg/pointy-hat.svg'
import ShirtSvg from '../../../../assets/svg/shirt.svg'
import PantsSvg from '../../../../assets/svg/trousers.svg'

import RandomSvg from '../../../../assets/svg/random.svg'

const iconMappings = {
  'pickaxe': PickaxeSvg,
  'sickle': SickleSvg,
  'axe':AxeSvg,

  'hat': HatSvg,
  'chestpiece':ShirtSvg,
  'gloves':GlovesSvg,
  'pants':PantsSvg,
  'boots': BootsSvg
  // Add more mappings as needed
};

const getIcon = (itemName) => {
  const icon = iconMappings[itemName]
  if(icon){
    return icon
  }

  return RandomSvg;
};

export default getIcon