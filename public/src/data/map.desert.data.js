import { EEnemyType } from '../enum/index.js';
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
const data = [
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
const backgoundImage = new Image();
backgoundImage.src = '../../public/src/assets/images/gameMap.png';
const desertMapData = { data, backgoundImage, placementTiles2D, waypoints };
export { desertMapData };
