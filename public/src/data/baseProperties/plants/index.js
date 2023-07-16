import { E_characters } from '../../../enum/index.js';
import { deepClone } from '../../../helper/index.js';
import GreenTreeProperties from '../towers/GreenTree.js';
import MonsterraTreeProperties from '../towers/MonsterraTree.js';
const plantsBaseProperties = new Map([
    [E_characters.GREEN_TREE, GreenTreeProperties],
    [E_characters.MONSTERRA_TREE, MonsterraTreeProperties],
]);
function getBasePlantsProperties(plantType) {
    if (plantsBaseProperties.has(plantType))
        return deepClone(plantsBaseProperties.get(plantType));
    return deepClone(GreenTreeProperties);
}
export default getBasePlantsProperties;
