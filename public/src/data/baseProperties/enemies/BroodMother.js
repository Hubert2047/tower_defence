import { E_enemy } from '../../../enum/index.js';
const BroodMother = {
    name: 'Brood Mother',
    enemyType: E_enemy.BROOD_MOTHER,
    width: 200,
    height: 200,
    maxX: 4,
    maxY: 4,
    offset: { x: 65, y: 65 },
    baseHealth: 3000,
    baseMoveSpeed: 1.9,
    baseCoins: 1,
    imageSourceString: [
        '../../../public/src/assets/images/enemies/Broodmother/top_0.png',
        '../../../public/src/assets/images/enemies/Broodmother/left_290.png',
        '../../../public/src/assets/images/enemies/Broodmother/right_90.png',
        '../../../public/src/assets/images/enemies/Broodmother/bottom_180.png',
    ],
    dashboardBorderInfo: {
        name: 'Border 1',
        position: { x: 0, y: 0 },
        offset: { x: 0, y: 0 },
        imageSourceString: ['../../../public/src/assets/images/borders/6.png'],
        frame: { maxX: 1, maxY: 1, holdTime: 4 },
        width: 64,
        height: 64,
    },
};
export default BroodMother;
