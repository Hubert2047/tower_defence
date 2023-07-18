import { E_angels, E_behaviors, E_characters, E_enemy } from '../../enum/index.js'
import { T_gameMapData, T_gemStartInfo, T_initDashboardCharacterInfo, T_position, T_round } from '../../types/index.js'
const placementTilesData: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0,
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 1,
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
        y: 200,
    },
    {
        x: 700,
        y: 200,
    },
    {
        x: 710,
        y: 416,
    },
    {
        x: 580,
        y: 428,
    },
    {
        x: 580,
        y: 630,
    },
    {
        x: 1034,
        y: 630,
    },
    {
        x: 1056,
        y: 355,
    },
    {
        x: 1280,
        y: 292,
    },
]
const rounds: T_round[] = [
    {
        roundName: 'round 1',
        enemies: [
            {
                enemyType: E_enemy.DRAGON,
                basePosition: { x: -110, y: 484 },
                amount: 3,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 20,
                health: 17000,
                attackSpeed: 40,
                damage: 200,
                coins: 5,
            },
            {
                enemyType: E_enemy.FOX,
                basePosition: { x: -75, y: 484 },
                amount: 2,
                moveSpeed: 20,
                health: 6000,
                spaceMin: 100,
                attackSpeed: 40,
                damage: 200,
                spaceMax: 1000,
                coins: 2,
            },
            {
                enemyType: E_enemy.BROOD_MOTHER,
                basePosition: { x: -50, y: 484 },
                amount: 3,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 20,
                attackSpeed: 40,
                damage: 200,
                health: 2000,
                coins: 1,
            },
            {
                enemyType: E_enemy.SIREN,
                basePosition: { x: -150, y: 484 },
                amount: 5,
                spaceMin: 100,
                spaceMax: 1000,
                attackSpeed: 2,
                damage: 200,
                moveSpeed: 20,
                health: 8000,
                coins: 2,
            },
            {
                enemyType: E_enemy.BEAR,
                basePosition: { x: -250, y: 484 },
                amount: 3,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 20,
                attackSpeed: 40,
                damage: 200,
                health: 15000,
                coins: 3,
            },
            {
                enemyType: E_enemy.Blue_Brood_Mother,
                basePosition: { x: -250, y: 484 },
                amount: 2,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 20,
                health: 15000,
                attackSpeed: 40,
                damage: 200,
                coins: 3,
            },
            {
                enemyType: E_enemy.TIDE_HUNTER,
                basePosition: { x: -250, y: 484 },
                amount: 2,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 20,
                attackSpeed: 40,
                damage: 200,
                health: 15000,
                coins: 3,
            },
            {
                enemyType: E_enemy.Hunter,
                basePosition: { x: -250, y: 484 },
                amount: 4,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 20,
                attackSpeed: 40,
                damage: 200,
                health: 15000,
                coins: 3,
            },
            {
                enemyType: E_enemy.BUTTER_FLY,
                basePosition: { x: -50, y: 484 },
                amount: 4,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 20,
                attackSpeed: 40,
                damage: 200,
                health: 15000,
                coins: 3,
            },
            {
                enemyType: E_enemy.YELLOW_SPIDER,
                basePosition: { x: -50, y: 484 },
                amount: 4,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 20,
                attackSpeed: 40,
                damage: 200,
                health: 15000,
                coins: 3,
            },
            {
                enemyType: E_enemy.ROBOT,
                basePosition: { x: -250, y: 484 },
                amount: 4,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 20,
                attackSpeed: 40,
                damage: 200,
                health: 15000,
                coins: 3,
            },
            {
                enemyType: E_enemy.EYES,
                basePosition: { x: -20, y: 484 },
                amount: 4,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 20,
                attackSpeed: 40,
                damage: 200,
                health: 15000,
                coins: 3,
            },
        ],
    },
]
const initDashboardCharacterInfo: T_initDashboardCharacterInfo[] = [
    {
        type: E_characters.SHOVEL,
        name: 'Shovel',
        position: { x: 64 * 7, y: 64 * 12 },
        width: 35,
        height: 35,
        offset: { x: -15, y: -14 },
        dashboardBorderInfo: {
            name: 'Border 1',
            position: { x: 64 * 7, y: 64 * 12 },
            offset: { x: 0, y: 0 },
            initFrames: {
                [E_behaviors.IDLE]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../../public/src/assets/images/borders/7.png',
                        maxX: 1,
                        maxY: 1,
                        holdTime: 4,
                    },
                },
            },
            width: 64,
            height: 64,
        },
    },
    {
        type: E_characters.AUTUMN_TREE,
        name: 'Autumn TREE',
        position: { x: 64 * 8, y: 64 * 12 },
        width: 50,
        height: 50,
        offset: { x: -8, y: -10 },
        dashboardBorderInfo: {
            name: 'Border 1',
            position: { x: 64 * 8, y: 64 * 12 },
            offset: { x: 0, y: 0 },
            initFrames: {
                [E_behaviors.IDLE]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../../public/src/assets/images/borders/7.png',
                        maxX: 1,
                        maxY: 1,
                        holdTime: 4,
                    },
                },
            },
            width: 64,
            height: 64,
        },
    },
    {
        type: E_characters.GREEN_TREE,
        name: 'GREEN TREE',
        position: { x: 64 * 9, y: 64 * 12 },
        width: 45,
        height: 45,
        offset: { x: -10, y: -6 },
        dashboardBorderInfo: {
            name: 'Border 1',
            position: { x: 64 * 9, y: 64 * 12 },
            offset: { x: 0, y: 0 },
            initFrames: {
                [E_behaviors.IDLE]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../../public/src/assets/images/borders/7.png',
                        maxX: 1,
                        maxY: 1,
                        holdTime: 4,
                    },
                },
            },
            width: 64,
            height: 64,
        },
    },
    {
        type: E_characters.MONSTERRA_TREE,
        name: 'MONSTERRA TREE',
        position: { x: 64 * 10, y: 64 * 12 },
        width: 45,
        height: 45,
        offset: { x: -10, y: -6 },
        dashboardBorderInfo: {
            name: 'Border 1',
            position: { x: 64 * 10, y: 64 * 12 },
            offset: { x: 0, y: 0 },
            initFrames: {
                [E_behaviors.IDLE]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../../public/src/assets/images/borders/7.png',
                        maxX: 1,
                        maxY: 1,
                        holdTime: 10,
                    },
                },
            },
            width: 64,
            height: 64,
        },
    },
    {
        type: E_characters.BLOOD_MOON,
        name: 'Blood moon',
        position: { x: 64 * 11, y: 64 * 12 },
        width: 40,
        height: 40,
        offset: { x: -12, y: -10 },
        dashboardBorderInfo: {
            name: 'Border 1',
            position: { x: 64 * 11, y: 64 * 12 },
            offset: { x: 0, y: 0 },
            initFrames: {
                [E_behaviors.IDLE]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../../public/src/assets/images/borders/7.png',
                        maxX: 1,
                        maxY: 1,
                        holdTime: 4,
                    },
                },
            },
            width: 64,
            height: 64,
        },
    },
    {
        type: E_characters.FLYING_OBELISK,
        name: 'FLYING OBELISK',
        position: { x: 64 * 12, y: 64 * 12 },
        width: 45,
        height: 45,
        offset: { x: -10, y: -9 },
        dashboardBorderInfo: {
            name: 'Border 1',
            position: { x: 64 * 12, y: 64 * 12 },
            offset: { x: 0, y: 0 },
            initFrames: {
                [E_behaviors.IDLE]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../../public/src/assets/images/borders/7.png',
                        maxX: 1,
                        maxY: 1,
                        holdTime: 10,
                    },
                },
            },
            width: 64,
            height: 64,
        },
    },
    {
        type: E_characters.OBELISK_THUNDER,
        name: 'OBELISK THUNDER',
        position: { x: 64 * 13, y: 64 * 12 },
        width: 50,
        height: 40,
        offset: { x: -7, y: -12 },
        dashboardBorderInfo: {
            name: 'Border 1',
            position: { x: 64 * 13, y: 64 * 12 },
            offset: { x: 0, y: 0 },
            initFrames: {
                [E_behaviors.IDLE]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../../public/src/assets/images/borders/7.png',
                        maxX: 1,
                        maxY: 1,
                        holdTime: 10,
                    },
                },
            },
            width: 64,
            height: 64,
        },
    },
]
const backgroundImage: HTMLImageElement = new Image()
const startGems: T_gemStartInfo = {
    blueGems: 20,
    redGems: 0,
    yellowGems: 0,
}
backgroundImage.src = '../../public/src/assets/images/gameMap.png'
const gateInfor = {
    health: 2000000,
    damage: 2000,
    attackRange: 600,
    attackSpeed: 50,
}
const desertMapData: T_gameMapData = {
    rounds,
    backgroundImage,
    placementTiles2D,
    waypoints,
    startGems,
    initDashboardCharacterInfo,
    gateInfor,
}
export default desertMapData
