import { createImageSources } from '../../helper/index.js';
import Sprite from '../sprite/index.js';
export default class ExplosionProjectile extends Sprite {
    constructor({ name, explosionType, position, offset = { x: 0, y: 0 }, imageSourceString, frame, width = 50, height = 50, }) {
        const imageSources = createImageSources(imageSourceString);
        super({ position, offset, width, height, frame, imageSources });
        this.name = name;
        this.explosionType = explosionType;
    }
    update() {
        this.draw({ sourceIndex: 0 });
    }
}
