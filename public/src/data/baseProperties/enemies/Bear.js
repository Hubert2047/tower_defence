import { E_angels, E_behaviors, E_enemy } from '../../../enum/index.js';
const Bear = {
    name: 'Bear',
    enemyType: E_enemy.BEAR,
    width: 200,
    height: 200,
    offset: { x: 65, y: 65 },
    baseHealth: 4000,
    baseMoveSpeed: 1.2,
    baseCoins: 2,
    initFrames: {
        [E_behaviors.RUN]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Bear/run/top_0.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_290]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Bear/run/left_290.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Bear/run/right_90.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Bear/run/bottom_180.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
        },
        [E_behaviors.DEATH]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Bear/death/top_0.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_290]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Bear/death/left_290.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Bear/death/right_90.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Bear/death/bottom_180.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
        },
        [E_behaviors.ATTACK]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Bear/attack/top_0.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_290]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Bear/attack/left_290.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Bear/attack/right_90.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Bear/attack/bottom_180.png',
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
export default Bear;
