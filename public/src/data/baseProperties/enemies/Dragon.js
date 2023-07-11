import { E_angels, E_behaviors, E_enemy } from '../../../enum/index.js';
const Dragon = {
    name: 'Dragon',
    enemyType: E_enemy.DRAGON,
    width: 200,
    height: 200,
    offset: { x: 65, y: 50 },
    baseHealth: 15000,
    baseMoveSpeed: 1.1,
    baseCoins: 3,
    initFrames: {
        [E_behaviors.RUN]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/run/top_0.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_290]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/run/left_290.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/run/right_90.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/run/bottom_180.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
        },
        [E_behaviors.DEATH]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/death/top_0.png',
                maxX: 8,
                maxY: 3,
                holdTime: 4,
            },
            [E_angels.ANGEL_290]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/death/left_290.png',
                maxX: 8,
                maxY: 3,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/death/right_90.png',
                maxX: 8,
                maxY: 3,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/death/bottom_180.png',
                maxX: 8,
                maxY: 3,
                holdTime: 4,
            },
        },
        [E_behaviors.ATTACK]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/attack/top_0.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_290]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/attack/left_290.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/attack/right_90.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/attack/bottom_180.png',
                maxX: 4,
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
export default Dragon;
