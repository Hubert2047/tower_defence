import { E_enemy } from '../../../enum/index.js'
import { deepClone } from '../../../helper/index.js'
import { T_baseEnemyProperties } from '../../../types/index.js'
import Bear from './Bear.js'
import BroodMother from './BroodMother.js'
import Dragon from './Dragon.js'
import Fox from './Fox.js'
import NagaSiren from './NagaSiren.js'
const enemiesBaseProperty: Map<E_enemy, T_baseEnemyProperties> = new Map([
    [E_enemy.BEAR, Bear],
    [E_enemy.FOX, Fox],
    [E_enemy.DRAGON, Dragon],
    [E_enemy.BROOD_MOTHER, BroodMother],
    [E_enemy.SIREN, NagaSiren],
])
function getBaseEnemyProperties(enemyType: E_enemy): T_baseEnemyProperties | undefined {
    if (enemiesBaseProperty.has(enemyType)) return deepClone(enemiesBaseProperty.get(enemyType))
    return undefined
}
export default getBaseEnemyProperties