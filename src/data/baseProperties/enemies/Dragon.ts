import { E_angels, E_behaviors, E_enemy } from '../../../enum/index.js'
import { T_baseEnemyProperties } from '../../../types/index.js'

const Dragon: T_baseEnemyProperties = {
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
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/run/0.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/run/45.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/run/90.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/run/135.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/run/180.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/run/225.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/run/270.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/run/315.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
        },
        [E_behaviors.DEATH]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/death/0.png',
                maxX: 8,
                maxY: 3,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/death/45.png',
                maxX: 8,
                maxY: 3,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/death/90.png',
                maxX: 8,
                maxY: 3,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/death/135.png',
                maxX: 8,
                maxY: 3,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/death/180.png',
                maxX: 8,
                maxY: 3,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/death/225.png',
                maxX: 8,
                maxY: 3,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/death/270.png',
                maxX: 8,
                maxY: 3,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/death/315.png',
                maxX: 8,
                maxY: 3,
                holdTime: 4,
            },
        },
        [E_behaviors.ATTACK]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/attack/0.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/attack/45.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/attack/90.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/attack/135.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/attack/180.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/attack/225.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/attack/270.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/enemies/Dragon/attack/315.png',
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
            },
        },
        width: 64,
        height: 64,
    },
}
export default Dragon
