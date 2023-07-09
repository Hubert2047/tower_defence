import Sprite from '../sprite/index.js';
export default class DisappearProjectile extends Sprite {
    constructor({ position, offset, imageSources, frame, width = 100, height = 100 }) {
        super({ position, offset, width, height, frame, imageSources });
    }
}
