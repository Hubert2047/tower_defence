import { E_enemy } from '../../enum/index.js';
import { deepClone } from '../../helper/index.js';
const enemiesBaseProperty = new Map([
    [
        E_enemy.BEAR,
        {
            name: 'Bear',
            enemyType: E_enemy.BEAR,
            width: 200,
            height: 200,
            maxX: 4,
            maxY: 5,
            offset: { x: 65, y: 65 },
            baseHealth: 4000,
            baseMoveSpeed: 1.2,
            baseCoins: 2,
            imageSourceString: [
                '../../../public/src/assets/images/enemies/Bear/top_0.png',
                '../../../public/src/assets/images/enemies/Bear/left_290.png',
                '../../../public/src/assets/images/enemies/Bear/right_90.png',
                '../../../public/src/assets/images/enemies/Bear/bottom_180.png',
            ],
            dashboardBorderInfo: {
                imageSourceString: ['../../../public/src/assets/images/borders/1.png'],
                frame: { maxX: 1, maxY: 1, holdTime: 4 },
            },
        },
    ],
    [
        E_enemy.FOX,
        {
            name: 'Fox',
            enemyType: E_enemy.FOX,
            width: 200,
            height: 200,
            maxX: 4,
            maxY: 4,
            offset: { x: 65, y: 65 },
            baseHealth: 3000,
            baseMoveSpeed: 1.5,
            baseCoins: 2,
            imageSourceString: [
                '../../../public/src/assets/images/enemies/Fox/top_0.png',
                '../../../public/src/assets/images/enemies/Fox/left_290.png',
                '../../../public/src/assets/images/enemies/Fox/right_90.png',
                '../../../public/src/assets/images/enemies/Fox/bottom_180.png',
            ],
            dashboardBorderInfo: {
                imageSourceString: ['../../../public/src/assets/images/borders/1.png'],
                frame: { maxX: 1, maxY: 1, holdTime: 4 },
            },
        },
    ],
    [
        E_enemy.DRAGON,
        {
            name: 'Dragon',
            enemyType: E_enemy.DRAGON,
            width: 200,
            height: 200,
            maxX: 4,
            maxY: 4,
            offset: { x: 65, y: 50 },
            baseHealth: 15000,
            baseMoveSpeed: 1.1,
            baseCoins: 3,
            imageSourceString: [
                '../../../public/src/assets/images/enemies/Dragon/top_0.png',
                '../../../public/src/assets/images/enemies/Dragon/left_290.png',
                '../../../public/src/assets/images/enemies/Dragon/right_90.png',
                '../../../public/src/assets/images/enemies/Dragon/bottom_180.png',
            ],
            dashboardBorderInfo: {
                imageSourceString: ['../../../public/src/assets/images/borders/1.png'],
                frame: { maxX: 1, maxY: 1, holdTime: 4 },
            },
        },
    ],
    [
        E_enemy.BROOD_MOTHER,
        {
            name: 'Brood Mother',
            enemyType: E_enemy.BROOD_MOTHER,
            width: 200,
            height: 200,
            maxX: 4,
            maxY: 4,
            offset: { x: 65, y: 65 },
            baseHealth: 3000,
            baseMoveSpeed: 1.9,
            baseCoins: 1,
            imageSourceString: [
                '../../../public/src/assets/images/enemies/Broodmother/top_0.png',
                '../../../public/src/assets/images/enemies/Broodmother/left_290.png',
                '../../../public/src/assets/images/enemies/Broodmother/right_90.png',
                '../../../public/src/assets/images/enemies/Broodmother/bottom_180.png',
            ],
            dashboardBorderInfo: {
                imageSourceString: ['../../../public/src/assets/images/borders/1.png'],
                frame: { maxX: 1, maxY: 1, holdTime: 4 },
            },
        },
    ],
    [
        E_enemy.SIREN,
        {
            name: 'Naga Siren',
            enemyType: E_enemy.SIREN,
            width: 200,
            height: 200,
            maxX: 5,
            maxY: 4,
            offset: { x: 65, y: 55 },
            baseHealth: 6000,
            baseMoveSpeed: 1.5,
            baseCoins: 2,
            imageSourceString: [
                '../../../public/src/assets/images/enemies/Siren/top_0.png',
                '../../../public/src/assets/images/enemies/Siren/left_290.png',
                '../../../public/src/assets/images/enemies/Siren/right_90.png',
                '../../../public/src/assets/images/enemies/Siren/bottom_180.png',
            ],
            dashboardBorderInfo: {
                imageSourceString: ['../../../public/src/assets/images/borders/1.png'],
                frame: { maxX: 1, maxY: 1, holdTime: 4 },
            },
        },
    ],
]);
function getBaseEnemyProperties(enemyType) {
    if (enemiesBaseProperty.has(enemyType))
        return deepClone(enemiesBaseProperty.get(enemyType));
    return undefined;
}
export default getBaseEnemyProperties;
