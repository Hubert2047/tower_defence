import { E_gems } from '../../../enum/index.js';
import { deepClone } from '../../../helper/index.js';
import BlueProperties from './Blue.js';
import YellowProperties from './Purple.js';
import RedProperties from './Red.js';
const gemBaseProperties = new Map([
    [E_gems.BLUE, BlueProperties],
    [E_gems.RED, RedProperties],
    [E_gems.PURPLE, YellowProperties],
]);
function getBaseGemProperties(type) {
    if (gemBaseProperties.has(type))
        return deepClone(gemBaseProperties.get(type));
    return deepClone(BlueProperties);
}
export default getBaseGemProperties;
