import { E_enemy } from '../../../enum/index.js'
import { T_baseEnemyProperties } from '../../../types/index.js'

const Dragon: T_baseEnemyProperties = {
    name: 'Dragon',
    enemyType: E_enemy.DRAGON,
    width: 200,
    height: 200,
    maxX: 4,
    maxY: 4,
    offset: { x: 65, y: 50 },
    baseHealth: 15000,
    baseMoveSpeed: 1.1,
    baseCoins: 3,
    imageSourceString: [
        '../../../public/src/assets/images/enemies/Dragon/top_0.png',
        '../../../public/src/assets/images/enemies/Dragon/left_290.png',
        '../../../public/src/assets/images/enemies/Dragon/right_90.png',
        '../../../public/src/assets/images/enemies/Dragon/bottom_180.png',
    ],
    dashboardBorderInfo: {
        name: 'Border 1',
        position: { x: 0, y: 0 },
        offset: { x: 0, y: 0 },
        imageSourceString: ['../../../public/src/assets/images/borders/1.png'],
        frame: { maxX: 1, maxY: 1, holdTime: 4 },
        width: 64,
        height: 64,
    },
}
export default Dragon
