import { E_characters } from '../../../enum/index.js';
import { deepClone } from '../../../helper/index.js';
import GreenTreeProperties from '../towers/GreenTree.js';
import MonsterraTreeProperties from '../towers/MonsterraTree.js';
import BloodMoon from './BloodMoon.tower.js';
import FlyingObelisk from './FlyingObelisk.tower.js';
import HauntedTree from './HauntedTree.tower.js';
import ObeliskThunder from './ObeliskThunder.tower.js';
const characterBaseProperties = new Map([
    [E_characters.BLOOD_MOON, BloodMoon],
    [E_characters.FLYING_OBELISK, FlyingObelisk],
    [E_characters.HAUNTED_TREE, HauntedTree],
    [E_characters.OBELISK_THUNDER, ObeliskThunder],
    [E_characters.GREEN_TREE, GreenTreeProperties],
    [E_characters.MONSTERRA_TREE, MonsterraTreeProperties],
]);
function getBaseTowerProperties(type) {
    if (characterBaseProperties.has(type))
        return deepClone(characterBaseProperties.get(type));
    return deepClone(BloodMoon);
}
export default getBaseTowerProperties;
