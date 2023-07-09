import { E_enemyType } from '../../enum/index.js';
import { calculateHoldTime, createImageSources, deepClone } from '../../helper/index.js';
import defaultProperty from '../enemies/enemies.default.property.js';
import Enemy from './index.js';
export default class Fox extends Enemy {
    constructor({ position = { x: 0, y: 0 } }) {
        const sources = [
            '../../public/src/assets/images/enemies/Fox/top_0.png',
            '../../public/src/assets/images/enemies/Fox/left_290.png',
            '../../public/src/assets/images/enemies/Fox/right_90.png',
            '../../public/src/assets/images/enemies/Fox/bottom_180.png',
        ];
        const imageSources = createImageSources(sources);
        const property = deepClone(defaultProperty.get(E_enemyType.FOX));
        const { offset, maxX, maxY, moveSpeed, coins, HP, width, height } = property;
        const holdTime = calculateHoldTime({ maxX, maxY, moveSpeed });
        const frame = { maxX, maxY, holdTime };
        super({ position, width, height, offset, imageSources, frame, moveSpeed, HP, coins });
    }
}
