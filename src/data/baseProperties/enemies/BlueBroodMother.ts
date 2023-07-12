import { E_angels, E_behaviors, E_enemy } from '../../../enum/index.js'
import { T_baseEnemyProperties } from '../../../types/index.js'

const BlueBroodMother: T_baseEnemyProperties = {
    name: 'Brood Mother',
    enemyType: E_enemy.Blue_Brood_Mother,
    width: 200,
    height: 200,
    offset: { x: 65, y: 65 },
    baseHealth: 3000,
    baseMoveSpeed: 3.9,
    baseCoins: 1,
    initFrames: {
        [E_behaviors.RUN]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/run/0.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/run/45.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/run/90.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/run/135.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/run/180.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/run/225.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/run/270.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/run/315.png',
                maxX: 4,
                maxY: 4,
                holdTime: 4,
            },
        },
        [E_behaviors.DEATH]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/death/0.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/death/45.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/death/90.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/death/135.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/death/180.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/death/225.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/death/270.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/death/315.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
        },
        [E_behaviors.ATTACK]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/attack/0.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/attack/45.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/attack/90.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/attack/135.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/attack/180.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/attack/225.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/attack/270.png',
                maxX: 5,
                maxY: 4,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/enemies/BlueBroodmother/attack/315.png',
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
            },
        },
        width: 64,
        height: 64,
    },
}
export default BlueBroodMother
