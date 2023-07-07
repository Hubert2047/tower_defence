import { createImageSources } from '../helper/index.js';
import Enemy from './Enemy.js';
export default class Dragon extends Enemy {
    constructor({ position = { x: 0, y: 0 } }) {
        const sources = [
            '../../public/src/assets/images/Dragon/top_0.png',
            '../../public/src/assets/images/Dragon/left_290.png',
            '../../public/src/assets/images/Dragon/right_90.png',
            '../../public/src/assets/images/Dragon/bottom_180.png',
        ];
        const imageSources = createImageSources(sources);
        super({ position, imageSources, frameMaxX: 4, frameMaxY: 4, moveSpeed: 5, offset: { x: 65, y: 65 } });
    }
}
