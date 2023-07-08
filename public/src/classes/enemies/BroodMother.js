import { calculateHoldTime, createImageSources } from '../../helper/index.js';
import Enemy from './index.js';
export default class BroodMother extends Enemy {
    constructor({ position = { x: 0, y: 0 } }) {
        const sources = [
            '../../public/src/assets/images/Broodmother/top_0.png',
            '../../public/src/assets/images/Broodmother/left_290.png',
            '../../public/src/assets/images/Broodmother/right_90.png',
            '../../public/src/assets/images/Broodmother/bottom_180.png',
        ];
        const imageSources = createImageSources(sources);
        const offset = { x: 65, y: 65 };
        const maxX = 4;
        const maxY = 4;
        const moveSpeed = 4;
        const holdTime = calculateHoldTime({ maxX, maxY, moveSpeed });
        const frame = { maxX, maxY, holdTime };
        const HP = 2000;
        super({ position, offset, imageSources, frame, moveSpeed, HP });
    }
}
