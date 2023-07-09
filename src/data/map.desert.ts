import { E_enemyType } from '../enum/index.js'
import { T_gameMapData, T_position, T_round } from '../types/index.js'
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
        x: 1330,
        y: 282,
    },
]
const rounds: T_round[] = [
    {
        roundName: 'round 1',
        enemies: [
            // {
            //     enemyType: E_enemyType.DRAGON,
            //     position: { x: -10, y: 484 },
            // },
            {
                enemyType: E_enemyType.BROOD_MOTHER,
                position: { x: -150, y: 484 },
            },
            // {
            //     enemyType: E_enemyType.FOX,
            //     position: { x: -250, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.SIREN,
            //     position: { x: -850, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.SIREN,
            //     position: { x: -650, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.SIREN,
            //     position: { x: -250, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.SIREN,
            //     position: { x: -550, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.DRAGON,
            //     position: { x: -10, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.BROOD_MOTHER,
            //     position: { x: -150, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.BEAR,
            //     position: { x: -850, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.BEAR,
            //     position: { x: -950, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.BEAR,
            //     position: { x: -1500, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.DRAGON,
            //     position: { x: -1000, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.BROOD_MOTHER,
            //     position: { x: -290, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.FOX,
            //     position: { x: -120, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.SIREN,
            //     position: { x: -190, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.SIREN,
            //     position: { x: -320, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.SIREN,
            //     position: { x: -150, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.SIREN,
            //     position: { x: -650, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.DRAGON,
            //     position: { x: -100, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.BROOD_MOTHER,
            //     position: { x: -120, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.BEAR,
            //     position: { x: -950, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.BEAR,
            //     position: { x: -850, y: 484 },
            // },
            // {
            //     enemyType: E_enemyType.BEAR,
            //     position: { x: -1400, y: 484 },
            // },
        ],
    },
    {
        roundName: 'round 2',
        enemies: [
            {
                enemyType: E_enemyType.FOX,
                position: { x: -10, y: 484 },
            },
        ],
    },
]
const backgoundImage: HTMLImageElement = new Image()
const limitAttacks = 10000
const startCoins = 20000
backgoundImage.src = '../../public/src/assets/images/gameMap.png'
const desertMapData: T_gameMapData = { rounds, backgoundImage, placementTiles2D, waypoints, limitAttacks, startCoins }
export default desertMapData
