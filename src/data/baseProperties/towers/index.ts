import { E_tower } from '../../../enum/index.js'
import { deepClone } from '../../../helper/index.js'
import { I_towerProperties } from '../../../types/interface.js'
import BloodMoon from './BloodMoon.tower.js'
import FlyingObelisk from './FlyingObelisk.tower.js'
import HauntedTree from './HauntedTree.tower.js'
import ObeliskThunder from './ObeliskThunder.tower.js'
const towersBaseProperties: Map<E_tower, I_towerProperties> = new Map([
    [E_tower.BLOOD_MOON, BloodMoon],
    [E_tower.FLYING_OBELISK, FlyingObelisk],
    [E_tower.HAUNTED_TREE, HauntedTree],
    [E_tower.OBELISK_THUNDER, ObeliskThunder],
])
function getBaseTowerProperties(towerType: E_tower): any {
    if (towersBaseProperties.has(towerType)) return deepClone(towersBaseProperties.get(towerType))
    return deepClone(BloodMoon)
}
export default getBaseTowerProperties
