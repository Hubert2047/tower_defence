import { EEnemyType } from '../enum/index.js';
const dersetMapData = [
    {
        roundName: 'round 1',
        enemies: [
            {
                enemyType: EEnemyType.DRAGON,
                position: { x: -10, y: 484 },
            },
            {
                enemyType: EEnemyType.BROOD_MOTHER,
                position: { x: -150, y: 484 },
            },
            {
                enemyType: EEnemyType.FOX,
                position: { x: -250, y: 484 },
            },
            {
                enemyType: EEnemyType.SIREN,
                position: { x: -350, y: 484 },
            },
        ],
    },
    {
        roundName: 'round 2',
        enemies: [
            {
                enemyType: EEnemyType.FOX,
                position: { x: -10, y: 484 },
            },
        ],
    },
];
export { dersetMapData };
