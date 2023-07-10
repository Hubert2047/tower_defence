import { E_enemy } from '../../../enum/index.js';
const NagaSiren = {
    name: 'Naga Siren',
    enemyType: E_enemy.SIREN,
    width: 200,
    height: 200,
    maxX: 5,
    maxY: 4,
    offset: { x: 65, y: 55 },
    baseHealth: 6000,
    baseMoveSpeed: 1.5,
    baseCoins: 2,
    imageSourceString: [
        '../../../public/src/assets/images/enemies/Siren/top_0.png',
        '../../../public/src/assets/images/enemies/Siren/left_290.png',
        '../../../public/src/assets/images/enemies/Siren/right_90.png',
        '../../../public/src/assets/images/enemies/Siren/bottom_180.png',
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
export default NagaSiren;
