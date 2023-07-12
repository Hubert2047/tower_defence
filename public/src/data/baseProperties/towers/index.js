import { E_tower } from '../../../enum/index.js';
import { deepClone } from '../../../helper/index.js';
import BloodMoonProperties from './BloodMoon.tower.js';
import FlyingObelisk from './FlyingObelisk.tower.js';
import HauntedTree from './HauntedTree.tower.js';
const towersBaseProperties = new Map([
    [E_tower.BLOOD_MOON, BloodMoonProperties],
    [E_tower.FLYING_OBELISK, FlyingObelisk],
    [E_tower.HAUNTED_TREE, HauntedTree],
]);
function getBaseTowerProperties(towerType) {
    if (towersBaseProperties.has(towerType))
        return deepClone(towersBaseProperties.get(towerType));
    return deepClone(BloodMoonProperties);
}
export default getBaseTowerProperties;
