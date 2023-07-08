import { calculateHoldTime, createImageSources } from '../../helper/index.js';
import Enemy from './index.js';
export default class Siren extends Enemy {
    constructor({ position = { x: 0, y: 0 } }) {
        const sources = [
            '../../public/src/assets/images/Siren/top_0.png',
            '../../public/src/assets/images/Siren/left_290.png',
            '../../public/src/assets/images/Siren/right_90.png',
            '../../public/src/assets/images/Siren/bottom_180.png',
        ];
        const imageSources = createImageSources(sources);
        const offset = { x: 65, y: 65 };
        const maxX = 5;
        const maxY = 4;
        const moveSpeed = 5;
        const holdTime = calculateHoldTime({ maxX, maxY, moveSpeed });
        const frame = { maxX, maxY, holdTime };
        const coins = 3;
        const HP = 7500;
        super({ position, offset, imageSources, frame, moveSpeed, HP, coins });
    }
}
