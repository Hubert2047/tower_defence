import { E_angels, E_behaviors, E_enemy } from '../../../enum/index.js';
const NagaSiren = {
    name: 'Naga Siren',
    enemyType: E_enemy.SIREN,
    width: 200,
    height: 200,
    offset: { x: 65, y: 55 },
    baseHealth: 6000,
    baseMoveSpeed: 1.5,
    baseCoins: 2,
    initFrames: {
        [E_behaviors.RUN]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Siren/run/top_0.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_290]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Siren/run/left_290.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Siren/run/right_90.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Siren/run/bottom_180.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
        },
        [E_behaviors.DEATH]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Siren/death/top_0.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_290]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Siren/death/left_290.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Siren/death/right_90.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Siren/death/bottom_180.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
        },
        [E_behaviors.ATTACK]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Siren/attack/top_0.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_290]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Siren/attack/left_290.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Siren/attack/right_90.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Siren/attack/bottom_180.png',
                maxX: 5,
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
export default NagaSiren;
