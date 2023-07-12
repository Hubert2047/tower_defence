import { E_tower } from '../../../enum/index.js';
import { deepClone } from '../../../helper/index.js';
import BloodMoonProperties from './BloodMoon.tower.js';
const towersBaseProperties = new Map([[E_tower.BLOOD_MOON, BloodMoonProperties]]);
function getBaseTowerProperties(towerType) {
    if (towersBaseProperties.has(towerType))
        return deepClone(towersBaseProperties.get(towerType));
    return deepClone(BloodMoonProperties);
}
export default getBaseTowerProperties;
