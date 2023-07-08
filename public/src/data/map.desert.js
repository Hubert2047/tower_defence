import { E_EnemyType } from '../enum/index.js';
const placementTilesData = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0,
    0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0,
    14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0,
    0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 14, 0, 14, 0, 14, 0,
    14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 14, 0, 14, 0, 14, 0, 14, 0, 14, 0, 0,
];
const placementTiles2D = [];
for (let i = 0; i < placementTilesData.length; i += 20) {
    placementTiles2D.push(placementTilesData.slice(i, i + 20));
}
const waypoints = [
    {
        x: 256,
        y: 478,
    },
    {
        x: 278,
        y: 170,
    },
    {
        x: 700,
        y: 152,
    },
    {
        x: 710,
        y: 416,
    },
    {
        x: 560,
        y: 428,
    },
    {
        x: 560,
        y: 612,
    },
    {
        x: 1034,
        y: 620,
    },
    {
        x: 1056,
        y: 300,
    },
    {
        x: 1330,
        y: 282,
    },
];
const rounds = [
    {
        roundName: 'round 1',
        enemies: [
            {
                enemyType: E_EnemyType.DRAGON,
                position: { x: -10, y: 484 },
            },
            {
                enemyType: E_EnemyType.BROOD_MOTHER,
                position: { x: -150, y: 484 },
            },
            {
                enemyType: E_EnemyType.FOX,
                position: { x: -250, y: 484 },
            },
            {
                enemyType: E_EnemyType.SIREN,
                position: { x: -350, y: 484 },
            },
        ],
    },
    {
        roundName: 'round 2',
        enemies: [
            {
                enemyType: E_EnemyType.FOX,
                position: { x: -10, y: 484 },
            },
        ],
    },
];
const backgoundImage = new Image();
const limitAttacks = 10;
backgoundImage.src = '../../public/src/assets/images/gameMap.png';
const desertMapData = { rounds, backgoundImage, placementTiles2D, waypoints, limitAttacks };
export default desertMapData;
