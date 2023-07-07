import { createImageSources } from '../../helper/index.js';
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
        super({ position, imageSources, frameMaxX: 4, frameMaxY: 4, moveSpeed: 4, offset: { x: 65, y: 65 } });
    }
}
