import Sprite from '../sprite/index.js';
export default class ExplosionProjectile extends Sprite {
    constructor({ position, offset, imageSources, frame, width = 50, height = 50 }) {
        super({ position, offset, width, height, frame, imageSources });
    }
    update() {
        this.draw({ sourceIndex: 0 });
    }
}
