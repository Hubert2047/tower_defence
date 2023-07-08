import { calculateHoldTime, createImageSources } from '../../helper/index.js';
import Enemy from './index.js';
export default class Fox extends Enemy {
    constructor({ position = { x: 0, y: 0 } }) {
        const sources = [
            '../../public/src/assets/images/Fox/top_0.png',
            '../../public/src/assets/images/Fox/left_290.png',
            '../../public/src/assets/images/Fox/right_90.png',
            '../../public/src/assets/images/Fox/bottom_180.png',
        ];
        const imageSources = createImageSources(sources);
        const offset = { x: 65, y: 65 };
        const maxX = 4;
        const maxY = 4;
        const moveSpeed = 5;
        const holdTime = calculateHoldTime({ maxX, maxY, moveSpeed });
        const frame = { maxX, maxY, holdTime };
        const coins = 5;
        const HP = 25000;
        super({ position, offset, imageSources, frame, moveSpeed, HP, coins });
    }
}
