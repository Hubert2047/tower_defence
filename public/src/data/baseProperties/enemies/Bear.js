import { E_enemy } from '../../../enum/index.js';
const Bear = {
    name: 'Bear',
    enemyType: E_enemy.BEAR,
    width: 200,
    height: 200,
    maxX: 4,
    maxY: 5,
    offset: { x: 65, y: 65 },
    baseHealth: 4000,
    baseMoveSpeed: 1.2,
    baseCoins: 2,
    imageSourceString: [
        '../../../public/src/assets/images/enemies/Bear/top_0.png',
        '../../../public/src/assets/images/enemies/Bear/left_290.png',
        '../../../public/src/assets/images/enemies/Bear/right_90.png',
        '../../../public/src/assets/images/enemies/Bear/bottom_180.png',
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
};
export default Bear;
