import { E_enemy } from '../../../enum/index.js'
import { deepClone } from '../../../helper/index.js'
import { T_baseEnemyProperties } from '../../../types/index.js'
import Bear from './Bear.js'
import BlueBroodMother from './BlueBroodMother.js'
import BroodMother from './BroodMother.js'
import ButterFly from './ButterFly.js'
import Dragon from './Dragon.js'
import Eyes from './Eyes.js'
import Fox from './Fox.js'
import Hunter from './Hunter.js'
import NagaSiren from './NagaSiren.js'
import Robot from './Robot.js'
import TideHunter from './TideHunter.js'
import YellowSpider from './YellowSpider.js'
const enemiesBaseProperty: Map<E_enemy, T_baseEnemyProperties> = new Map([
    [E_enemy.BEAR, Bear],
    [E_enemy.FOX, Fox],
    [E_enemy.DRAGON, Dragon],
    [E_enemy.BROOD_MOTHER, BroodMother],
    [E_enemy.SIREN, NagaSiren],
    [E_enemy.Blue_Brood_Mother, BlueBroodMother],
    [E_enemy.TIDE_HUNTER, TideHunter],
    [E_enemy.Hunter, Hunter],
    [E_enemy.BUTTER_FLY, ButterFly],
    [E_enemy.YELLOW_SPIDER, YellowSpider],
    [E_enemy.ROBOT, Robot],
    [E_enemy.EYES, Eyes],
])
function getBaseEnemyProperties(enemyType: E_enemy): T_baseEnemyProperties | undefined {
    if (enemiesBaseProperty.has(enemyType)) return deepClone(enemiesBaseProperty.get(enemyType))
    return undefined
}
export default getBaseEnemyProperties
