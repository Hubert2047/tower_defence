import { E_tower } from '../../../enum/index.js'
import { deepClone } from '../../../helper/index.js'
import { T_baseTowerProperties } from '../../../types/index.js'
import BloodMoonProperties from './BloodMoon.tower.js'
import FlyingObelisk from './FlyingObelisk.tower.js'
import HauntedTree from './HauntedTree.tower.js'
import ObeliskThunder from './ObeliskThunder.tower.js'
const towersBaseProperties: Map<E_tower, T_baseTowerProperties> = new Map([
    [E_tower.BLOOD_MOON, BloodMoonProperties],
    [E_tower.FLYING_OBELISK, FlyingObelisk],
    [E_tower.HAUNTED_TREE, HauntedTree],
    [E_tower.OBELISK_THUNDER, ObeliskThunder],
])
function getBaseTowerProperties(towerType: E_tower): T_baseTowerProperties {
    if (towersBaseProperties.has(towerType)) return deepClone(towersBaseProperties.get(towerType))
    return deepClone(BloodMoonProperties)
}
export default getBaseTowerProperties
