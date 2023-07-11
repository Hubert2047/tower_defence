import { E_enemy } from '../../enum/index.js'
import { T_gameMapData, T_position, T_round } from '../../types/index.js'
const placementTilesData: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0,
    0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0,
    14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0,
    0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 14, 0, 14, 0, 14, 0,
    14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 14, 0, 14, 0, 14, 0, 14, 0, 14, 0, 0,
]
const placementTiles2D: number[][] = []
for (let i = 0; i < placementTilesData.length; i += 20) {
    placementTiles2D.push(placementTilesData.slice(i, i + 20))
}
const waypoints: T_position[] = [
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
        x: 1280,
        y: 282,
    },
]
const rounds: T_round[] = [
    {
        roundName: 'round 1',
        enemies: [
            // {
            //     enemyType: E_enemy.DRAGON,
            //     basePosition: { x: -110, y: 484 },
            //     amount: 8,
            //     spaceMin: 100,
            //     spaceMax: 1000,
            //     moveSpeed: 1.2,
            //     health: 17000,
            //     coins: 5,
            // },
            // {
            //     enemyType: E_enemy.FOX,
            //     basePosition: { x: -75, y: 484 },
            //     amount: 12,
            //     moveSpeed: 2,
            //     health: 6000,
            //     spaceMin: 100,
            //     spaceMax: 1000,
            //     coins: 2,
            // },
            // {
            //     enemyType: E_enemy.BROOD_MOTHER,
            //     basePosition: { x: -50, y: 484 },
            //     amount: 20,
            //     spaceMin: 100,
            //     spaceMax: 1000,
            //     moveSpeed: 2,
            //     health: 2000,
            //     coins: 1,
            // },
            // {
            //     enemyType: E_enemy.SIREN,
            //     basePosition: { x: -150, y: 484 },
            //     amount: 18,
            //     spaceMin: 100,
            //     spaceMax: 1000,
            //     moveSpeed: 1.5,
            //     health: 8000,
            //     coins: 2,
            // },
            // {
            //     enemyType: E_enemy.BEAR,
            //     basePosition: { x: -250, y: 484 },
            //     amount: 12,
            //     spaceMin: 100,
            //     spaceMax: 1000,
            //     moveSpeed: 1.5,
            //     health: 15000,
            //     coins: 3,
            // },
            // {
            //     enemyType: E_enemy.Blue_Brood_Mother,
            //     basePosition: { x: -250, y: 484 },
            //     amount: 12,
            //     spaceMin: 100,
            //     spaceMax: 1000,
            //     moveSpeed: 1.5,
            //     health: 15000,
            //     coins: 3,
            // },
            {
                enemyType: E_enemy.TIDE_HUNTER,
                basePosition: { x: -250, y: 484 },
                amount: 12,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 1.5,
                health: 15000,
                coins: 3,
            },
        ],
    },
    {
        roundName: 'round 2',
        enemies: [
            // {
            //     enemyType: E_enemy.BEAR,
            //     basePosition: { x: -150, y: 484 },
            //     amount: 10,
            //     spaceMin: 100,
            //     spaceMax: 500,
            //     moveSpeed: 1,
            //     health: 10000,
            //     coins: 2,
            // },
        ],
    },
]
const backgroundImage: HTMLImageElement = new Image()
const limitAttacks: number = 1000
const startCoins: number = 20
backgroundImage.src = '../../public/src/assets/images/gameMap.png'
const desertMapData: T_gameMapData = { rounds, backgroundImage, placementTiles2D, waypoints, limitAttacks, startCoins }
export default desertMapData
