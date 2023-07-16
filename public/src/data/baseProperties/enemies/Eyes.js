import { E_angels, E_behaviors, E_enemy } from '../../../enum/index.js';
const Eyes = {
    name: 'Eyes ',
    enemyType: E_enemy.EYES,
    width: 160,
    height: 160,
    offset: { x: 30, y: 40 },
    baseHealth: 4000,
    baseMoveSpeed: 1.2,
    baseCoins: 2,
    initFrames: {
        [E_behaviors.RUN]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/run/0.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/run/45.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/run/90.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/run/135.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/run/180.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/run/225.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/run/270.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/run/315.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
        },
        [E_behaviors.DEATH]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/death/0.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/death/45.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/death/90.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/death/135.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/death/180.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/death/225.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/death/270.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/death/315.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
        },
        [E_behaviors.ATTACK]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/attack/0.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/attack/45.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/attack/90.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/attack/135.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/attack/180.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/attack/225.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/attack/270.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Eyes/attack/315.png',
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
            },
        },
        width: 64,
        height: 64,
    },
};
export default Eyes;
