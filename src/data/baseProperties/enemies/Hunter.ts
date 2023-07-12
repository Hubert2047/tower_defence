import { E_angels, E_behaviors, E_enemy } from '../../../enum/index.js'
import { T_baseEnemyProperties } from '../../../types/index.js'

const Hunter: T_baseEnemyProperties = {
    name: 'Hunter',
    enemyType: E_enemy.Hunter,
    width: 200,
    height: 200,
    offset: { x: 65, y: 50 },
    baseHealth: 3000,
    baseMoveSpeed: 1.5,
    baseCoins: 2,
    initFrames: {
        [E_behaviors.RUN]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/run/0.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/run/45.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/run/90.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/run/135.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/run/180.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/run/225.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/run/270.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/run/315.png',
                maxX: 4,
                maxY: 5,
                holdTime: 4,
            },
        },
        [E_behaviors.DEATH]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/death/0.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/death/45.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/death/90.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/death/135.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/death/180.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/death/225.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/death/270.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/death/315.png',
                maxX: 6,
                maxY: 5,
                holdTime: 4,
            },
        },
        [E_behaviors.ATTACK]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/attack/0.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/attack/45.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/attack/90.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/attack/135.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/attack/180.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/attack/225.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/attack/270.png',
                maxX: 6,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Hunter/attack/315.png',
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
}
export default Hunter
