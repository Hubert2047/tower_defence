import { E_enemy } from '../../enum/index.js';
const enemiesDefaultProperty = new Map([
    [
        E_enemy.BEAR,
        {
            enemyType: E_enemy.BEAR,
            width: 200,
            height: 200,
            maxX: 4,
            maxY: 5,
            offset: { x: 65, y: 65 },
        },
    ],
    [
        E_enemy.FOX,
        {
            enemyType: E_enemy.FOX,
            width: 200,
            height: 200,
            maxX: 4,
            maxY: 4,
            offset: { x: 65, y: 65 },
        },
    ],
    [
        E_enemy.DRAGON,
        {
            enemyType: E_enemy.DRAGON,
            width: 200,
            height: 200,
            maxX: 4,
            maxY: 4,
            offset: { x: 65, y: 50 },
        },
    ],
    [
        E_enemy.BROOD_MOTHER,
        {
            enemyType: E_enemy.BROOD_MOTHER,
            width: 200,
            height: 200,
            maxX: 4,
            maxY: 4,
            offset: { x: 65, y: 65 },
        },
    ],
    [
        E_enemy.SIREN,
        {
            enemyType: E_enemy.SIREN,
            width: 200,
            height: 200,
            maxX: 5,
            maxY: 4,
            offset: { x: 65, y: 55 },
        },
    ],
]);
export default enemiesDefaultProperty;
