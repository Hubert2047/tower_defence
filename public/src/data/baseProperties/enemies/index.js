import { E_enemy } from '../../../enum/index.js';
import { deepClone } from '../../../helper/index.js';
import Bear from './Bear.js';
import BlueBroodMother from './BlueBroodMother.js';
import BroodMother from './BroodMother.js';
import Dragon from './Dragon.js';
import Fox from './Fox.js';
import NagaSiren from './NagaSiren.js';
import TideHunter from './TideHunter.js';
import Hunter from './Hunter.js';
const enemiesBaseProperty = new Map([
    [E_enemy.BEAR, Bear],
    [E_enemy.FOX, Fox],
    [E_enemy.DRAGON, Dragon],
    [E_enemy.BROOD_MOTHER, BroodMother],
    [E_enemy.SIREN, NagaSiren],
    [E_enemy.Blue_Brood_Mother, BlueBroodMother],
    [E_enemy.TIDE_HUNTER, TideHunter],
    [E_enemy.Hunter, Hunter],
]);
function getBaseEnemyProperties(enemyType) {
    if (enemiesBaseProperty.has(enemyType))
        return deepClone(enemiesBaseProperty.get(enemyType));
    return undefined;
}
export default getBaseEnemyProperties;
