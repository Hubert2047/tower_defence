import { E_angels, E_behaviors, E_enemy } from '../../../enum/index.js';
const TideHunter = {
    name: 'TideHunter',
    enemyType: E_enemy.TIDE_HUNTER,
    width: 200,
    height: 200,
    offset: { x: 65, y: 65 },
    baseHealth: 4000,
    baseMoveSpeed: 1.2,
    baseCoins: 2,
    initFrames: {
        [E_behaviors.RUN]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/TideHunter/run/top_0.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_290]: {
                imageSourceString: '../../../public/src/assets/images/enemies/TideHunter/run/left_290.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/TideHunter/run/right_90.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/TideHunter/run/bottom_180.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
        },
        [E_behaviors.DEATH]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/TideHunter/death/top_0.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_290]: {
                imageSourceString: '../../../public/src/assets/images/enemies/TideHunter/death/left_290.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/TideHunter/death/right_90.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/TideHunter/death/bottom_180.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
        },
        [E_behaviors.ATTACK]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/TideHunter/attack/top_0.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_290]: {
                imageSourceString: '../../../public/src/assets/images/enemies/TideHunter/attack/left_290.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/TideHunter/attack/right_90.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/TideHunter/attack/bottom_180.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
        },
    },
    dashboardBorderInfo: {
        name: 'Border 1',
        position: { x: 0, y: 0 },
        offset: { x: 0, y: 0 },
        initFrames: {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../../public/src/assets/images/borders/6.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_290]: {
                    imageSourceString: '../../../public/src/assets/images/borders/6.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_90]: {
                    imageSourceString: '../../../public/src/assets/images/borders/6.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_180]: {
                    imageSourceString: '../../../public/src/assets/images/borders/6.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        },
        width: 64,
        height: 64,
    },
};
export default TideHunter;
