import { E_enemyType } from '../../enum/index.js'
const enemiesDefaultProperty = new Map([
    [
        E_enemyType.BEAR,
        {
            HP: 5000,
            coins: 2,
            moveSpeed: 2,
            maxX: 4,
            maxY: 5,
            offset: { x: 65, y: 65 },
        },
    ],
    [
        E_enemyType.FOX,
        {
            HP: 25000,
            coins: 4,
            moveSpeed: 1,
            maxX: 4,
            maxY: 4,
            offset: { x: 65, y: 65 },
        },
    ],
    [
        E_enemyType.DRAGON,
        {
            HP: 35000,
            coins: 5,
            moveSpeed: 0.5,
            maxX: 4,
            maxY: 4,
            offset: { x: 65, y: 65 },
        },
    ],
    [
        E_enemyType.BROOD_MOTHER,
        {
            HP: 1000,
            coins: 1,
            moveSpeed: 2,
            maxX: 4,
            maxY: 4,
            offset: { x: 65, y: 65 },
        },
    ],
    [
        E_enemyType.SIREN,
        {
            HP: 5000,
            coins: 1,
            moveSpeed: 1,
            maxX: 5,
            maxY: 4,
            offset: { x: 65, y: 55 },
        },
    ],
])
export default enemiesDefaultProperty
