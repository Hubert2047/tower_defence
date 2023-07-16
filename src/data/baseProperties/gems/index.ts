import { E_gems } from '../../../enum/index.js'
import { deepClone } from '../../../helper/index.js'
import { I_gemProperties } from '../../../types/interface.js'
import BlueProperties from './Blue.js'
import YellowProperties from './Purple.js'
import RedProperties from './Red.js'
const gemBaseProperties: Map<E_gems, I_gemProperties> = new Map([
    [E_gems.BLUE, BlueProperties],
    [E_gems.RED, RedProperties],
    [E_gems.PURPLE, YellowProperties],
])
function getBaseGemProperties(type: E_gems): any {
    if (gemBaseProperties.has(type)) return deepClone(gemBaseProperties.get(type))
    return deepClone(BlueProperties)
}
export default getBaseGemProperties
