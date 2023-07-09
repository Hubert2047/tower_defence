import { E_enemy } from '../../enum/index.js';
import { calculateHoldTime, createImageSources, deepClone } from '../../helper/index.js';
import defaultProperty from '../enemies/enemies.default.property.js';
import Enemy from './index.js';
export default class Fox extends Enemy {
    constructor({ position = { x: 0, y: 0 }, moveSpeed = 1, health = 4000, coins = 2, width = 200, height = 200, offset = { x: 65, y: 65 }, }) {
        const sources = [
            '../../public/src/assets/images/enemies/Fox/top_0.png',
            '../../public/src/assets/images/enemies/Fox/left_290.png',
            '../../public/src/assets/images/enemies/Fox/right_90.png',
            '../../public/src/assets/images/enemies/Fox/bottom_180.png',
        ];
        const imageSources = createImageSources(sources);
        const property = deepClone(defaultProperty.get(E_enemy.FOX));
        const { enemyType, maxX, maxY } = property;
        const holdTime = calculateHoldTime({ maxX, maxY, moveSpeed });
        const frame = { maxX, maxY, holdTime };
        super({ enemyType, position, width, height, offset, imageSources, frame, moveSpeed, health, coins });
    }
}
