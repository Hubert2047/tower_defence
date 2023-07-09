import { E_enemy } from '../enum/index.js';
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
                enemyType: E_enemy.DRAGON,
                basePosition: { x: -110, y: 484 },
                amount: 8,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 1,
                health: 17000,
                coins: 5,
            },
            {
                enemyType: E_enemy.FOX,
                basePosition: { x: -75, y: 484 },
                amount: 12,
                moveSpeed: 2,
                health: 6000,
                spaceMin: 100,
                spaceMax: 1000,
                coins: 2,
            },
            {
                enemyType: E_enemy.BROOD_MOTHER,
                basePosition: { x: -50, y: 484 },
                amount: 20,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 2,
                health: 2000,
                coins: 1,
            },
            {
                enemyType: E_enemy.SIREN,
                basePosition: { x: -150, y: 484 },
                amount: 18,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 1.5,
                health: 8000,
                coins: 2,
            },
            {
                enemyType: E_enemy.BEAR,
                basePosition: { x: -250, y: 484 },
                amount: 12,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 1.3,
                health: 15000,
                coins: 3,
            },
        ],
    },
    {
        roundName: 'round 2',
        enemies: [
            {
                enemyType: E_enemy.BEAR,
                basePosition: { x: -150, y: 484 },
                amount: 10,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 1,
                health: 10000,
                coins: 2,
            },
        ],
    },
];
const backgoundImage = new Image();
const limitAttacks = 10000;
const startCoins = 20;
backgoundImage.src = '../../public/src/assets/images/gameMap.png';
const desertMapData = { rounds, backgoundImage, placementTiles2D, waypoints, limitAttacks, startCoins };
export default desertMapData;
