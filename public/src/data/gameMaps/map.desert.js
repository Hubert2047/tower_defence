import { E_angels, E_behaviors, E_enemy, E_tower } from '../../enum/index.js';
const placementTilesData = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0,
    0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0,
    14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0,
    0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 14, 0, 14, 0, 14, 0,
    14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
        y: 355,
    },
    {
        x: 1280,
        y: 292,
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
                moveSpeed: 1.2,
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
                moveSpeed: 1,
                health: 15000,
                coins: 3,
            },
            {
                enemyType: E_enemy.Blue_Brood_Mother,
                basePosition: { x: -250, y: 484 },
                amount: 10,
                spaceMin: 100,
                spaceMax: 1000,
                moveSpeed: 3,
                health: 15000,
                coins: 3,
            },
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
            {
                enemyType: E_enemy.Hunter,
                basePosition: { x: -250, y: 484 },
                amount: 10,
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
];
const initDashboardTowerInfo = [
    {
        towerType: E_tower.BLOOD_MOON,
        name: 'Blood moon',
        position: { x: 64 * 9, y: 64 * 12 },
        width: 40,
        height: 40,
        offset: { x: -12, y: -10 },
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
        towerType: E_tower.FLYING_OBELISK,
        name: 'FLYING OBELISK',
        position: { x: 64 * 10, y: 64 * 12 },
        width: 45,
        height: 45,
        offset: { x: -10, y: -9 },
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
    // {
    //     towerType: E_tower.HAUNTED_TREE,
    //     name: 'HAUNTED TREE',
    //     position: { x: 64 * 8, y: 64 * 12 },
    //     width: 50,
    //     height: 50,
    //     offset: { x: -7, y: 0 },
    //     dashboardBorderInfo: {
    //         name: 'Border 1',
    //         position: { x: 64 * 8, y: 64 * 12 },
    //         offset: { x: 0, y: 0 },
    //         initFrames: {
    //             [E_behaviors.IDLE]: {
    //                 [E_angels.ANGEL_0]: {
    //                     imageSourceString: '../../../public/src/assets/images/borders/7.png',
    //                     maxX: 1,
    //                     maxY: 1,
    //                     holdTime: 4,
    //                 },
    //             },
    //         },
    //         width: 64,
    //         height: 64,
    //     },
    // },
    {
        towerType: E_tower.OBELISK_THUNDER,
        name: 'OBELISK THUNDER',
        position: { x: 64 * 8, y: 64 * 12 },
        width: 50,
        height: 60,
        offset: { x: -7, y: -12 },
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
                        holdTime: 10,
                    },
                },
            },
            width: 64,
            height: 64,
        },
    },
];
const backgroundImage = new Image();
const startCoins = 20;
backgroundImage.src = '../../public/src/assets/images/gameMap.png';
const desertMapData = {
    rounds,
    backgroundImage,
    placementTiles2D,
    waypoints,
    startCoins,
    initDashboardTowerInfo,
};
export default desertMapData;
