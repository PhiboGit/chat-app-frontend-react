
import BaobabSvg from '../../../../assets/svg/baobab.svg';
import BeechSvg from '../../../../assets/svg/beech.svg';
import DeadTreeSvg from '../../../../assets/svg/dead-wood.svg';
import PineSvg from '../../../../assets/svg/pine-tree.svg';
import WillowSvg from '../../../../assets/svg/willow-tree.svg';

import PickaxeSvg from '../../../../assets/svg/war-pick.svg'
import SickleSvg from '../../../../assets/svg/sickle.svg'
import AxeSvg from '../../../../assets/svg/wood-axe.svg'

import GlovesSvg from '../../../../assets/svg/gloves.svg'
import BootsSvg from '../../../../assets/svg/boots.svg'
import HatSvg from '../../../../assets/svg/pointy-hat.svg'
import ShirtSvg from '../../../../assets/svg/shirt.svg'
import PantsSvg from '../../../../assets/svg/trousers.svg'


import OreSvg from '../../../../assets/svg/ore.svg'
import PlankSvg from '../../../../assets/svg/wood-beam.svg'
import LogSvg from '../../../../assets/svg/log.svg'
import RockSvg from '../../../../assets/svg/rock.svg'
import FlaxSvg from '../../../../assets/svg/flax.svg'
import ClothSvg from '../../../../assets/svg/rolled-cloth.svg'
import IngotSvg from '../../../../assets/svg/metal-bar.svg'

import ScrollSvg from '../../../../assets/svg/scroll.svg'
import RandomSvg from '../../../../assets/svg/random.svg'

const iconMappings = {
  'TreeT1': PineSvg,
  'TreeT2': BeechSvg,
  'TreeT3': BaobabSvg,
  'TreeT4': DeadTreeSvg,
  'TreeT5': WillowSvg,

  'pickaxe': PickaxeSvg,
  'sickle': SickleSvg,
  'axe':AxeSvg,

  'hat': HatSvg,
  'chestpiece':ShirtSvg,
  'gloves':GlovesSvg,
  'pants':PantsSvg,
  'boots': BootsSvg,

  'ore': OreSvg,
  'wood': LogSvg,
  'plank': PlankSvg,
  'coal':RockSvg,
  'fiber': FlaxSvg,
  'linen': ClothSvg,
  'ingot': IngotSvg,

  'scroll': ScrollSvg,
};

const getSvg = (SvgIconName) => {
  if (SvgIconName){
    const icon = iconMappings[SvgIconName]
    if(icon){
      return icon
    }

    for (const key in iconMappings) {
      if (SvgIconName.startsWith(key)) {
        return iconMappings[key];
      }
    }
  }
  return RandomSvg;
};


const getRarityColor = (rarity) => {
  switch (rarity) {
    case 'common':
      return '#b0b0b0';
    case 'uncommon':
      return '#4caf50';
    case 'rare':
      return '#2196f3';
    case 'epic':
      return '#a335ee';
    case 'legendary':
      return '#ff9800';
    default:
      return 'rgba(0, 0, 0, 0.87)';
  }
};

export {getSvg, getRarityColor}