import { E_plants } from '../../../enum/index.js';
import { deepClone } from '../../../helper/index.js';
import GreenTreeProperties from './GreenTree.js';
import MonsterraTreeProperties from './MonsterraTree.js';
const plantsBaseProperties = new Map([
    [E_plants.GREEN_TREE, GreenTreeProperties],
    [E_plants.MONSTERRA_TREE, MonsterraTreeProperties],
]);
function getBasePlantsProperties(plantType) {
    if (plantsBaseProperties.has(plantType))
        return deepClone(plantsBaseProperties.get(plantType));
    return deepClone(GreenTreeProperties);
}
export default getBasePlantsProperties;
