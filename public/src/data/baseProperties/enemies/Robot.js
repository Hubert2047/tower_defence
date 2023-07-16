import { E_angels, E_behaviors, E_enemy } from '../../../enum/index.js';
const Robot = {
    name: 'Robot ',
    enemyType: E_enemy.ROBOT,
    width: 160,
    height: 160,
    offset: { x: 30, y: 40 },
    baseHealth: 4000,
    baseMoveSpeed: 1.2,
    baseCoins: 2,
    initFrames: {
        [E_behaviors.RUN]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/run/0.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/run/45.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/run/90.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/run/135.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/run/180.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/run/225.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/run/270.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/run/315.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
        },
        [E_behaviors.DEATH]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/death/0.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/death/45.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/death/90.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/death/135.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/death/180.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/death/225.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/death/270.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/death/315.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
        },
        [E_behaviors.ATTACK]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/attack/0.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/attack/45.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/attack/90.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/attack/135.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/attack/180.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/attack/225.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/attack/270.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Robot/attack/315.png',
                maxX: 6,
                maxY: 5,
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
            },
        },
        width: 64,
        height: 64,
    },
};
export default Robot;
