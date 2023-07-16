import { E_characters } from '../../../enum/index.js'
import { deepClone } from '../../../helper/index.js'
import { I_characterProperties } from '../../../types/interface.js'
import AutumnTreeProperties from './AutumnTree.js'
import BloodMoon from './BloodMoon.tower.js'
import FlyingObelisk from './FlyingObelisk.tower.js'
import GreenTreeProperties from './GreenTree.js'
import HauntedTree from './HauntedTree.tower.js'
import MonsterraTreeProperties from './MonsterraTree.js'
import ObeliskThunder from './ObeliskThunder.tower.js'
import ShovelProperties from './Shovel.js'
const characterBaseProperties: Map<E_characters, I_characterProperties> = new Map([
    [E_characters.BLOOD_MOON, BloodMoon],
    [E_characters.FLYING_OBELISK, FlyingObelisk],
    [E_characters.HAUNTED_TREE, HauntedTree],
    [E_characters.OBELISK_THUNDER, ObeliskThunder],
    [E_characters.GREEN_TREE, GreenTreeProperties],
    [E_characters.MONSTERRA_TREE, MonsterraTreeProperties],
    [E_characters.AUTUMN_TREE, AutumnTreeProperties],
    [E_characters.SHOVEL, ShovelProperties],
])
function getBaseCharacterProperties(type: E_characters): any {
    if (characterBaseProperties.has(type)) return deepClone(characterBaseProperties.get(type))
    return deepClone(BloodMoon)
}
export default getBaseCharacterProperties
